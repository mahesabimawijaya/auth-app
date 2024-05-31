"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FacebookSuccess() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl font-semibold font-sans">You have logged in successfully</h1>
      <h3 className="text-lg font-sans">You will be automatically directed to home page</h3>
    </div>
  );
}
