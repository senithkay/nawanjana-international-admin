import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NOTIFICATION_TYPES} from "@/utils/enums";

export interface Notification {
    type:number;
    message:string;
    show:boolean;
}

interface NotificationState {
    notification: Notification;
}

const initialState: NotificationState = {
    notification: {
        type:NOTIFICATION_TYPES.DEFAULT,
        message:'',
        show:false
    },
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showHide: (state, action: PayloadAction<Notification>) => {
            state.notification = action.payload;
        }
    }
})

export default notificationSlice.reducer;
export const {showHide} = notificationSlice.actions;