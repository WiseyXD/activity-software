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
};

import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
export default function NewEventCard({ eventType, to }: NewEventCardProps) {
    const navigate = useNavigate();
    return (
        <Card className="flex justify-center items-center h-[350px] lg:h-[300px]">
            <Link to={to}>
                <Button>Add {eventType} Event</Button>
            </Link>
        </Card>
    );
}
