"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

const formSchema = z.object({
    instituteName: z.string().min(2, {
        message: "Institute Name must be at least 2 characters.",
    }),
    activityType: z.string().min(2, {
        message: "Activity Type must be at least 2 characters.",
    }),
    eventLevel: z.string().min(2, {
        message: "Event Level must be at least 2 characters.",
    }),
    dateOfEvent: z.date(),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z
        .string()
        .min(2, {
            message: "Description must be at least 2 characters.",
        })
        .optional(),
    rankAchieved: z
        .string()
        .min(2, {
            message: "Rank Achieved must be at least 2 characters.",
        })
        .optional(),
    personCategory: z.string().min(2, {
        message: "Person Category must be at least 2 characters.",
    }),
    achievement: z.string().min(2, {
        message: "Achievement must be at least 2 characters.",
    }),
    awardAmount: z.string(),
    achievementProof: z.any().refine(
        (files) => {
            return Array.from(files).every((file) => file instanceof File);
        },
        { message: "Expected a file" }
    ),
    // participants: z.array(
    //     z.object({
    //         name: z.string().min(2, {
    //             message: "Participant Name must be at least 2 characters.",
    //         }),
    //         department: z.string().min(2, {
    //             message: "Department must be at least 2 characters.",
    //         }),
    //         year: z.string().min(2, {
    //             message: "Year must be at least 2 characters.",
    //         }),
    //     })
    // ),
});

export default function AchievementForm() {
    const [date, setDate] = useState<Date>();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            achievementProof: new File([], ""),
            instituteName: "",
            activityType: "",
            eventLevel: "",
            dateOfEvent: new Date(),
            title: "",
            description: "",
            rankAchieved: "",
            personCategory: "",
            achievement: "",
            awardAmount: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="eventLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Level</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
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
                                        accept=".jpg, .jpeg, .png, .svg, .pdf"
                                        multiple
                                        type="file"
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.files
                                                    ? e.target.files
                                                    : null
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="instituteName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Institute Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Description for Institute Name field.
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
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Description for Activity Type field.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dateOfEvent"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Your date of birth is used to calculate your
                                    age.
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
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Description for Activity Type field.
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
                                <FormLabel>title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Description for Activity Type field.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Desc</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Description for Activity Type field.
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
                                <FormLabel>Rank Ac</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Description for Activity Type field.
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
                                <FormLabel>Person Caes</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Description for Activity Type field.
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
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Description for Activity Type field.
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
                                <FormLabel>Person Caes</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Description for Activity Type field.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <FormField
                    control={form.control}
                    name="participants"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Participants</FormLabel>
                            {field.value.map((participant, index) => (
                                <FormControl key={index}>
                                    <Input
                                        value={participant.name}
                                        placeholder="Name"
                                    />
                                    <Input
                                        value={participant.department}
                                        placeholder="Department"
                                    />
                                    <Input
                                        value={participant.year}
                                        placeholder="Year"
                                        type="number"
                                    />
                                </FormControl>
                            ))}
                            <FormDescription>
                                Description for Participants field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
