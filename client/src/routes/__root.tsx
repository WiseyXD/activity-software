import { RootState } from "@/app/store";
import Navbar from "@/components/shared/Navbar";
import { Store } from "@reduxjs/toolkit";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext()<{
    store: Store;
}>({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Navbar />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    );
}
