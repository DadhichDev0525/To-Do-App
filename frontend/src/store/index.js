import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./Slices/todoSlice";
import { toggleExpand } from "./Slices/todoSlice";
import { userReducer } from "./Slices/userSlice";

export const store = configureStore({
    reducer:{
        user : userReducer,
        todos : todoReducer,
    }
})

export {toggleExpand};

export * from './Thunks/User'
export * from './Thunks/fetchToDos'
export * from './Thunks/createToDos'
export * from './Thunks/deleteTodo'
export * from './Thunks/deleteSubTodo'
export * from './Thunks/updateToDo'
export * from './Thunks/updateSubToDo'
