import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/extracuricullarHome")({
    component: ExtracuricullarHome,
});

function ExtracuricullarHome() {
    return <>ExtracuricullarHome</>;
}
