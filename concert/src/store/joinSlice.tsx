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
    gender : "남성",
}

export const joinSlice = createSlice({
  name: 'join',
  initialState,
  reducers: {
    setInit : (state) => {
        state = initialState;
    },

    setPhase  : (state , action : PayloadAction<string>) =>{
        state.phase = action.payload;
    },
    setEmail : (state , action : PayloadAction<string>) =>{
        state.email = action.payload;
    },
    setPassword : (state , action : PayloadAction<string>) =>{
        state.password = action.payload;
    },
    setNickname : (state , action :PayloadAction<string>)=> {
      state.nickname = action.payload;
    },
    setName : (state , action :PayloadAction<string>)=> {
      state.name = action.payload;
    },
    setBirth : (state , action :PayloadAction<string>)=> {
      state.birth = action.payload;
    },
    setGender : (state , action :PayloadAction<string>)=> {
      state.gender = action.payload;
    },    
  },
})

// Action creators are generated for each case reducer function
export const {setInit , setPhase,setEmail, setPassword , setNickname,setName,setBirth,setGender } = joinSlice.actions //reducer의 actions을 export

export default joinSlice.reducer