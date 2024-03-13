"use client";

import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";
import UserDetails from "./userDetails";
export default function UserInfo() {
    const { status, data: session } = useSession();

    


    if (status === "authenticated") {
        return  <UserDetails/>;
    } else {
        return <SignInBtn />;
    }
}
