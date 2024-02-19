import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/achievementHome")({
    component: AchievementHome,
});

function AchievementHome() {
    return <>AchievementHome</>;
}
