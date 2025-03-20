import { createSlice } from "@reduxjs/toolkit";
import { fetchUser,deleteUser,createUser } from "../Thunks/User";

const userSlice = createSlice({
    name : 'user',
    initialState:[],
    extraReducers(builder){
        builder
        .addCase(fetchUser.fulfilled,(state,action)=>{
            return action.payload
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            throw new Error(action.error);
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            return []
        })
        .addCase(createUser.fulfilled,(state,action)=>{
            state.push(action.payload) 
        })
    }
})

export const userReducer = userSlice.reducer;