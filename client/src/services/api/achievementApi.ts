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
    awardAmount: string;
    achievementProof: string;
    participants: Participant[];
    id: string;
}

interface UpdateAchievementbody {
    instituteName: string;
    activityType: string;
    eventLevel: string;
    dateOfEvent: Date;
    title: string;
    description: string;
    rankAchieved: string;
    personCategory: string;
    achievement: string;
    awardAmount: string;
    achievementProof: string;
}

interface UpdateParticipantBody {
    name: string;
    year: string;
    department: string;
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
    tagTypes: ["Achievement", "AchievementOverview"],
    endpoints: (builder) => ({
        getAllAchievement: builder.query<Achievementbody[], void>({
            query: () => ({
                url: "read",
                method: "GET",
            }),
            providesTags: ["Achievement"],
        }),
        createAchievement: builder.mutation<string, Achievementbody>({
            query: (credentials) => ({
                url: "create",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Achievement"],
        }),
        getAchievementById: builder.query<Achievementbody, string>({
            query: (id: string) => ({
                url: "read/" + id,
                method: "GET",
            }),
            providesTags: ["AchievementOverview"],
        }),
        updateAchievementById: builder.mutation<
            string,
            { id: string; credentials: UpdateAchievementbody }
        >({
            query: ({ id, credentials }) => ({
                url: `update/${id}`,
                method: "PUT",
                body: credentials,
            }),
            invalidatesTags: ["AchievementOverview"],
        }),

        updateParticipantDetailsById: builder.mutation<
            string,
            {
                id: string;
                credentials: UpdateParticipantBody;
            }
        >({
            query: ({ id, credentials }) => ({
                url: `update/participant/${id}`,
                method: "PUT",
                body: credentials,
            }),
            invalidatesTags: ["AchievementOverview"],
        }),
        createParticipant: builder.mutation<
            string,
            {
                id: string;
                credentials: UpdateParticipantBody;
            }
        >({
            query: ({ id, credentials }) => ({
                url: `create/participant/${id}`,
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["AchievementOverview"],
        }),
        deleteParticipantDetailsById: builder.mutation<string, string>({
            query: (id) => ({
                url: `delete/participant/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AchievementOverview"],
        }),
    }),
});

export const {
    useCreateAchievementMutation,
    useGetAllAchievementQuery,
    useGetAchievementByIdQuery,
    useUpdateAchievementByIdMutation,
    useUpdateParticipantDetailsByIdMutation,
    useDeleteParticipantDetailsByIdMutation,
    useCreateParticipantMutation,
} = achievementApi;
