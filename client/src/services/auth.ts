import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginCredentials {
    email: string;
    password: string;
}

interface Faculty {
    email: string;
    password: string;
}

interface UserData {
    token: string | null;
    userEmail: string;
    userId: string;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_AUTH as string, // Assuming VITE_BASE_AUTH is a string
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<Faculty, LoginCredentials>({
            query: (credentials: LoginCredentials) => ({
                url: "signup",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
        login: builder.mutation<UserData, LoginCredentials>({
            query: (credentials: LoginCredentials) => ({
                url: "login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
