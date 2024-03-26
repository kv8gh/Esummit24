"use client";

import { signIn,signOut,useSession } from "next-auth/react";

export default function SignInBtn() {
  const { status } = useSession();

  return (
    <div className="flex text-black bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] p-2 rounded-lg">
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