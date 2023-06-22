import { configureStore } from "@reduxjs/toolkit";
import  loginReducer  from "../pages/Login/loginSlice"
import authReducer from "./authSlice";
import calendarReducer from './calendarSlice';
import joinReducer from './joinSlice';

export const store = configureStore({
    reducer : {
        login: loginReducer,
        auth : authReducer,
        calendar : calendarReducer,
        join : joinReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;