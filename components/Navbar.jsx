"use client";

// import Link from "next/link";
import { useSession } from "next-auth/react";

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
import { useEffect, useState } from "react";
import SignInBtn from "./SignInBtn";
import logo from "@/public/assets/logos/esummitLogo.svg";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import Hamburger from "./Hamburger";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardLink, setDashboardLink] = useState("/");
  const [showHamburger, setShowHamburger] = useState(false);
  const { data: session, status } = useSession();
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      getData();
    }
  }, [status, router]);

  const getData = () => {
    fetch(`/userDetails`, {
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
          setDashboardLink("/leaderDash");
        } else {
          setDashboardLink("/memberDash");
        }
      })
      .catch((error) => {});
  };

  return (
    // <nav className="top-0 flex text-white w-full justify-around h-[84px] py-4">
    //   <div>
    //     <Image
    //       src={logo}
    //       alt="FP"
    //       className="h-full w-auto"
    //       onClick={() => {
    //         router.push("/");
    //       }}
    //     />
    //   </div>
    //   <div className="hidden gap-3 sm:gap-10 items-center font-medium md:flex">
    //     <Link href="/">Home</Link>
    //     <Link href={dashboardLink}>Dashboard</Link>
    //     <button className="bg-red-500 text-white px-4 py-2 rounded-md"
    //      onClick={() => window.history.back()}>Back</button>
    //     <SignInBtn />
    //     {/* <LoginButton /> */}
    //   </div>
    //   <div className="flex flex-col justify-around md:hidden">
    //     {/* Hamburger menu icon */}
    //     <div
    //       className="cursor-pointer text-white md:hidden"
    //       onClick={toggleMenu}
    //     >
    //       &#9776;
    //     </div>

    //     {/* Navbar links */}
    //     <div
    //       className={`md:flex flex-col z-10 bg-gray-800 bg-opacity-75 p-4 rounded-md top-[6vh] h-[20vh] ${
    //         isOpen ? "absolute right-0" : "hidden"
    //       } `}
    //     >
    //       <ul className="flex flex-col justify-around items-center space-x-4 h-full">
    //         <li>
    //           <Link href="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link href="/memberDash">Dashboard</Link>
    //         </li>
    //         <li>
    //           <button className="bg-red-500 text-white px-4 py-2 rounded-md"
    //            onClick={() => window.history.back()}>Back</button>
    //           <SignInBtn />
    //           {/* <LoginButton /> */}
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <AnimatePresence mode="wait">
      {showHamburger ? (
        <Hamburger
          showHamburger={showHamburger}
          setShowHamburger={setShowHamburger}
        />
      ) : (
        <>
          <motion.nav
            initial={{
              opacity: 1,
              y: -100,
            }}
            animate={{
              y: visible ? 0 : -100,
              opacity: visible ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed top-0 bg-black bg-opacity-0 z-10 backdrop-blur-md  w-full py-5 px-5 h-16  justify-between "
          >
            <RxHamburgerMenu
              onClick={() => {
                setShowHamburger(true);
              }}
              className="text-white text-3xl font-bold block md:hidden"
            />
          </motion.nav>
          <motion.nav
            initial={{
              opacity: 1,
              y: -100,
            }}
            animate={{
              y: visible ? 0 : -100,
              opacity: visible ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed top-0 bg-black bg-opacity-0 z-10 backdrop-blur-md hidden md:flex w-full py-5 px-10 h-16 items-center justify-between"
          >
            <div className="h-full flex items-center">
              <Image className="h-10 w-auto px-10" src={logo} />
            </div>
            <div>
              <ul className="flex gap-10 capitalize items-center font-semibold">
                <Link
                  href={"/"}
                  className="group text-white transition duration-300"
                >
                  <li className="cursor-pointer">home</li>
                  <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                </Link>
                <Link
                  href={"#about"}
                  className="group text-white transition duration-300"
                >
                  <li className="cursor-pointer">about</li>
                  <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                </Link>
                <Link
                  href={"#schedule"}
                  className="group text-white transition duration-300"
                >
                  <li className="cursor-pointer">schedule</li>
                  <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                </Link>
                <Link
                  href={"#speakers"}
                  className="group text-white transition duration-300"
                >
                  <li className="cursor-pointer">speakers</li>
                  <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                </Link>
                <SignInBtn />
              </ul>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
