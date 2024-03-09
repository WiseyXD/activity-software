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
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { PlusCircle, Trash2 } from "lucide-react";

import { useState } from "react";
import { useCreateExtracurricularMutation } from "@/services/api/extracuricullarApi";

export const Route = createFileRoute("/_user/extracurricularForm")({
    component: ExtracurricularForm,
});

const eventTypeOptions: string[] = [
    "social",
    "sports",
    "cultural",
    "health",
    "ptm",
    "alumni-meet",
    "farewell",
    "any-other",
];

const eventLevelOptions = [
    "international",
    "national",
    "state",
    "inter-college",
    "institutional",
];

const personCategoryOptions = [
    "student",
    "teaching-staff",
    "non-teaching-staff",
    "male-students",
    "female-students",
    "male teaching-staff",
    "female teaching-staff",
    "male non-teaching-staff",
    "female non-teaching-staff",
    "all",
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

const formSchema: any = z.object({
    title: z
        .string()
        .min(2, "Minimum 2 Characters are required")
        .max(50, "Max 50 Characters are allowed"),
    department: z.string().nonempty("Department is Required"),
    organisedFor: z.string().min(2, "Minimum 5 Characters are required"),
    resourcePersonName: z.string().min(2, "Minimum 2 Characters are required"),
    resourcePersonDesignation: z
        .string()
        .min(5, "Minimum 5 Characters are required"),
    resourcePersonOrg: z.string().min(5, "Minimum 5 Characters are required"),
    resourcePersonDomain: z
        .string()
        .min(5, "Minimum 5 Characters are required"),
    eventType: z.string({
        required_error: "Please select an Event Type to display.",
    }),
    eventLevel: z.string({
        required_error: "Please select Level of the event to display.",
    }),

    typeOfParticipant: z.string({
        required_error: "Please select the Category to display.",
    }),
    startDate: z.date({
        required_error: "Date of Event is required.",
    }),
    endDate: z.date({
        required_error: "Date of Event is required.",
    }),
});

function ExtracurricularForm() {
    const [eventDate, setEventDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 5),
    });
    const [createExtracurricular] = useCreateExtracurricularMutation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formDirty, setFormDirty] = useState<boolean>(true);
    useBlocker(() => window.confirm("From is not fully filled yet"), formDirty);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",

            resourcePersonName: "",
            resourcePersonDesignation: "",
            resourcePersonOrg: "",
            resourcePersonDomain: "",
            // organizedFor: [{ department: "" }],
            organisedFor: "",
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
                title: "Extracurricular Event Created",
            });
            setFormDirty(false);
            // form.reset();
            // navigate({
            //     from: "/extracurricularForm",
            //     to: "/extracuricullarHome",
            // });
        } catch (error) {
            toast({
                title: "Error while creating extracuricullar entry.",
            });
            setIsLoading(false);
        }
    }

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "organizedFor",
    });

    function handleAppend() {
        append({ department: "" });
    }

    function handleRemove(index: number) {
        remove(index);
    }

    return (
        <>
            <h1 className="mb-3 text-2xl">Extracuricullar Form</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 mb-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Event Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Title of the Event
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organizing Department</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
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
                                        Enter Department name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="organisedFor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organized For </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Department Names"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        All the departments name must be
                                        seprated by ,
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
                            name="startDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col pt-3">
                                    <FormLabel>Start Date of Event</FormLabel>
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
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col pt-3">
                                    <FormLabel>End Date of Event</FormLabel>
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
                                        Date when the event ended
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="dateOfEvent"
                            render={({ field }) => (
                                <FormItem className="flex flex-col pt-3">
                                    <FormLabel>Date of Event</FormLabel>
                                    <div className={cn("grid gap-2")}>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    // id="eventDate"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[300px] justify-start text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value?.from ? (
                                                        field.value.to ? (
                                                            <>
                                                                {format(
                                                                    field.value
                                                                        .from,
                                                                    "LLL dd, y"
                                                                )}{" "}
                                                                -{" "}
                                                                {format(
                                                                    field.value
                                                                        .to,
                                                                    "LLL dd, y"
                                                                )}
                                                            </>
                                                        ) : (
                                                            format(
                                                                field.value
                                                                    .from,
                                                                "LLL dd, y"
                                                            )
                                                        )
                                                    ) : (
                                                        <span>
                                                            Pick a eventDate
                                                        </span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={
                                                        eventDate?.from
                                                    }
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <FormDescription>
                                        Date when the event was hosted
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="eventType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Type</FormLabel>
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
                                            {eventTypeOptions.map(
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
                                        Type of Event.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="typeOfParticipant"
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
                            name="resourcePersonName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resource Person Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Name of the resource person
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resourcePersonDesignation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resource Person Post</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Tell us a little bit about their post"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        About the post of the person
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resourcePersonOrg"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Resource Person Organzation
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Tell us a little bit about their company"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Name of the person organization
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resourcePersonDomain"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Resource Person Area of Expertise
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Tell us a little bit about their domain"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        About the Domain Expertise of person
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* {fields.map((dept, index) => {
                            return (
                                <>
                                    <FormField
                                        control={form.control}
                                        name={`organizedFor.${index}.department`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    {" "}
                                                    Participant {index + 1}{" "}
                                                    Department
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
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
                                </>
                            );
                        })} */}
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
