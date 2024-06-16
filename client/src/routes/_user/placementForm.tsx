import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

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

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePlacementMutation } from "@/services/api/placementApi";
import { useNavigate } from "@tanstack/react-router";
import { useBlocker } from "@tanstack/react-router";

const typeOfPool = ["On Campus", "Off Campus", "Walk In"];

const formSchema: any = z.object({
    nameOfCompany: z.string().min(1),
    dateOfVisit: z.date({ required_error: "Date of Event is required." }),
    organisedFor: z.string().min(1),
    typeOfVisit: z.string().min(1),
    salaryPackage: z.number().positive(),
    noOfParticipationFromSaraswati: z.number().int().nonnegative(),
    noOfParticipationOverall: z.number().int().nonnegative(),
    noOfStudentsSelectedFromSaraswati: z.number().int().nonnegative(),
    noOfStudentsSelectedOverall: z.number().int().nonnegative(),
    listOfSelectedStudentsFromSaraswati: z.string().min(1),
});

export const Route = createFileRoute("/_user/placementForm")({
    component: PlacementForm,
});

function PlacementForm() {
    // @ts-ignore
    const [createPlacement] = useCreatePlacementMutation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formDirty, setFormDirty] = useState<boolean>(true);
    useBlocker(() => window.confirm("From is not fully filled yet"), formDirty);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameOfCompany: "",
            // dateOfVisit
            organisedFor: "",
            typeOfVisit: "",
            salaryPackage: 0,
            noOfParticipationFromSaraswati: 0,
            noOfParticipationOverall: 0,
            noOfStudentsSelectedFromSaraswati: 0,
            noOfStudentsSelectedOverall: 0,
            listOfSelectedStudentsFromSaraswati: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setIsLoading(true);
        try {
            // @ts-ignore
            const { data, isFetching, isError } = await createPlacement(values);
            setIsLoading(false);
            if (isError) {
                toast({
                    variant: "destructive",
                    title: "Placement Event Created error",
                });
                setIsLoading(false);
                return;
            }
            toast({
                title: "Placement Event Created",
            });
            setFormDirty(false);
            form.reset();
            navigate({
                from: "/placementForm",
                to: "/placementHome",
            });
        } catch (error) {
            toast({
                title: "Error while creating placement entry.",
            });
            setIsLoading(false);
        }
    }
    return (
        <>
            <h1 className="mb-3 text-2xl">Placement Form</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 mb-4">
                        <FormField
                            control={form.control}
                            name="nameOfCompany"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of the Company </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter name of the hiring company."
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Name of the hiring company.
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
                                    <FormLabel>Organized For</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Organized for which departments."
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        All the deaprtments should be seprated
                                        by comma.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateOfVisit"
                            render={({ field }) => (
                                <FormItem className="flex flex-col pt-3">
                                    <FormLabel>Date of Visit</FormLabel>
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
                                        Date when the company visited.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="typeOfVisit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type of Visit</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Pool" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {typeOfPool.map((activity) => {
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
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select type of pool of placement.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="salaryPackage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary Package</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter the salary package"
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.valueAsNumber
                                                )
                                            }
                                            disabled={isLoading}
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Provide the salary package offered.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="noOfParticipationFromSaraswati"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        No. of Participation from Saraswati
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter the number of participants from Saraswati"
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.valueAsNumber
                                                )
                                            }
                                            disabled={isLoading}
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Number of participants from Saraswati
                                        College.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="noOfParticipationOverall"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        No. of Participation Overall
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter the overall number of participants"
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.valueAsNumber
                                                )
                                            }
                                            disabled={isLoading}
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Total number of participants.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="noOfStudentsSelectedFromSaraswati"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        No. of Students Selected from Saraswati
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter the number of students selected from Saraswati"
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.valueAsNumber
                                                )
                                            }
                                            disabled={isLoading}
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Number of students selected from
                                        Saraswati College.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="noOfStudentsSelectedOverall"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        No. of Students Selected Overall
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter the overall number of students selected"
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.valueAsNumber
                                                )
                                            }
                                            disabled={isLoading}
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Total number of students selected.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="listOfSelectedStudentsFromSaraswati"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    List of Selected Students from Saraswati
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter the list of selected students from Saraswati"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    List the names of selected students from
                                    Saraswati College, separated by commas.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="mt-3 w-full"
                        disabled={isLoading}
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
}
