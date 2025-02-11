import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeFeed:(state,action)=>{
            console.log("Remove : ",action.payload);
            
            const newFeed=state.filter((user)=>user._id!==action.payload);
            console.log("New Feed : ",newFeed);
            
            return newFeed;
        },
        removeAllFeed:(state,action)=>{
            return null;
        }    }
})
export default feedSlice.reducer;

export const{addFeed,removeFeed,removeAllFeed}=feedSlice.actions;