import { Dispatch, SetStateAction } from "react";
import { AuthContextType } from "@/store/AuthContext";
import { fetchData } from "./api";

export async function verifyToken(
  setUserState: Dispatch<SetStateAction<AuthContextType["user"]>>,
  setLoadingState: Dispatch<SetStateAction<AuthContextType["isLoading"]>>,
  token: string,
  secret: string
) {
  await fetchData(`/verify-token?token=${token}&secret${secret}`)
    .then((res) => {
      setUserState((prevUser) => ({ ...prevUser, isAuthenticated: token ? false : true, data: res.user }));
      setLoadingState ? setLoadingState(false) : null;
    })
    .catch((error) => {
      error?.response?.status === 401;
      setUserState((prevUser) => ({ ...prevUser, isAuthenticated: false, data: null }));
      setLoadingState ? setLoadingState(false) : null;
    });
}
