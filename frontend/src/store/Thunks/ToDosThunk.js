import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:4200/api/todos'


// for Development purpose only
const pause = (duration)=>{
    return new Promise (resolve=>{
        setTimeout(resolve,duration)
    })
}

export const fetchToDos = createAsyncThunk('fetch/ToDos',async (_,{rejectWithValue})=>{
  
    try{
        const token = localStorage.getItem('token') 
        const response = await axios.get(`${API_URL}`,
            {headers:{ Authorization : `Bearer ${token}` }}
         );
         await pause(500);
     return response.data 
    }catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch To-Dos");
    }
    
 
})

export const  deleteTodo = createAsyncThunk('Delete/Todo',async(todoId)=>{
    const token = localStorage.getItem('token') 
    await axios.delete(`${API_URL}/${todoId}`,
        {headers:{ Authorization : `Bearer ${token}` }}
    )

    

    return todoId;
})

export const updateToDo = createAsyncThunk('update/todo', async ({todoId,title})=>{
    const token = localStorage.getItem('token') 
      await axios.patch(`${API_URL}/${todoId}`,
        {title },
        {headers:{ Authorization : `Bearer ${token}` }}
    )

      return {todoId,title}
})