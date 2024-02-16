import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    token: string | null;
    userId: string | null;
    isAdmin: boolean | null;
}

const initialState: AuthState = {
    token: null,
    userId: null,
    isAdmin: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{
                token: string;
                userId: string;
                isAdmin: boolean;
            }>
        ) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.isAdmin = action.payload.isAdmin;
        },
        unsetUser: (state) => {
            state.token = null;
            state.userId = null;
            state.isAdmin = null;
        },
    },
});

export const { setUser, unsetUser } = authSlice.actions;
export default authSlice.reducer;
