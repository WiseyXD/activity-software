import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/placementForm")({
    component: PlacementForm,
});

function PlacementForm() {
    return <div>I'm Placement!</div>;
}
