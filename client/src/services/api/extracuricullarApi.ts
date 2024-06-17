import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

interface ExtracurricularEvent {
    title: string;
    department: string;
    eventLevel: string;
    organisedFor: string;
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
    tagTypes: ["Extracurricular", "ExtracurricularOverview"],
    endpoints: (builder) => ({
        createExtracurricular: builder.mutation<string, ExtracurricularEvent>({
            query: (credentials) => ({
                url: "create",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Extracurricular"],
        }),
        getAllExtracuricullar: builder.query<ExtracurricularEvent[], void>({
            query: () => ({
                url: "read",
                method: "GET",
            }),
            providesTags: ["Extracurricular"],
        }),
        deleteExtracurricularById: builder.mutation<string, string>({
            query: (id) => ({
                url: "delete/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Extracurricular"],
        }),
        updateExtracurricularById: builder.mutation<
            string,
            { id: string; credentials: ExtracurricularEvent }
        >({
            query: ({ id, credentials }) => ({
                url: "update/" + id,
                method: "PUT",
                body: credentials,
            }),
            invalidatesTags: ["Extracurricular", "ExtracurricularOverview"],
        }),
        getExtracuricullarById: builder.query<ExtracurricularEvent, string>({
            query: (id) => ({
                url: "read/" + id,
                method: "GET",
            }),
            providesTags: ["ExtracurricularOverview"],
        }),
    }),
});

export const {
    useCreateExtracurricularMutation,
    useGetAllExtracuricullarQuery,
    useGetExtracuricullarByIdQuery,
    useDeleteExtracurricularByIdMutation,
    useUpdateExtracurricularByIdMutation,
} = extracuricullarApi;
