import { Card } from "@/components/ui/card";

type NewEventCardProps = {
    eventType: string;
    to: string;
    firstCard: boolean;
};

import { Button } from "../ui/button";

import { Link } from "@tanstack/react-router";
export default function NewEventCard({
    eventType,
    to,
    firstCard,
}: NewEventCardProps) {
    return (
        <Card
            className={
                firstCard
                    ? "flex justify-center items-center h-64 "
                    : "flex justify-center items-center"
            }
        >
            <Link to={to}>
                <Button>Add {eventType} Event</Button>
            </Link>
        </Card>
    );
}
