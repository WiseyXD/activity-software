import { RootState } from "@/app/store";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const { token: isAuthorized, userId } = useSelector(
        (state: RootState) => state.root.auth
    );
    return !isAuthorized ? (
        <Navigate to="/login" />
    ) : (
        <div className="p-2">
            <h3>Welcome Home{userId}!</h3>
        </div>
        // if user
        // Proivde links to all the other routes for user

        // if admin
        // Provide links to all other routes for admin
    );
}
