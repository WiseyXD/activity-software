import { useState } from "react";
import moment from "moment";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Participant {
    id: string;
    createdBy: string;
    name: string;
    department: string;
    year: string;
    files: string[];
}

type TAchievementCardProps = {
    achievementData: {
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
};

export default function AchievementCard({
    achievementData,
}: TAchievementCardProps) {
    console.log(achievementData);
    return (
        // <Card className="transition duration-100 ease-in-out h-[230px] md:h-[210px]">
        <Card className="transition duration-100 ease-in-out ">
            <CardHeader className="flex flex-row justify-between">
                <div className="flex flex-col gap-1">
                    <CardTitle>{achievementData.title}</CardTitle>
                    <CardDescription>
                        {achievementData.description?.substring(0, 40)} ...
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="flex gap-2">
                    {" "}
                    <p className="text-slate-500">Event type : </p>
                    {achievementData.activityType.toUpperCase()}
                </div>
                <div className="flex gap-2">
                    {" "}
                    <p className="text-slate-500">Event Level : </p>
                    {achievementData.eventLevel.toUpperCase()}
                </div>

                <div className="flex gap-2">
                    {" "}
                    <p className="text-slate-500">Achievement : </p>
                    {achievementData.achievement.toUpperCase()}
                </div>
                <div className="flex gap-2">
                    {" "}
                    <p className="text-slate-500">Person Category : </p>
                    {achievementData.personCategory.toUpperCase()}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
                <p className="text-slate-500">Created On : </p>
                {moment(achievementData.dateOfEvent).calendar()}
            </CardFooter>
        </Card>
    );
}
