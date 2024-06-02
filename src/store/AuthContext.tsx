"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/cookie";
import { verifyMembershipToken, verifyToken } from "@/lib/helper";

interface User {
  id: number;
  username: string;
  email: string;
  googleId: string;
  facebookId: string;
  membership?: Membership;
}

interface Membership {
  id: number;
  type: string;
  userId: number;
  articles: number;
  videos: number;
}

export type AuthContextType = {
  isLoading: boolean;
  user: {
    isAuthenticated: boolean;
    isMembership: boolean;
    data: User | null;
  };
  logOut: () => void;
  membershipLogOut: () => void;
};

const initialAuthContextValue = {
  isLoading: true,
  user: {
    isAuthenticated: false,
    isMembership: false,
    data: null,
  },
  logOut: () => {},
  membershipLogOut: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContextValue);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<AuthContextType["isLoading"]>(true);
  const [user, setUser] = useState<AuthContextType["user"]>(initialAuthContextValue.user);
  const cookie = getCookie("astronacci-auth-token");
  const memberCookie = getCookie("astronacci-membership-token");
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  const router = useRouter();

  useEffect(() => {
    if (!cookie) {
      setIsLoading(true);
      setUser((prevUser) => ({ ...prevUser, isAuthenticated: false, data: null }));
      setIsLoading(false);
    } else {
      setIsLoading(true);
      verifyToken(setUser, setIsLoading, cookie, secret!);
    }

    if (!memberCookie) {
      setIsLoading(true);
      setUser((prevUser) => ({ ...prevUser, isMembership: false }));
      setIsLoading(false);
    } else {
      setIsLoading(true);
      verifyMembershipToken(setUser, setIsLoading, memberCookie, secret!);
    }
  }, [cookie, secret, memberCookie]);

  const logOut = () => {
    setIsLoading(true);
    window.location.href = "http://localhost:8000/auth/facebook/signout";
    setUser((prevUser) => ({ ...prevUser, isAuthenticated: false, isMembership: false, data: null }));
    document.cookie = "astronacci-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "astronacci-membership-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    router.push("/");
  };

  const membershipLogOut = () => {
    setIsLoading(true);
    window.location.href = "http://localhost:8000/auth/facebook/signout";
    setUser((prevUser) => ({ ...prevUser, isMembership: false }));
    document.cookie = "astronacci-membership-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    router.push("/");
  };

  return <AuthContext.Provider value={{ isLoading, user, logOut, membershipLogOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
