import { configureStore } from "@reduxjs/toolkit";
import  loginReducer  from "../pages/Login/loginSlice"
import authReducer from "./authSlice"
import boardReducer from "../pages/Post/boardSlice";
export const store = configureStore({
    reducer : {
        login: loginReducer,
        auth : authReducer,
        board : boardReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;