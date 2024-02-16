import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/technicalForm")({
    component: TechnicalForm,
});

function TechnicalForm() {
    return <div>I'm Technical!</div>;
}
