import { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

export default function Navbar() {
    const { token: isAuthorized, isAdmin } = useSelector(
        (state: RootState) => state.root.auth
    );

    return isAuthorized ? (
        isAdmin ? (
            <p>Admin Here</p>
        ) : (
            <p>User here</p>
        )
    ) : (
        <>
            <p>Nothing here just logo</p>
            <ModeToggle />
            <Button>Hey</Button>
        </>
    );
}
