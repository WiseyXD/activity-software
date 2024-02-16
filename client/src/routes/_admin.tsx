import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
    component: AdminLayout,
});

// Make auth check for authorized or admin role then make all the admin routes here

function AdminLayout() {
    return (
        <div>
            <div>I'm a Admin Layout</div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
