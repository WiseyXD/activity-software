import moment from "moment";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

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
};

export default function AchievementCard({
    achievementData,
}: TAchievementCardProps) {
    return (
        // <Card className="transition duration-100 ease-in-out h-[230px] md:h-[210px]">
        <Link
            to="/achievements/$achievementId"
            params={{
                achievementId: achievementData.id,
            }}
            className="block py-1"
        >
            <Card className="transition duration-100 ease-in-out ">
                <CardHeader className="flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                        <CardTitle className="w-full flex justify-between">
                            {achievementData.title}
                        </CardTitle>
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
        </Link>
    );
}
