import { useState, useRef } from "react";
import {
    createFileRoute,
    useNavigate,
    Link,
    Navigate,
} from "@tanstack/react-router";
import { useReactToPrint } from "react-to-print";
import moment from "moment";

import { PencilIcon, Trash2Icon } from "lucide-react";

import Shimmer from "@/components/shared/Shimmer";

import { Label } from "@/components/ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TAchievementData } from "./_user/achievements";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import AchievementUpdateForm from "@/components/shared/AchievementUpdateForm";
import AchievementUpdateParticipant from "@/components/shared/AchievementUpdateParticipant";
import AchievementAddParticipant from "@/components/shared/AchievementAddParticipant";
import {
    achievementApi,
    useDeleteAchievementByIdMutation,
    useGetAchievementByIdQuery,
} from "@/services/api/achievementApi";

export const Route = createFileRoute("/placement/$placementId")({
    component: PlacementOverview,
});

function PlacementOverview() {
    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );

    const [deleteAchievement] = useDeleteAchievementByIdMutation();
    const naviagte = useNavigate();
    const componentRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const { placementId } = Route.useParams();

    const { data, isFetching } = useGetAchievementByIdQuery(placementId);
    if (isFetching) {
        <Shimmer />;
    }
    // @ts-ignore
    const event: TAchievementData = data?.event;

    async function handleDeleteParticipant(id: string) {
        // @ts-ignore
        const { data, isFetching } = await deleteParticipant(id);
        console.log(data);
    }

    async function handleDelete() {
        // @ts-ignore
        const { data, isFetching, error } = deleteAchievement(event?.id);
        if (isFetching) return null;
        if (error) console.log(error);
        console.log(data);
        toast({
            title: "Achievement Deleted",
            variant: "destructive",
        });
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Achievement",
        onAfterPrint: () => console.log("Printed PDF successfully!"),
    });

    return (
        <>
            {!isAuthorized ? (
                <Navigate to="/login" />
            ) : (
                <div className="pb-4 min-h-screen">
                    <h1 className="text-2xl mt-3 font-semibold">Achievement</h1>
                    <Separator className="my-2" />
                    <div
                        ref={componentRef}
                        className="flex flex-col my-3"
                        style={{ width: "100%" }}
                    >
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
                        {event?.participants.length > 0 ? (
                            <>
                                <Accordion type="multiple">
                                    {event?.participants.map(
                                        (participant, index) => (
                                            <AccordionItem
                                                value={"item-" + index}
                                                key={index}
                                            >
                                                <AccordionTrigger>
                                                    {participant?.name}
                                                </AccordionTrigger>
                                                <AccordionContent className="flex justify-between">
                                                    <div className="flex-col flex gap-2">
                                                        <div>
                                                            Department -{" "}
                                                            {
                                                                participant?.department
                                                            }
                                                        </div>
                                                        <div>
                                                            Year -{" "}
                                                            {participant?.year}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Popover>
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <Button variant="outline">
                                                                    <PencilIcon
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-80">
                                                                <div className="grid gap-4">
                                                                    <div className="space-y-2">
                                                                        <h4 className="font-medium leading-none">
                                                                            Participant
                                                                            Details
                                                                        </h4>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Update
                                                                            the
                                                                            details.
                                                                        </p>
                                                                    </div>
                                                                    <AchievementUpdateParticipant
                                                                        participantData={
                                                                            participant
                                                                        }
                                                                    />
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <Button
                                                            variant={"outline"}
                                                            onClick={() =>
                                                                handleDeleteParticipant(
                                                                    participant.id
                                                                )
                                                            }
                                                        >
                                                            <Trash2Icon
                                                                size={20}
                                                            />
                                                        </Button>
                                                        {index ==
                                                            event?.participants
                                                                .length -
                                                                1 && (
                                                            <Popover>
                                                                <PopoverTrigger
                                                                    asChild
                                                                >
                                                                    <Button>
                                                                        Add
                                                                        Participant
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-80">
                                                                    <div className="grid gap-4">
                                                                        <div className="space-y-2">
                                                                            <h4 className="font-medium leading-none">
                                                                                Participant
                                                                                Details
                                                                            </h4>
                                                                            <p className="text-sm text-muted-foreground">
                                                                                Add
                                                                                the
                                                                                details.
                                                                            </p>
                                                                        </div>
                                                                        <AchievementAddParticipant
                                                                            achievementId={
                                                                                event?.id
                                                                            }
                                                                        />
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        )}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        )
                                    )}
                                </Accordion>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <p>No Participants for this Event</p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button>Add Participant</Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">
                                                    Participant Details
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Add the details.
                                                </p>
                                            </div>
                                            <AchievementAddParticipant
                                                achievementId={event?.id}
                                            />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )}
                    </div>
                    {/* tp */}
                    <div className="flex gap-2 mt-3">
                        <div className="w-full">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Edit Achievement
                                    </Button>
                                </DialogTrigger>
                                <ScrollArea>
                                    <DialogContent className="max-w-lg">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Edit Achievement
                                            </DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile
                                                here. Click save when you're
                                                done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="">
                                            <AchievementUpdateForm
                                                event={event}
                                                achievementId={event?.id}
                                                // achievementId={achievementId}
                                            />
                                        </div>
                                    </DialogContent>
                                </ScrollArea>
                            </Dialog>
                        </div>
                        <Button
                            className="w-full"
                            onClick={() => handlePrint()}
                        >
                            Export PDF
                        </Button>
                        <Link to="/achievements">
                            <Button
                                className="w-full"
                                variant={"destructive"}
                                onClick={handleDelete}
                            >
                                <Trash2Icon />
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
