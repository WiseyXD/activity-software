import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { ModeToggle } from "../mode-toggle";
import { unsetUser } from "@/features/auth/authSlice";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";
import Links from "./Links";
import { Separator } from "../ui/separator";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
    const { token: isAuthorized, isAdmin } = useSelector(
        (state: RootState) => state.root.auth
    );
    const dispatch = useDispatch();
    function handleLogout() {
        dispatch(unsetUser());
    }

    const options = [
        { title: "Placement", to: "/placementHome" },
        { title: "Achievement", to: "/achievementHome" },
        { title: "Technical", to: "/technicalHome" },
        { title: "Extracurricular", to: "/extracuricullarHome" },
    ];

    return isAuthorized ? (
        isAdmin ? (
            <div className="flex justify-between items-center px-4 py-2 transition-opacity bg-opacity-75">
                <div className="flex gap-3">
                    <Sheet>
                        <SheetTrigger>Open</SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>
                                    Are you absolutely sure?
                                </SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <h1 className="text-2xl">Actify</h1>
                </div>
                <div className="flex gap-3">
                    <ModeToggle />
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        ) : (
            <div className="flex justify-between items-center px-4 py-2 transition-opacity bg-opacity-75">
                <div className="flex gap-3">
                    <Sheet>
                        <SheetTrigger>
                            <AlignLeft />
                        </SheetTrigger>
                        <SheetContent side="left" className="pt-3 w-[300px]">
                            <SheetHeader>
                                <SheetTitle className="text-2xl">
                                    Events
                                </SheetTitle>
                                <SheetDescription>
                                    {options.map((option, i) => {
                                        return (
                                            <Links
                                                key={i}
                                                title={option.title}
                                                to={option.to}
                                            />
                                        );
                                    })}
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <Link to="/">
                        <h1 className="text-3xl">Actify</h1>
                    </Link>
                </div>
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
