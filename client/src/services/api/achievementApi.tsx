import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

interface Achievementbody {
    instituteName: string;
    activityType: string;
    eventLevel: string;
    dateOfEvent: Date;
    title: string;
    description: string;
    rankAchieved: string;
    personCategory: string;
    achievement: string;
    awardAmount: number;
    achievementProof: string;
    participants: Participant[];
}

interface Participant {
    id: string;
    createdBy: string;
    name: string;
    department: string;
    year: string;
    files: string[];
}

export const achievementApi = createApi({
    reducerPath: "achievementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_ACHIEVEMENT,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).root.auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createAchievement: builder.mutation<string, Achievementbody>({
            query: (credentials) => ({
                url: "create",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useCreateAchievementMutation } = achievementApi;
