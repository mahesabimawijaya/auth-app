import { Dispatch, SetStateAction } from "react";
import { AuthContextType } from "@/store/AuthContext";
import { fetchData } from "./api";

export async function verifyToken(
  setUserState: Dispatch<SetStateAction<AuthContextType["user"]>>,
  setLoadingState: Dispatch<SetStateAction<AuthContextType["isLoading"]>>,
  token: string,
  secret: string
) {
  await fetchData(`/auth/verify-token?token=${token}&secret=${secret}`)
    .then((res) => {
      setUserState((prevUser) => ({ ...prevUser, isAuthenticated: token ? true : false, data: res }));
      setLoadingState ? setLoadingState(false) : null;
    })
    .catch((error) => {
      error?.response?.status === 401;
      setUserState((prevUser) => ({ ...prevUser, isAuthenticated: false, data: null }));
      setLoadingState ? setLoadingState(false) : null;
    });
}

export async function verifyMembershipToken(
  setUserState: Dispatch<SetStateAction<AuthContextType["user"]>>,
  setLoadingState: Dispatch<SetStateAction<AuthContextType["isLoading"]>>,
  token: string,
  secret: string
) {
  await fetchData(`/auth/verify-token?token=${token}&secret=${secret}`)
    .then((res) => {
      setUserState((prevUser) => ({ ...prevUser, isMembership: token ? true : false }));
      setLoadingState ? setLoadingState(false) : null;
    })
    .catch((error) => {
      error?.response?.status === 401;
      setUserState((prevUser) => ({ ...prevUser, isMembership: false }));
      setLoadingState ? setLoadingState(false) : null;
    });
}
