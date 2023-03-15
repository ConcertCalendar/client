import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    boardArr : ["자유 게시판" , "공연 후기 게시판"],
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoardName : (state, action) => {
        return state.boardArr[Number(action.payload)];
    },

    getBoardArr: (state, action) => {
        return state[action.payload];
    },
  }
})

// Action creators are generated for each case reducer function
export const {getBoardName,  getBoardArr } = boardSlice.actions //reducer의 actions을 export

export default boardSlice.reducer;