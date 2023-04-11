import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface authState {
  accessToken : string;
}

const initialState : authState = {
    accessToken: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeAccessToken : (state , action : PayloadAction<string>) => {
        state.accessToken = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { storeAccessToken } = authSlice.actions //reducer의 actions을 export

export default authSlice.reducer