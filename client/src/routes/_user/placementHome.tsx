import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/placementHome")({
    component: PlacementHome,
});

function PlacementHome() {
    return <>PlacementHome</>;
}
