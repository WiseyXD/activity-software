import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

interface ExtracurricularEvent {
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

export const extracuricullarApi = createApi({
    reducerPath: "extracuricullarApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_EXTRACURRICULAR,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).root.auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createExtracurricular: builder.mutation<string, ExtracurricularEvent>({
            query: (credentials) => ({
                url: "create",
                method: "POST",
                body: credentials,
            }),
        }),
        getAllExtracuricullar: builder.query<ExtracurricularEvent[], void>({
            query: () => ({
                url: "read",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCreateExtracurricularMutation,
    useGetAllExtracuricullarQuery,
} = extracuricullarApi;
