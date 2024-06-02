"use client";

import { useAuth } from "@/store/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const auth = useAuth();
  const isAuthenticated = auth.user.isAuthenticated;
  const isAuthLoading = auth.isLoading;
  const isLoginMembership = auth.user.isMembership;
  const path = usePathname();

  if (isAuthLoading) return <div className="flex w-full h-screen justify-center items-center text-xl font-semibold font-mono">Loading...</div>;

  return (
    <nav className="w-full fixed bg-white h-[75px] shadow-md flex items-center z-10 justify-between px-[30px]">
      <Link href={"/"}>
        <div className="ml-5 relative w-[110px] h-[50px]">
          <Image src={"/astronacci.png"} fill alt="astronacci-logo" />
        </div>
      </Link>
      <div className="flex items-center">
        {isLoginMembership ? (
          <>
            <Link href={"/articles"}>
              <div className="mr-10 hover:text-red-800 duration-200">Articles</div>
            </Link>
            <Link href={"/videos"}>
              <div className="mr-10 hover:text-red-800 duration-200">Videos</div>
            </Link>
          </>
        ) : (
          ""
        )}
        {path !== "/social-login" ? (
          <>
            <div className={`${isAuthenticated ? "" : "hidden"} bg-red-600 text-white px-[15px] py-[7px] rounded-md`}>
              <button onClick={auth.logOut}>Logout</button>
            </div>
            <div className={`${isAuthenticated ? "hidden" : ""} bg-blue-600 text-white px-[15px] py-[7px] rounded-md`}>
              <Link href={"/social-login"}>
                <button>Sign In</button>
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};
