import React from "react";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/extracurricularForm")({
    component: ExtracurricularForm,
});

function ExtracurricularForm() {
    return <div>ExtracurricularForm</div>;
}
