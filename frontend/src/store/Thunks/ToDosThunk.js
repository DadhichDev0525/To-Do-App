import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constant";


export const fetchToDos = createAsyncThunk('fetch/ToDos',async (_,{rejectWithValue})=>{
  
    try{
        const token = localStorage.getItem('token') 
        const response = await axios.get(`${API_URL}/todos`,
            {headers:{ Authorization : `Bearer ${token}` }}
         );
     return response.data 
    }catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch To-Dos");
    }
    
 
})

export const  deleteTodo = createAsyncThunk('Delete/Todo',async(todoId)=>{
    const token = localStorage.getItem('token') 
    await axios.delete(`${API_URL}/todos/${todoId}`,
        {headers:{ Authorization : `Bearer ${token}` }}
    )

    

    return todoId;
})

export const updateToDo = createAsyncThunk('update/todo', async ({todoId,title})=>{
    const token = localStorage.getItem('token') 
      await axios.patch(`${API_URL}/todos/${todoId}`,
        {title },
        {headers:{ Authorization : `Bearer ${token}` }}
    )

      return {todoId,title}
})