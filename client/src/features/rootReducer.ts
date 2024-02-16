import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "currentUser"],
};

const rootReducer = combineReducers({
    auth: authReducer,
});

export default persistReducer(persistConfig, rootReducer);
