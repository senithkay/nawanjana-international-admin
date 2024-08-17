import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "@/redux/auth";
import {notificationSlice} from "@/redux/notification";
import {backdropSlice} from "@/redux/loading";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        notifications: notificationSlice.reducer,
        backdrop: backdropSlice.reducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

