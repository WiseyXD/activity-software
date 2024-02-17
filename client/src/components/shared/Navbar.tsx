import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { unsetUser } from "@/features/auth/authSlice";

export default function Navbar() {
    const { token: isAuthorized, isAdmin } = useSelector(
        (state: RootState) => state.root.auth
    );
    const dispatch = useDispatch();
    function handleLogout() {
        dispatch(unsetUser());
    }

    return isAuthorized ? (
        isAdmin ? (
            <div className="flex justify-between items-center px-4 py-2 transition-opacity bg-opacity-75">
                <h1 className="text-2xl">Actify</h1>
                <div className="flex gap-3">
                    <ModeToggle />
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        ) : (
            <div className="flex justify-between items-center px-4 py-2 transition-opacity bg-opacity-75">
                <h1 className="text-2xl">Actify</h1>
                <div className="flex gap-3">
                    <ModeToggle />
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        )
    ) : (
        <div className="flex justify-between items-center px-4 py-2 transition-opacity bg-opacity-75">
            <h1 className="text-2xl">Actify</h1>
        </div>
    );
}
