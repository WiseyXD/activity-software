import { useState, useRef } from "react";
import {
    createFileRoute,
    useNavigate,
    Link,
    Navigate,
} from "@tanstack/react-router";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
    useDeleteExtracurricularByIdMutation,
    useUpdateExtracurricularByIdMutation,
    useGetExtracuricullarByIdQuery,
    IExtracurricularEvent,
} from "@/services/api/extracuricullarApi";
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

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ExtracurricularUpdateForm from "@/components/shared/ExtracuricullarUpdateForm";

export const Route = createFileRoute(
    "/extracuricullarEvents/$extracuricullarEventId"
)({
    component: ExtracuricullarOverview,
});

function ExtracuricullarOverview() {
    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );

    const [deleteExtracuricullar] = useDeleteExtracurricularByIdMutation();
    const naviagte = useNavigate();
    const componentRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const { extracuricullarEventId } = Route.useParams();

    const { data, isFetching } = useGetExtracuricullarByIdQuery(
        extracuricullarEventId
    );
    if (isFetching) {
        <Shimmer />;
    }
    // @ts-ignore
    const event: IExtracurricularEvent = data?.event;
    console.log(event);

    async function handleDelete() {
        // @ts-ignore
        const { data, isFetching, error } = deleteExtracuricullar(event?.id);
        if (isFetching) return null;
        if (error) console.log(error);
        console.log(data);
        toast({
            title: "Event Deleted",
            variant: "destructive",
        });
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Extracuricullar Event",
        onAfterPrint: () => console.log("Printed PDF successfully!"),
    });

    return (
        <>
            {!isAuthorized ? (
                <Navigate to="/login" />
            ) : (
                <div className="pb-4 min-h-screen">
                    <h1 className="text-2xl mt-3 font-semibold">
                        Extracuricullar Event
                    </h1>
                    <Separator className="my-2" />
                    <div
                        ref={componentRef}
                        className="flex flex-col my-3 "
                        style={{ width: "100%" }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-2">
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Title of Event :
                                </Label>
                                <p className="font-semibold">{event?.title}</p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Organizing Dept :
                                </Label>
                                <p className="font-semibold">
                                    {event?.department.toUpperCase()}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Organized for :
                                </Label>
                                <p className="font-semibold">
                                    {event?.organisedFor}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Event Description :
                                </Label>
                                <p className="font-semibold">
                                    {event?.description}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Rank Achieved :
                                </Label>
                                <p className="font-semibold">
                                    {event?.rankAchieved}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Type of Event :
                                </Label>
                                <p className="font-semibold">
                                    {event?.eventType.toUpperCase()}
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
                                    Participant category :
                                </Label>
                                <p className="font-semibold">
                                    {event?.typeOfParticipant.toUpperCase()}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Start Date of Event :
                                </Label>
                                <p className="font-semibold">
                                    {moment(event?.startDate).calendar()}
                                </p>
                            </div>
                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    End Date of Event :
                                </Label>
                                <p className="font-semibold">
                                    {moment(event?.endDate).calendar()}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Resource person name :
                                </Label>
                                <p className="font-semibold">
                                    {event?.resourcePersonName}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Resource person organization :
                                </Label>
                                <p className="font-semibold">
                                    {event?.resourcePersonOrg}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Resource person domain :
                                </Label>
                                <p className="font-semibold">
                                    {event?.resourcePersonDomain}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Resource person designation :
                                </Label>
                                <p className="font-semibold">
                                    {event?.resourcePersonDesignation}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Outcome of the event:
                                </Label>
                                <p className="font-semibold">
                                    {event?.outcome}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Expenditure :
                                </Label>
                                <p className="font-semibold">
                                    {event?.expenditure}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Revenue :
                                </Label>
                                <p className="font-semibold">
                                    {event?.revenue}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Funding Agency :
                                </Label>
                                <p className="font-semibold">
                                    {event?.fundingAgency}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Funding Recieved :
                                </Label>
                                <p className="font-semibold">
                                    {event?.fundsReceived}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Honorarium Paid :
                                </Label>
                                <p className="font-semibold">
                                    {event?.honorariumPaid}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    Department Achievement :
                                </Label>
                                <p className="font-semibold">
                                    {event?.departmentAchievement}
                                </p>
                            </div>

                            <div className="flex-col flex gap-1">
                                <Label className="text-slate-500">
                                    College Achievement :
                                </Label>
                                <p className="font-semibold">
                                    {event?.collegeAchievement}
                                </p>
                            </div>
                        </div>
                        {/* <h2 className="text-xl mb-1 mt-7">
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
                    */}
                    </div>
                    <div className="flex gap-2 mt-3">
                        <div className="w-full">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Edit Event
                                    </Button>
                                </DialogTrigger>
                                <ScrollArea>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Edit Event
                                            </DialogTitle>
                                            <DialogDescription>
                                                Make changes to your event here.
                                                Click save when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="">
                                            <ExtracurricularUpdateForm
                                                event={event}
                                                eventId={extracuricullarEventId}
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
                        <Link to="/extracuricullarHome">
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
