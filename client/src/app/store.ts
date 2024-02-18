import rootReducer from "@/features/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/services/auth";
import { achievementApi } from "@/services/api/achievementApi";

const store = configureStore({
    reducer: {
        root: rootReducer,
        [authApi.reducerPath]: authApi.reducer,
        [achievementApi.reducerPath]: achievementApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(achievementApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { store, persistor };
setupListeners(store.dispatch);
