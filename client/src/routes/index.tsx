import { RootState } from "@/app/store";
import { Link, Navigate, createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const {
        token: isAuthorized,
        userId,
        isAdmin,
    } = useSelector((state: RootState) => state.root.auth);

    return !isAuthorized ? (
        <Navigate to="/login" />
    ) : (
        <div className="p-2">
            <h3>Welcome Home {userId}!</h3>

            {/* if user */}
            {/* Provide links to all the other routes for user */}
            {isAdmin ? (
                <p>Admin</p>
            ) : (
                <div>
                    <Link to="/placementForm">Placement</Link>
                </div>
            )}
        </div>
    );
}
