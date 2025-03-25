import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:4200/api/subtodos'

export const fetchSubTodos = createAsyncThunk('fetch/subTodos',async(todoId)=>{
    const response = await axios.get(`${API_URL}/${todoId}`)
    return response.data.subTodos;
})

export const deleteSubTodo = createAsyncThunk('delete/subTodo',async(subToDoId)=>{
 
    await axios.delete(`${API_URL}/${subToDoId}`)

   return subToDoId;
})

export const updateSubToDo = createAsyncThunk('update/subtodos',async({subToDoId,title})=>{
     await axios.patch(`${API_URL}/${subToDoId}`,
        {title}
    )

    return {subToDoId,title};
})

export const createSubTodos = createAsyncThunk('add/subtodo',async({todoId,...subToDos})=>{
    const response = await axios.post(`${API_URL}`,
        {todoId,subToDos}
    )
    return response.data.subToDos[0];
})

export const toggleSubTodo = createAsyncThunk('toggle/subtodo',async(subToDoId)=>{
   await axios.patch(`${API_URL}/${subToDoId}/toggle`)

   return subToDoId;
})