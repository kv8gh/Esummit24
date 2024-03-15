"use client";

// import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

// export default function Navbar() {
//   const { status } = useSession();
//   return (
//     <div className="flex">
//       <div className="m-3">Nav</div>
//       {status === "authenticated" ? (
//         <button
//           onClick={() => signOut()} >
//           Sign Out
//         </button>
//       ) : (
//         <button
//           onClick={() => signIn("google")} >
//           Sign In
//         </button>
//       )}
//     </div>
//   );
// }

// import { useSession } from 'next-auth/react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/logos/FP LOGO.svg";
import { useEffect, useState } from "react";
import SignInBtn from "./SignInBtn";
// import LoginButton from './Landing Page/Loginbutton';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardLink, setDashboardLink] = useState("/");
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (router.isReady) {
      if (status === "unauthenticated") {
        router.push("/");
      } else if (status === "authenticated") {
        getData();
      }
    }
  }, [status, router]);

  const getData = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/userDetails`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.user;
        if (user.teamRole === "0") {
          setDashboardLink("/leaderDashboard");
        } else {
          setDashboardLink("/memberDashboard");
        }
      })
      .catch((error) => {});
  };

  return (
    <nav className="top-0 flex text-white w-full justify-around h-[84px] py-4">
      <div>
        <Image
          src={logo}
          alt="FP"
          className="h-full w-auto"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      <div className="hidden gap-3 sm:gap-10 items-center font-medium md:flex">
        <Link href="/">Home</Link>
        <Link href={dashboardLink}>Dashboard</Link>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md"
         onClick={() => window.history.back()}>Back</button>
        <SignInBtn />
        {/* <LoginButton /> */}
      </div>
      <div className="flex flex-col justify-around md:hidden">
        {/* Hamburger menu icon */}
        <div
          className="cursor-pointer text-white md:hidden"
          onClick={toggleMenu}
        >
          &#9776;
        </div>

        {/* Navbar links */}
        <div
          className={`md:flex flex-col z-10 bg-gray-800 bg-opacity-75 p-4 rounded-md top-[6vh] h-[20vh] ${
            isOpen ? "absolute right-0" : "hidden"
          } `}
        >
          <ul className="flex flex-col justify-around items-center space-x-4 h-full">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/memberDashboard">Dashboard</Link>
            </li>
            <li>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md"
               onClick={() => window.history.back()}>Back</button>
              <SignInBtn />
              {/* <LoginButton /> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
