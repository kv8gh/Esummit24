"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  return (
    <div className="flex">
      <div className="m-3">Nav</div>
      {status === "authenticated" ? (
        <>
          {window.location.pathname === "/events/event1/teamCode" && (
            <button 
            className="px-4 py-2 rounded-full capitalize cursor-pointer bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] mt-4 flex items-center  font-bold"
            onClick={() => window.history.back()}>Back</button>
          )}
          <button 
          className="m-3 px-4 py-2 rounded-full capitalize bg-red-500 text-white px-3 py-1 border-0 rounded-lg cursor-pointer font-bold"
          onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button 
        className="px-4 py-2 rounded-full capitalize bg-red-500 text-white px-3 py-1 border-0 rounded-lg cursor-pointer font-bold"
        onClick={() => signIn("google")}>Sign In</button>
      )}
    </div>
  );
}