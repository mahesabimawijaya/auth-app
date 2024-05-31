"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/cookie";
import { verifyToken } from "@/lib/helper";

interface User {
  id: number;
  username: string;
  email: string;
  googleId: string;
  facebookId: string;
}

export type AuthContextType = {
  isLoading: boolean;
  user: {
    isAuthenticated: boolean;
    data: User | null;
  };
  logOut: () => void;
};

const initialAuthContextValue = {
  isLoading: true,
  user: {
    isAuthenticated: false,
    data: null,
  },
  logOut: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContextValue);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<AuthContextType["isLoading"]>(true);
  const [user, setUser] = useState<AuthContextType["user"]>(initialAuthContextValue.user);
  const cookie = getCookie("astronacci-auth-token");
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
  }, [cookie, secret]);

  const logOut = () => {
    setIsLoading(true);
    setUser((prevUser) => ({ ...prevUser, isAuthenticated: false, data: null }));
    document.cookie = "astronacci-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    router.push("/");
  };

  return <AuthContext.Provider value={{ isLoading, user, logOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
