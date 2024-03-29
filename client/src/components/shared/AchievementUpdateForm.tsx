import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
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
import { Button } from "../ui/button";
import { TAchievementData } from "@/routes/_user/achievements";
import { useUpdateAchievementByIdMutation } from "@/services/api/achievementApi";

type AchievementUpdateFormProps = {
    event: TAchievementData;
    achievementId: string;
};

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

const formSchema = z.object({
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
});

export default function AchievementUpdateForm({
    event,
    achievementId,
}: AchievementUpdateFormProps) {
    const [updateAchievement] = useUpdateAchievementByIdMutation();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            instituteName: `${event.instituteName}`,
            awardAmount: `${event.awardAmount}`,
            description: `${event.description}`,
            rankAchieved: `${event.rankAchieved}`,
            title: `${event.rankAchieved}`,
            achievementProof: `${event.achievementProof}`,
            activityType: `${event.activityType}`,
            eventLevel: `${event.eventLevel}`,
            achievement: `${event.achievement}`,
            personCategory: `${event.personCategory}`,
            dateOfEvent: new Date(event.dateOfEvent),
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setIsLoading(true);
        try {
            // @ts-ignore
            const { data, isFetching } = await updateAchievement({
                id: achievementId,
                credentials: values,
            });
            console.log(data);
            setIsLoading(false);
            toast({
                title: "Achievement Updated",
            });
        } catch (error) {
            toast({
                title: "Error while Updating achievement entry.",
            });
            setIsLoading(false);
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-4">
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
                                                onSelect={(date) => {
                                                    console.log(
                                                        "Selected date:",
                                                        date
                                                    );
                                                    field.onChange(date);
                                                    console.log(
                                                        "Form value after change:",
                                                        form.getValues()
                                                    );
                                                }}
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
                    <div />
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
