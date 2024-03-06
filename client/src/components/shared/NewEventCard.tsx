import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type NewEventCardProps = {
    eventType: string;
    to: string;
    firstCard: boolean;
};

import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
export default function NewEventCard({
    eventType,
    to,
    firstCard,
}: NewEventCardProps) {
    const navigate = useNavigate();
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
