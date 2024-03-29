"use client";

import SignInBtn from "@/components/SignInBtn";

import Speakers from "@/components/landingPage/Speakers";
import Sponsers from "@/components/landingPage/Sponsers";
import { IIA } from "@/components/landingPage/IIA/IIA";
import HeroSection from "@/components/landingPage/heroSection/HeroSection";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Schedule from "@/components/landingPage/Schedule/Schedule";

// export default function Home() {
//   const { status, data: session } = useSession();

//   const router = useRouter();

//   // if (status === "authenticated") {
//   //     router.push('/userDetails')
//   // } else {
//   return (
//     <div>
//       {/* main esuumit reg landing page */}
//       {/* <SignInBtn /> */}

  // if (status === "authenticated") {
  //     router.push('/userDetails')
  // } else {
  return (
    <>
      {/* <div>
        <div className="grid grid-cols-2">
          <Link
            href="/events/event1"
            className="m-3 w-1/4 bg-slate-500 border border-black p-5 text-white"
          >
            {" "}
            go to Event 1
          </Link>
          <Link
            href="/events/event2"
            className="m-3 w-1/4 bg-slate-500 border border-black p-5 text-white"
          >
            {" "}
            go to Event 2
          </Link>
          <Link
            href="/events/event3"
            className="m-3 w-1/4 bg-slate-500 border border-black p-5 text-white"
          >
            {" "}
            go to Event 3
          </Link>
          <Link
            href="/events/event4"
            className="m-3 w-1/4 bg-slate-500 border border-black p-5 text-white"
          >
            {" "}
            go to Event 4
          </Link>
          <Link
            href="/events/event5"
            className="m-3 w-1/4 bg-slate-500 border border-black p-5 text-white"
          >
            {" "}
            go to Event 5
          </Link>
          <Link
            href="/events/event6"
            className="m-3 w-1/4 bg-slate-500 border border-black p-5 text-white"
          >
            {" "}
            go to Event 6
          </Link>
        </div>
      </div> */}
      <HeroSection />
      <IIA />
      <Schedule/>
      </>
    )
}
