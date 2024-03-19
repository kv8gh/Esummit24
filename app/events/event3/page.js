"use client";

import RegisterButton from "@/components/events/RegisterButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();


  useEffect(() => {
      if (status === "unauthenticated") {
        //Checks if session is not ready and redirects to root.

        router.push("/");
      } else if (status === "authenticated") {
        // toast.success("Logged In");
        console.log(session);
      }
  }, [status, router]);
  return (
    <main>
      <h1>Event 3</h1>
      <RegisterButton event={3} token={session?.accessTokenBackend}/>
    </main>
  );
}
