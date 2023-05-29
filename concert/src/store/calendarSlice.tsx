import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface calendarEvent {
  id : string;
  title : string;
  start : Date | string;
  end : Date | string;
  conTime : string;
  singer : string;
  place : string;
  img : string;
}

interface calendarState {
    event : Array<calendarEvent>;
  }
  
  const initialState : calendarState = {
    event : new Array<calendarEvent>()
  }
  
  export const calendarSlice = createSlice({
    name: 'calendarState',
    initialState,
    reducers: {
      setEvent : (state , action : PayloadAction<Array<calendarEvent>>) =>  {
        state.event = action.payload;
        console.log('변환');
      }, 
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setEvent } = calendarSlice.actions; //reducer의 actions을 export
  
  export default calendarSlice.reducer