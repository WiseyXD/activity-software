import { RootState } from "@/app/store";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import { Store } from "@reduxjs/toolkit";
import {
    createRootRoute,
    createRootRouteWithContext,
    Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Separator />
            <div className="max-w-[90%] w-full mx-auto mt-4 max-h-screen">
                <Outlet />
                <TanStackRouterDevtools />
            </div>
        </div>
    );
}
