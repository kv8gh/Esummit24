"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInBtn() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-4 shadow-xl rounded-lg pl-3"
    >
     
      <span className="bg-blue-500 text-white px-4 py-3">
        Sign in with Google
      </span>
    </button>
  );
}