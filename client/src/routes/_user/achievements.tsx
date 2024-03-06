import AchievementCard from "@/components/shared/AchievementCard";
import NewEventCard from "@/components/shared/NewEventCard";
import Shimmer from "@/components/shared/Shimmer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { useGetAllAchievementQuery } from "@/services/api/achievementApi";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_user/achievements")({
    component: AchievementHome,
});

export type TAchievementData = {
    id: string;
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

export interface Participant {
    id: string;
    createdBy: string;
    name: string;
    department: string;
    year: string;
    files: string[];
}

function AchievementHome() {
    const cardsPerPage = 5;
    const [startIndex, setStartIndex] = useState<number>(0);
    const [endIndex, setEndIndex] = useState<number>(5);

    const { data, isFetching } = useGetAllAchievementQuery();
    if (isFetching) {
        return <Shimmer />;
    }
    // @ts-ignore
    const { events } = data;
    console.log(events);
    return (
        <>
            <h1 className="mb-3 text-2xl">Achievements</h1>
            <ScrollArea className="h-[50rem] w-full">
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                    {startIndex === 0 &&
                        (events.length < 1 ? (
                            <NewEventCard
                                eventType="Achievement"
                                to="/achievementForm"
                                firstCard={true}
                            />
                        ) : (
                            <NewEventCard
                                eventType="Achievement"
                                to="/achievementForm"
                                firstCard={false}
                            />
                        ))}

                    {events
                        .slice(startIndex, endIndex)
                        .map((achievement: TAchievementData) => {
                            return (
                                <AchievementCard
                                    achievementData={achievement}
                                    key={achievement.id}
                                />
                            );
                        })}
                </div>
            </ScrollArea>
            {events.length > cardsPerPage && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className={
                                    startIndex === 0
                                        ? "pointer-events-none opacity-50"
                                        : undefined
                                }
                                onClick={() => {
                                    setStartIndex(startIndex - cardsPerPage);
                                    setEndIndex(endIndex - cardsPerPage);
                                }}
                            />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => {
                                    setStartIndex(startIndex + cardsPerPage);
                                    setEndIndex(endIndex + cardsPerPage);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}
