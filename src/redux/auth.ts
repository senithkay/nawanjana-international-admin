import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Auth {
    isAuthenticated: boolean;
    id:string | undefined;
    name:string | undefined;
    email:string | undefined;
    image:string | undefined;
}

interface AuthState {
    auth: Auth;
}

const initialState: AuthState = {
    auth: {
        isAuthenticated: false,
        id:undefined,
        name:undefined,
        email:undefined,
        image:undefined,
    },
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticate: (state, action: PayloadAction<Auth>) => {
            state.auth = action.payload;
        }
    }
})

export default authSlice.reducer;
export const {authenticate} = authSlice.actions;