"use client";

import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";

export default function UserInfo() {
    const { status, data: session } = useSession();

    if (status === "authenticated") {
        return (
            <div>
                Name: <span>{session?.user?.name || "Unknown"}</span>
                Email:<span>{session?.user?.email || "Unknown"}</span>
            </div>
        );
    } else {
        return <SignInBtn />;
    }
}
