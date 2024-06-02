"use client";

import { PiFacebookLogoBold, PiGoogleLogoBold } from "react-icons/pi";

export default function SocialLogin() {
  const facebook = () => {
    try {
      window.location.href = "http://localhost:8000/auth/facebook";
    } catch (error) {
      console.error(error);
    }
  };
  const google = () => {
    try {
      window.location.href = "http://localhost:8000/auth/google";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center px-10 py-14 w-full max-w-sm border-slate-200 rounded-md border shadow-xl">
          <h3 className="text-2xl font-semibold">Social Login</h3>
          <div className="flex flex-col h-auto w-full space-y-3 mt-10">
            <div className="relative">
              <button onClick={google} className="w-full shadow-md py-[13px] border border-slate-200 rounded-md text-start pl-14 hover:bg-slate-200 duration-200">
                Sign In using Google
              </button>
              <PiGoogleLogoBold className="pointer-events-none absolute left-3 top-1/2 h-[23px] w-[23px] -translate-y-1/2 text-red-600 peer-focus:text-gray-900" />
            </div>
            <div className="relative">
              <button onClick={facebook} className="w-full shadow-md py-[13px] border border-slate-200 rounded-md text-start pl-14 hover:bg-slate-200 duration-200">
                Sign In using Facebook
              </button>
              <PiFacebookLogoBold className="pointer-events-none absolute left-3 top-1/2 h-[23px] w-[23px] -translate-y-1/2 text-blue-600 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
