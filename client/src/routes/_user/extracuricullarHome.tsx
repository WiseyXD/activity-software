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
import { IExtracurricularEvent } from "@/services/api/extracuricullarApi";
import ExtracuricullarCard from "@/components/shared/ExtracurricularCard";

export const Route = createFileRoute("/_user/extracuricullarHome")({
    component: ExtracurricularHome,
});

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
        // <>hey</>
        <div className="flex flex-col justify-between">
            <div className="basis-5/6">
                <h1 className="mb-3 text-2xl">Extracuricullar Events</h1>
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                    {startIndex === 0 &&
                        (events.length < 1 ? (
                            <NewEventCard
                                eventType="Extracuricullar"
                                to="/extracurricularForm"
                                firstCard={true}
                            />
                        ) : (
                            <NewEventCard
                                eventType="Extracuricullar"
                                to="/extracurricularForm"
                                firstCard={false}
                            />
                        ))}
                    {events
                        .slice(startIndex, endIndex)
                        .map((event: IExtracurricularEvent) => {
                            return (
                                <ExtracuricullarCard
                                    eventData={event}
                                    key={event.id}
                                />
                            );
                        })}
                </div>
            </div>

            {events.length > cardsPerPage && (
                <Pagination className="">
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
                                className={
                                    events.slice(startIndex, endIndex).length <
                                    endIndex
                                        ? "pointer-events-none opacity-50"
                                        : undefined
                                }
                                onClick={() => {
                                    setStartIndex(startIndex + cardsPerPage);
                                    setEndIndex(endIndex + cardsPerPage);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
