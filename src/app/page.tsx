"use client";

import { useAuth } from "@/store/AuthContext";
import Link from "next/link";

export default function Home() {
  const auth = useAuth();
  const isAuthenticated = auth.user.isAuthenticated;
  const isAuthLoading = auth.isLoading;
  const user = auth.user.data;
  const isMembership = auth.user.data?.membership;
  const isLoginMembership = auth.user.isMembership;

  if (isAuthLoading) return <div className="flex w-full h-screen justify-center items-center text-xl font-semibold font-mono">Loading...</div>;
  if (!isAuthenticated) return <div className="flex w-full h-screen justify-center items-center text-xl">Sign In to see our content</div>;
  return (
    <main className="w-full h-auto px-10 py-10 pt-[120px]">
      <div className="flex w-full items-center justify-between">
        <div className="text-2xl">
          Welcome, <span className="text-blue-600">{user?.username}</span>
        </div>
        <div>
          {isLoginMembership ? (
            <button onClick={auth.membershipLogOut} className="bg-red-600 text-white px-[15px] py-[7px] rounded-md">
              Membership Logout
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {isLoginMembership ? (
        <>
          <div className="mt-2">
            <h2 className="">You are currently login with a {user?.membership?.type} membership</h2>
            <h3 className="">You can access {user?.membership?.type === "Type C" ? "all" : user?.membership?.articles} articles and videos</h3>
          </div>
        </>
      ) : isMembership ? (
        <div>
          <div className="text-3xl font-sans font-semibold">Login as Membership to get benefits!</div>
          <div>
            <Link href={"/membership/login"}>
              <button className="bg-blue-600 text-white px-5 py-2 mt-3 rounded-md hover:opacity-70 duration-200">Login</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-3xl font-sans font-semibold">Register as Membership to get benefits!</div>
          <div>
            <Link href={"/membership/register"}>
              <button className="bg-blue-600 text-white px-5 py-2 mt-3 rounded-md hover:opacity-70 duration-200">Register</button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
