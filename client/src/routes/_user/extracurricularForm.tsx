"use client";
import { z } from "zod";
import {
    createFileRoute,
    useNavigate,
    useBlocker,
} from "@tanstack/react-router";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { PlusCircle, Trash2 } from "lucide-react";

import { useState } from "react";
import { useCreateExtracurricularMutation } from "@/services/api/extracuricullarApi";

export const Route = createFileRoute("/_user/extracurricularForm")({
    component: ExtracurricularForm,
});

const activityTypeOptions: string[] = [
    "poster-presentation",
    "technical-conference",
    "model-competition",
    "project-competition",
    "paper-presentation",
    "research-proposal",
    "research-paper",
    "technical-talk",
    "non-tecnical-event-judge",
    "patents",
    "syllabus-revision",
    "any-other",
];

const eventLevelOptions = [
    "international",
    "national",
    "state",
    "inter-college",
    "institutional",
];

const achievementOptions = [
    "best-paper",
    "secured-rank",
    "research-grant",
    "patent-registration",
    "award",
    "any-other",
];

const personCategoryOptions = [
    "student",
    "teaching-staff",
    "non-teaching-staff",
];

const departmentOptions = [
    "CSE-AIML",
    "CSE-DS",
    "COMPS",
    "IT",
    "MECH",
    "CIVIL",
    "AUTOMOBILE",
    "NON-TEACHING",
];

const yearOptions = ["1st", "2nd", "3rd", "4th", "TEACHING", "NON-TEACHING"];

const formSchema: any = z.object({
    instituteName: z
        .string()
        .min(2, "Minimum 2 Characters are required")
        .max(50, "Max 50 Characters are allowed"),
    description: z.string().min(10, "Minimum 10 Characters are required"),
    rankAchieved: z
        .string()
        .min(2, "Minimum 2 Characters are required")
        .max(50, "Max 50 Characters are allowed"),
    title: z
        .string()
        .min(2, "Minimum 2 Characters are required")
        .max(50, "Max 50 Characters are allowed"),
    awardAmount: z.string().min(2, "Minimum 2 Characters are required"),
    achievementProof: z.string().min(5, "Minimum 5 Characters are required"),
    activityType: z.string({
        required_error: "Please select an Activity Type to display.",
    }),
    eventLevel: z.string({
        required_error: "Please select Level of the event to display.",
    }),
    achievement: z.string({
        required_error: "Please select Achievement to display.",
    }),
    personCategory: z.string({
        required_error: "Please select the Category to display.",
    }),
    dateOfEvent: z.date({
        required_error: "Date of Event is required.",
    }),
    participants: z.array(
        z.object({
            name: z.string().min(2, "Minimum 2 Characters are required"),
            year: z.string().nonempty("Year is Required"),
            department: z.string().nonempty("Department is Required"),
        })
    ),
});

function ExtracurricularForm() {
    const [createExtracurricular] = useCreateExtracurricularMutation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formDirty, setFormDirty] = useState<boolean>(true);
    useBlocker(() => window.confirm("From is not fully filled yet"), formDirty);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            instituteName: "",
            awardAmount: "",
            description: "",
            rankAchieved: "",
            title: "",
            achievementProof: "",
            participants: [{ name: "", year: "", department: "" }],
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setIsLoading(true);
        try {
            // @ts-ignore
            const { data, isFetching } = await createExtracurricular(values);
            setIsLoading(false);
            toast({
                title: "Achievement Created",
            });
            setFormDirty(false);
            form.reset();
            navigate({
                from: "/extracurricularForm",
                to: "/extracuricullarHome",
            });
        } catch (error) {
            toast({
                title: "Error while createing achievement entry.",
            });
            setIsLoading(false);
        }
    }

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "participants",
    });

    function handleAppend() {
        append({ name: "", year: "", department: "" });
    }

    function handleRemove(index: number) {
        remove(index);
    }

    return (
        <>
            <h1 className="mb-3 text-2xl">Achievement Form</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
                        <FormField
                            control={form.control}
                            name="instituteName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Institute Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="SCOE" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Name of the Institute
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Title of achievement
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="awardAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Award Granted</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Award Granted"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Award Granted from the achievement
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="achievementProof"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Achievement Proof</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://drive..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Achievement Proof document.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateOfEvent"
                            render={({ field }) => (
                                <FormItem className="flex flex-col pt-3">
                                    <FormLabel>Date of Event</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="center"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                        new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Date when the event was hosted
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="activityType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activity Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type of Activity" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {activityTypeOptions.map(
                                                (activity) => {
                                                    return (
                                                        <SelectItem
                                                            value={activity}
                                                            key={activity}
                                                        >
                                                            {activity
                                                                .toString()
                                                                .toUpperCase()}
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Type of activity.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="eventLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Level</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select level of the event" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {eventLevelOptions.map(
                                                (activity) => {
                                                    return (
                                                        <SelectItem
                                                            value={activity}
                                                            key={activity}
                                                        >
                                                            {activity
                                                                .toString()
                                                                .toUpperCase()}
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Type of event level.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="achievement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Achievement</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select kind of Achievement" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {achievementOptions.map(
                                                (activity) => {
                                                    return (
                                                        <SelectItem
                                                            value={activity}
                                                            key={activity}
                                                        >
                                                            {activity
                                                                .toString()
                                                                .toUpperCase()}
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Type of achievement.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="personCategory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Person Category</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type of personell" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {personCategoryOptions.map(
                                                (activity) => {
                                                    return (
                                                        <SelectItem
                                                            value={activity}
                                                            key={activity}
                                                        >
                                                            {activity
                                                                .toString()
                                                                .toUpperCase()}
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Type of achievement.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rankAchieved"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rank Achieved</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Rank" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        About the rank achieved
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Achievement Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about the achievement"
                                        className="resize"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <h1 className="text-xl mt-5">Participant's Details</h1>
                    {/* Add Grid for layout , md size screen */}
                    <div className="flex flex-col my-2">
                        {fields.map((participant, index) => {
                            return (
                                <div key={index}>
                                    <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
                                        <FormField
                                            control={form.control}
                                            name={`participants.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Participant {index + 1}{" "}
                                                        Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Aryan Nagbanshi..."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`participants.${index}.year`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {" "}
                                                        Participant {index +
                                                            1}{" "}
                                                        Year
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Year" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {yearOptions.map(
                                                                (activity) => {
                                                                    return (
                                                                        <SelectItem
                                                                            value={
                                                                                activity
                                                                            }
                                                                            key={
                                                                                activity
                                                                            }
                                                                        >
                                                                            {activity.toString()}
                                                                        </SelectItem>
                                                                    );
                                                                }
                                                            )}
                                                        </SelectContent>
                                                    </Select>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`participants.${index}.department`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {" "}
                                                        Participant {index +
                                                            1}{" "}
                                                        Department
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Department" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {departmentOptions.map(
                                                                (activity) => {
                                                                    return (
                                                                        <SelectItem
                                                                            value={
                                                                                activity
                                                                            }
                                                                            key={
                                                                                activity
                                                                            }
                                                                        >
                                                                            {activity.toString()}
                                                                        </SelectItem>
                                                                    );
                                                                }
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>{" "}
                                    <div className="mt-2 flex gap-2 justify-end">
                                        {index === fields.length - 1 && (
                                            <PlusCircle
                                                role="button"
                                                onClick={handleAppend}
                                            />
                                        )}
                                        {index != 0 &&
                                            index === fields.length - 1 && (
                                                <Trash2
                                                    role="button"
                                                    onClick={() =>
                                                        handleRemove(index)
                                                    }
                                                />
                                            )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
}
