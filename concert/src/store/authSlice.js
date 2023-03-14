import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    accessToken: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeAccessToken : (state , action) => {
        state.accessToken = action.payload;
    },

    resetAccessToken: (state) =>{
      state.accessToken = "";
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { storeAccessToken , resetAccessToken} = authSlice.actions //reducer의 actions을 export

export default authSlice.reducer