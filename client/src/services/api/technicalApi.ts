import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

interface TechnicalEvent {
    title: string;
    department: string;
    eventLevel: string;
    orgaisedFor: string[];
    createdBy?: string;
    eventType: string;
    typeOfParticipant: string;
    startDate: Date;
    endDate: Date;
    resourcePersonName: string;
    resourcePersonDesignation: string;
    resourcePersonOrg: string;
    resourcePersonDomain: string;
}

export const technicalApi = createApi({
    reducerPath: "technicalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_TECHNICAL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).root.auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createTechnical: builder.mutation<string, TechnicalEvent>({
            query: (credentials) => ({
                url: "create",
                method: "POST",
                body: credentials,
            }),
        }),
        getAllTechnical: builder.query<TechnicalEvent[], void>({
            query: () => ({
                url: "read",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllTechnicalQuery, useCreateTechnicalMutation } =
    technicalApi;
