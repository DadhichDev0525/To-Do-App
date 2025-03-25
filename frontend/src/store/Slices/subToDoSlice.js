import { createSlice } from "@reduxjs/toolkit";
import { createsToDos } from "../Thunks/createToDos";
import { fetchSubTodos,deleteSubTodo,createSubTodos,updateSubToDo,toggleSubTodo } from "../Thunks/subToDosThunk";
import { act } from "react";

const subTodoSlice = createSlice({
    name: 'SubTodos',
    initialState : {
        data : [],
        isLoading : false,
        error: null
    },
    extraReducers (builder) {
        builder.addCase(createsToDos.pending, (state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(createsToDos.fulfilled,(state,action)=>{
            const {subtodos} = action.payload
            state.isLoading = false;
            state.data.push(subtodos)
        })
        builder.addCase(createsToDos.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        }) 
        builder
        .addCase(createSubTodos.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(createSubTodos.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data.unshift(action.payload)
        })
        .addCase(createSubTodos.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        })
        builder
        .addCase(fetchSubTodos.pending,(state,action)=>{
            state.isLoading = true;
        }) 
        .addCase(fetchSubTodos.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchSubTodos.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        })
        builder
        .addCase(deleteSubTodo.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(deleteSubTodo.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = state.data.filter(subtodo=> subtodo._id !== action.payload)
        })
        .addCase(deleteSubTodo.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        })
        builder
        .addCase(updateSubToDo.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(updateSubToDo.fulfilled,(state,action)=>{
            const{subToDoId,title} = action.payload
            state.isLoading = false;
            const subtodo = state.data.find(subtodo=>subtodo._id === subToDoId)
            if(subtodo) subtodo.title = title;
        })
        .addCase(updateSubToDo.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        })
        builder
        .addCase(toggleSubTodo.fulfilled,(state,action)=>{
            state.isLoading = false;
            const subtodo = state.data.find(subtodo=>subtodo._id === action.payload)
            if(subtodo) subtodo.completed = !subtodo.completed;
        })
        .addCase(toggleSubTodo.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        })
    }
})

export const subToDoReducer = subTodoSlice.reducer;