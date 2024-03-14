"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  return (
    <div className="flex">
      <div className="m-3">Nav</div>
      {status === "authenticated" ? (
        <button
          onClick={() => signOut()} >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn("google")} >
          Sign In
        </button>
      )}
    </div>
  );
}