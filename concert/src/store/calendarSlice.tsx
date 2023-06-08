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
  type : string;
  genreList : Array<string>,
  maxPrice : string,
  minPrice : string,
  location : string,
}


interface calendarState {
    event : Array<calendarEvent>;
    filterEvent : Array<calendarEvent>;
    filter : boolean;
    typeFilterList : Array<string>;
    genreFilterList : Array<string>;
  }
  
  const initialState : calendarState = {
    event : new Array<calendarEvent>(),
    filterEvent : new Array<calendarEvent>(),
    filter: false,
    typeFilterList : new Array<string>(),
    genreFilterList : new Array<string>(),
  }
  
  export const calendarSlice = createSlice({
    name: 'calendarState',
    initialState,
    reducers: {
      setEvent : (state , action : PayloadAction<Array<calendarEvent>>) =>  {
        state.event = action.payload;
      }, 
      setFilterEvent : (state , action : PayloadAction<Array<calendarEvent>>) =>  {
        state.filterEvent = action.payload;
      }, 
      setFilter : (state, action: PayloadAction<boolean>)=> {
        state.filter = action.payload;
      },
      addFilterList : (state , action :PayloadAction<Array<string>>) => {
        if(action.payload[0] === '1'){
          state.typeFilterList.push(action.payload[1])
        }
        else if(action.payload[0] === '2'){
          state.genreFilterList.push(action.payload[1])
        }
      },
      deleteFilterList : (state , action :PayloadAction<Array<string>>) => {
        if(action.payload[0] === '1'){
          const newList = state.typeFilterList.filter((item) => {
            return item !== action.payload[1]
          })
          state.typeFilterList = newList;
        }
        else if(action.payload[0] === '2'){ 
          const newList = state.genreFilterList.filter((item) => {
            return item !== action.payload[1]
          })
          state.genreFilterList = newList;
        }
        },
      },
      

    })
  
  // Action creators are generated for each case reducer function
  export const { setEvent , setFilterEvent, setFilter , addFilterList , deleteFilterList} = calendarSlice.actions; //reducer의 actions을 export
  
  export default calendarSlice.reducer