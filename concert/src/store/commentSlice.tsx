import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { comment } from "components/Comment/Comment"; 

type commentState  = {
    commentList : Array<comment>
}

const initialState : commentState = {
    commentList : new Array<comment>()
}

type modify = {
    id : number;
    content : string;
}
const commentSlice = createSlice({
    name : 'comment',
    initialState,
    reducers: {
        setCommentList : (state , action:PayloadAction<Array<comment>>) => {
            state.commentList = action.payload;
        },
        deleteComment : (state , action : PayloadAction<comment>) => {
            state.commentList = state.commentList.filter((comment) => comment.id !== action.payload.id);
        },
        modifyComment :(state , action : PayloadAction<modify>) => { /**[0] = commentId , [1] = content**/
            state.commentList = state.commentList.map((comment)=> {
                if(comment.id === action.payload.id){
                    comment.commentContent = action.payload.content;
                }
                return comment;
            })
        },
    },
})

export const { setCommentList  , deleteComment , modifyComment} = commentSlice.actions;

export default commentSlice.reducer;
