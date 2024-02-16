import { RootState } from "@/app/store";
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
        <div className="flex justify-between items-center px-4 py-2 transition-opacity bg-opacity-75">
            <h1 className="text-2xl">Actify</h1>
            <ModeToggle />
        </div>
    );
}
