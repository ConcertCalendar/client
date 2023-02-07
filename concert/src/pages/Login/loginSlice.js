import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email : "",
  password : "",
  loginErrMsg : false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    inputEmail: (state, action) => {
      state.email = action.payload
    },
    inputPassword: (state ,action) => {
        state.password = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { inputEmail, inputPassword } = loginSlice.actions //reducer의 actions을 export

export default loginSlice.reducer