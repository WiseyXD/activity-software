import AchievementCard from "@/components/shared/AchievementCard";
import NewEventCard from "@/components/shared/NewEventCard";
import Shimmer from "@/components/shared/Shimmer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllAchievementQuery } from "@/services/api/achievementApi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/achievementHome")({
    component: AchievementHome,
});

type AchievementData = {
    instituteName: string;
    activityType: string;
    eventLevel: string;
    dateOfEvent: Date;
    title: string;
    description: string;
    rankAchieved: string;
    personCategory: string;
    achievement: string;
    awardAmount: number;
    achievementProof: string;
    participants: Participant[];
};

interface Participant {
    id: string;
    createdBy: string;
    name: string;
    department: string;
    year: string;
    files: string[];
}

function AchievementHome() {
    const { data, isFetching } = useGetAllAchievementQuery();
    if (isFetching) {
        return <Shimmer />;
    }
    // @ts-ignore
    const { events } = data;

    return (
        <>
            <h1 className="mb-3 text-2xl">Achievements</h1>
            <ScrollArea className="h-[50rem] w-full">
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                    <NewEventCard
                        eventType="Achievement"
                        to="/achievementForm"
                    />
                    {events.map((achievement: AchievementData) => {
                        return (
                            <AchievementCard achievementData={achievement} />
                        );
                    })}
                </div>
            </ScrollArea>
        </>
    );
}
