import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:4200/api/todos'
const token = localStorage.getItem('token') || null

// for Development purpose only
const pause = (duration)=>{
    return new Promise (resolve=>{
        setTimeout(resolve,duration)
    })
}

export const fetchToDos = createAsyncThunk('fetch/ToDos',async ()=>{

    const response = await axios.get(`${API_URL}`,
        {headers:{ Authorization : `Bearer ${token}` }}
     );
     await pause(500);
 return response.data 
 
})

export const  deleteTodo = createAsyncThunk('Delete/Todo',async(todoId)=>{
    await axios.delete(`${API_URL}/${todoId}`,
        {headers:{ Authorization : `Bearer ${token}` }}
    )

    return todoId;
})

export const updateToDo = createAsyncThunk('update/todo', async ({todoId,title})=>{
      await axios.patch(`${API_URL}/${todoId}`,
        {title },
        {headers:{ Authorization : `Bearer ${token}` }}
    )

      return {todoId,title}
})