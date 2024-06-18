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

import { IExtracurricularEvent } from "@/services/api/extracuricullarApi";

type ExtracuricullarCardProps = {
    eventData: IExtracurricularEvent;
};

export default function ExtracuricullarCard(props: ExtracuricullarCardProps) {
    return (
        // <Card className="transition duration-100 ease-in-out h-[230px] md:h-[210px]">
        <Link
            to="/extracuricullarEvents/$extracuricullarEventId"
            params={{
                extracuricullarEventId: props.eventData.id!,
            }}
            className="block py-1"
        >
            <Card className="transition duration-100 ease-in-out ">
                <CardHeader className="flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                        <CardTitle className="w-full flex justify-between">
                            {props.eventData.title}
                        </CardTitle>
                        <CardDescription>
                            {props.eventData.description?.substring(0, 40)} ...
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        {" "}
                        <p className="text-slate-500">Event type : </p>
                        {props.eventData.eventType.toUpperCase()}
                    </div>
                    <div className="flex gap-2">
                        {" "}
                        <p className="text-slate-500">Event Level : </p>
                        {props.eventData.eventLevel.toUpperCase()}
                    </div>

                    <div className="flex gap-2">
                        {" "}
                        <p className="text-slate-500">Achievement : </p>
                        {props.eventData.collegeAchievement.substring(0, 40)}...
                    </div>
                    <div className="flex gap-2">
                        {" "}
                        <p className="text-slate-500">Person Category : </p>
                        {props.eventData.typeOfParticipant.toUpperCase()}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                    <p className="text-slate-500">Started On : </p>
                    {moment(props.eventData.startDate).calendar()}
                </CardFooter>
            </Card>
        </Link>
    );
}
