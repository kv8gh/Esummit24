"use client";

import SignInBtn from "@/components/SignInBtn";

import Speakers from "@/components/landingPage/Speakers";
import Sponsors from "@/components/landingPage/Sponsors";
import { IIA } from "@/components/landingPage/IIA/IIA";
import HeroSection from "@/components/landingPage/heroSection/HeroSection";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Schedule from "@/components/landingPage/Schedule/Schedule";
import FAQ from "@/components/landingPage/FAQ/FAQ";
import { Footer } from "@/components/landingPage/Footer/Footer";
import About from "@/components/landingPage/About";
import Who from "@/components/landingPage/Who";
import { useRef } from "react";

export default function Home() {
  const scheduleRef = useRef(null);
  const { status, data: session } = useSession();

  const router = useRouter();

  // if (status === "authenticated") {
  //     router.push('/userDetails')
  // } else {
  // return (
  //   <div>
  {
    /* main esuumit reg landing page */
  }
  {
    /* <SignInBtn /> */
  }

  // if (status === "authenticated") {
  //     router.push('/userDetails')
  // }
  return (
    <>
      <HeroSection scheduleRef={scheduleRef}/>
      <IIA />
      <About />
      <Who />
      <Schedule scheduleRef={scheduleRef} />
      <Speakers />
      <Sponsors />
      <FAQ />
      <Footer />
    </>
  );
}
