import rootReducer from "@/features/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/services/auth";

import { achievementApi } from "@/services/api/achievementApi";
import { extracuricullarApi } from "@/services/api/extracuricullarApi";
import { placementApi } from "@/services/api/placementApi";
import { technicalApi } from "@/services/api/technicalApi";

const store = configureStore({
    reducer: {
        root: rootReducer,
        [authApi.reducerPath]: authApi.reducer,
        [achievementApi.reducerPath]: achievementApi.reducer,
        [extracuricullarApi.reducerPath]: extracuricullarApi.reducer,
        [placementApi.reducerPath]: placementApi.reducer,
        [technicalApi.reducerPath]: technicalApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(achievementApi.middleware)
            .concat(extracuricullarApi.middleware)
            .concat(placementApi.middleware)
            .concat(technicalApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { store, persistor };
setupListeners(store.dispatch);
