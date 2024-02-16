import { RootState } from "@/app/store";
import { Link, Navigate } from "@tanstack/react-router";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export const Route = createFileRoute("/_user")({
    component: UserLayout,
});

function UserLayout() {
    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );
    return !isAuthorized ? (
        <Navigate to="/login" />
    ) : (
        <div className="p-2">
            <Outlet />
        </div>
    );
}
