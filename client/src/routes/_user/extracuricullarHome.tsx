import AchievementCard from "@/components/shared/AchievementCard";
import NewEventCard from "@/components/shared/NewEventCard";
import Shimmer from "@/components/shared/Shimmer";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useGetAllExtracuricullarQuery } from "@/services/api/extracuricullarApi";

export const Route = createFileRoute("/_user/extracuricullarHome")({
    component: ExtracurricularHome,
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

function ExtracurricularHome() {
    const cardsPerPage = 8;
    const [startIndex, setStartIndex] = useState<number>(0);
    const [endIndex, setEndIndex] = useState<number>(8);

    const { data, isFetching } = useGetAllExtracuricullarQuery();
    if (isFetching) {
        return <Shimmer />;
    }
    // @ts-ignore
    const { events } = data;
    console.log(events);
    return (
        <h1>Hey</h1>
        // <div className="flex flex-col justify-between">
        //     <div className="basis-5/6">
        //         <h1 className="mb-3 text-2xl">Extracuricullar Events</h1>
        //         <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        //             {startIndex === 0 &&
        //                 (events.length < 1 ? (
        //                     <NewEventCard
        //                         eventType="Extracuricullar"
        //                         to="/extracurricularForm"
        //                         firstCard={true}
        //                     />
        //                 ) : (
        //                     <NewEventCard
        //                         eventType="Extracuricullar"
        //                         to="/extracurricularForm"
        //                         firstCard={false}
        //                     />
        //                 ))}
        //             {events
        //                 .slice(startIndex, endIndex)
        //                 .map((achievement: TAchievementData) => {
        //                     return (
        //                         <AchievementCard
        //                             achievementData={achievement}
        //                             key={achievement.id}
        //                         />
        //                     );
        //                 })}
        //         </div>
        //     </div>

        //     {events.length > cardsPerPage && (
        //         <Pagination className="">
        //             <PaginationContent>
        //                 <PaginationItem>
        //                     <PaginationPrevious
        //                         className={
        //                             startIndex === 0
        //                                 ? "pointer-events-none opacity-50"
        //                                 : undefined
        //                         }
        //                         onClick={() => {
        //                             setStartIndex(startIndex - cardsPerPage);
        //                             setEndIndex(endIndex - cardsPerPage);
        //                         }}
        //                     />
        //                 </PaginationItem>

        //                 <PaginationItem>
        //                     <PaginationNext
        //                         className={
        //                             events.slice(startIndex, endIndex).length <
        //                             endIndex
        //                                 ? "pointer-events-none opacity-50"
        //                                 : undefined
        //                         }
        //                         onClick={() => {
        //                             setStartIndex(startIndex + cardsPerPage);
        //                             setEndIndex(endIndex + cardsPerPage);
        //                         }}
        //                     />
        //                 </PaginationItem>
        //             </PaginationContent>
        //         </Pagination>
        //     )}
        // </div>
    );
}
