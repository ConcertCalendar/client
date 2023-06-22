import {  PayloadAction, createSlice } from '@reduxjs/toolkit'

interface joinState {
  phase : string;
  email : string;
  password : string;
  nickname : string;
  name : string;
  birth : string;
  gender : string;
}

const initialState : joinState = {
    phase : '0',
    email: "",
    password: "",
    nickname : "",
    name : "",
    birth : "",
    gender : "",
}

export const joinSlice = createSlice({
  name: 'join',
  initialState,
  reducers: {
    setPhase  : (state , action : PayloadAction<string>) =>{
        state.phase = action.payload;
    },
    setEmail : (state , action : PayloadAction<string>) =>{
        state.email = action.payload;
    },
    setPassword : (state , action : PayloadAction<string>) =>{
        state.password = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPhase,setEmail, setPassword } = joinSlice.actions //reducer의 actions을 export

export default joinSlice.reducer