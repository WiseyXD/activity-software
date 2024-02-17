import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/noob")({
    component: Noob,
});

function Noob() {
    return <h1>Noob</h1>;
}
