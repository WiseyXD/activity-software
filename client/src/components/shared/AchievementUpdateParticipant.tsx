import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useUpdateParticipantDetailsByIdMutation } from "@/services/api/achievementApi";

type AchievementUpdateParticipantProps = {
    participantData: {
        name: string;
        year: string;
        department: string;
        id: string;
    };
};

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

const formSchema = z.object({
    name: z.string().min(2, "Minimum 2 Characters are required"),
    year: z.string().nonempty("Year is Required"),
    department: z.string().nonempty("Department is Required"),
});

export default function AchievementUpdateParticipant({
    participantData,
}: AchievementUpdateParticipantProps) {
    const [updateParticipant] = useUpdateParticipantDetailsByIdMutation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: participantData.name,
            year: participantData.year,
            department: participantData.department,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // @ts-ignore
        const { data, isFetching } = await updateParticipant({
            id: participantData.id,
            credentials: values,
        });
        if (isFetching) {
            return null;
        }
        console.log(data);
    }
    return (
        <div className="grid gap-2">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Aryan..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Participant's name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Year</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Year" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {yearOptions.map((activity) => {
                                            return (
                                                <SelectItem
                                                    value={activity}
                                                    key={activity}
                                                >
                                                    {activity.toString()}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Department</FormLabel>
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
                                        {departmentOptions.map((activity) => {
                                            return (
                                                <SelectItem
                                                    value={activity}
                                                    key={activity}
                                                >
                                                    {activity.toString()}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="w-full" type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
