import { createSlice } from "@reduxjs/toolkit";
import { createsToDos } from "../Thunks/createToDos";

const createTodoSlice = createSlice({
    name: 'addTodo',
    initialState : {
        isLoading : false,
        error: null
    },
    extraReducers (builder) {
        builder.addCase(createsToDos.pending, (state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(createsToDos.fulfilled,(state,action)=>{
            state.isLoading = false;
        })
        builder.addCase(createsToDos.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        })
        
    }
})

export const createToDoReducer = createTodoSlice.reducer;