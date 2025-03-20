import { createSlice } from "@reduxjs/toolkit";
import { fetchToDos } from "../Thunks/fetchToDos";
import { deleteTodo } from "../Thunks/deleteTodo";
import { deleteSubTodo } from "../Thunks/deleteSubTodo";
import { updateToDo } from "../Thunks/updateToDo";
import { updateSubToDo } from "../Thunks/updateSubToDo";

const todoSlice = createSlice({
    name: 'todosLists',
    initialState: {
        isLoading: false,
        data : [],
        error : null,
        expandedToDoId: null
    },
    reducers:{
        toggleExpand : (state,action)=>{
            state.expandedToDoId = state.expandedToDoId === action.payload ? null : action.payload;
        }
    },
    extraReducers (builder) {
        builder.addCase(fetchToDos.pending, (state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchToDos.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchToDos.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(deleteTodo.fulfilled,(state,action)=>{
            state.isLoading = false;
            const todoId = action.payload;
            state.data = state.data.filter(todo=> todo.id !==todoId)
        })
        builder.addCase(deleteTodo.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(deleteSubTodo.fulfilled,(state,action)=>{
            state.isLoading = false;
            const {todoId,subToDoKey} = action.payload;
            const todo = state.data.find(todo=> todo.id ===todoId)
            if(todo){
                const newSubToDo = {...todo.subToDos}
               delete newSubToDo[subToDoKey]
               todo.subToDos = newSubToDo
            }
        })
        builder.addCase(deleteSubTodo.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(updateToDo.fulfilled,(state,action)=>{
            const {todoId, title, subToDos} = action.payload;
            state.data = state.data.map(todo => 
                todo.id === todoId ? { ...todo, title, subToDos } : todo
            );
        })
        builder.addCase(updateSubToDo.fulfilled,(state,action)=>{
            const {todoId,updatedSubToDo} = action.payload
            const todo = state.data.find(todo => todo.id === todoId)
            if(todo){
                todo.subToDos = updatedSubToDo
            }
        })
    }
})

export const todoReducer = todoSlice.reducer;
export const {toggleExpand} = todoSlice.actions;