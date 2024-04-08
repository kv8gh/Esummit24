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
import { useEffect, useRef, useState } from "react";
import Timeline from "@/components/landingPage/Schedule/Timeline";
import Temp from "@/components/landingPage/Speaker/Temp";

export default function Home() {
  const router = useRouter();
  const scheduleRef = useRef(null);
  const [regOpen, setRegOpen] = useState(true);

  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("\n\n\n\n\n\n\n\ngetting data\n\n\n\n\n\n");
    console.log(status);
    if (status === "authenticated") {
      console.log("inside if");
      fetch("/api/userDetails", {
        content: "application/json",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Got data");
          console.log(data);
          console.log("got data");
          console.log(status === "authenticated");
          console.log(!data.user.hasFilledDetails);
          if (status === "authenticated" && !data.user.hasFilledDetails) {
            console.log("pushing to userdetails");
            router.push("/userDetails");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [status]);
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
      <HeroSection
        scheduleRef={scheduleRef}
        regOpen={regOpen}
        setRegOpen={setRegOpen}
      />
      <IIA />
      <About />
      <Who />
      {/* <Schedule scheduleRef={scheduleRef} /> */}
      <Timeline scheduleRef={scheduleRef} />
      <Temp /> {/* temp for speakers section */}
      {/* <Speakers /> */}
      {/* <Sponsors /> */}
      <FAQ />
      <Footer />
    </>
  );
}
