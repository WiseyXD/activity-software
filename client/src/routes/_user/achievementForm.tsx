import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/achievementForm")({
    component: PlacementForm,
});

function PlacementForm() {
    return <div>I'm Achievement!</div>;
}
