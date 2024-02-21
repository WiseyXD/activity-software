import Shimmer from "@/components/shared/Shimmer";
import { useGetAchievementByIdQuery } from "@/services/api/achievementApi";
import { createFileRoute } from "@tanstack/react-router";
import { Label } from "@/components/ui/label";
import moment from "moment";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { TAchievementData } from "./_user/achievements";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/achievements/$achievementId")({
    component: AchievementOverview,
});

function AchievementOverview() {
    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );
    const { achievementId } = Route.useParams();
    const { data, isFetching } = useGetAchievementByIdQuery(achievementId);
    if (isFetching) {
        <Shimmer />;
    }
    // null day
    // @ts-ignore
    const event: TAchievementData = data?.event;
    console.log(event);
    return (
        <>
            {!isAuthorized ? (
                <Navigate to="/login" />
            ) : (
                <>
                    <h1 className="text-2xl mt-3">Achievement</h1>
                    <Separator className="my-2" />
                    <div className="flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-2">
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Title of Achievement :
                                </Label>
                                <p className="font-semibold">{event?.title}</p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Institute Name :
                                </Label>
                                <p className="font-semibold">
                                    {event?.instituteName}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Achievement Description :
                                </Label>
                                <p className="font-semibold">
                                    {event?.description}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Achievement :
                                </Label>
                                <p className="font-semibold">
                                    {event?.achievement.toUpperCase()}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Type of Achievement :
                                </Label>
                                <p className="font-semibold">
                                    {event?.activityType.toUpperCase()}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Event Level :
                                </Label>
                                <p className="font-semibold">
                                    {event?.eventLevel.toUpperCase()}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Person category :
                                </Label>
                                <p className="font-semibold">
                                    {event?.personCategory.toUpperCase()}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Date of Event :
                                </Label>
                                <p className="font-semibold">
                                    {moment(event?.dateOfEvent).calendar()}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Prize :
                                </Label>
                                <p className="font-semibold">
                                    {event?.awardAmount}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Drive link for achievement proof :
                                </Label>
                                <p className="font-semibold">
                                    {event?.achievementProof}
                                </p>
                            </div>
                        </div>
                        <h2 className="text-xl mb-1 mt-7">
                            Participant Details
                        </h2>
                        <Separator />
                        <Accordion type="multiple">
                            {event?.participants.map((participant, index) => (
                                <AccordionItem
                                    value={"item-" + index}
                                    key={index}
                                >
                                    <AccordionTrigger>
                                        {participant?.name}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex-col flex gap-2">
                                            <div>
                                                Department -{" "}
                                                {participant?.department}
                                            </div>
                                            <div>
                                                Year - {participant?.year}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    <div className="flex gap-2">
                        <Button className="w-full mt-3" variant={"outline"}>
                            Edit
                        </Button>
                        <Button className="w-full mt-3">Export PDF</Button>
                    </div>
                </>
            )}
        </>
    );
}
