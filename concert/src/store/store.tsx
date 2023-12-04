import { configureStore } from "@reduxjs/toolkit";
import  loginReducer  from "./loginSlice"
import authReducer from "./authSlice";
import calendarReducer from './calendarSlice';
import joinReducer from './joinSlice';
import commentReducer from './commentSlice'

export const store = configureStore({
    reducer : {
        login: loginReducer,
        auth : authReducer,
        calendar : calendarReducer,
        join : joinReducer,
        comment: commentReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;