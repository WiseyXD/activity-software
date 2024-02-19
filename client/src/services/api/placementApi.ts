import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

interface Placement {
    createdBy?: string;
    nameOfCompany: string;
    dateOfVisit: Date;
    orgaisedFor: string[];
    typeOfVisit: string;
    salaryPackage: number;
    noOfParticipationFromSaraswati: number;
    noOfParticipationOverall: number;
    noOfStudentsSelectedFromSaraswati: number;
    noOfStudentsSelectedOverall: number;
    listOfSelectedStudentsFromSaraswati: string[];
}

export const placementApi = createApi({
    reducerPath: "placementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_PLACEMENT,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).root.auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createPlacement: builder.mutation<string, Placement>({
            query: (credentials) => ({
                url: "create",
                method: "POST",
                body: credentials,
            }),
        }),
        getAllPlacement: builder.query<Placement[], void>({
            query: () => ({
                url: "read",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllPlacementQuery, useCreatePlacementMutation } =
    placementApi;
