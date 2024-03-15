"use client";

import Image from "next/image";
import { signIn,signOut,useSession } from "next-auth/react";
import { Router, useRouter } from "next/navigation";

export default function SignInBtn() {
  const { status } = useSession();
  const router = useRouter();
  return (
    <div className="flex bg-blue-500 p-2 border border-black rounded-lg">
      {status === "authenticated" ? (
        <button
          onClick={() => {signOut();}} >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => {signIn("google");}} >
          Sign In
        </button>
      )}
    </div>)
}