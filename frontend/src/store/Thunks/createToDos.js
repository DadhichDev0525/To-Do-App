import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constant";


const createsToDos = createAsyncThunk('create/ToDos',async ({inputs,token})=>{
    const {title,...subToDos} = inputs
    
    const response1 = await axios.post(`${API_URL}/todos`,
        {title},
        {headers:{ Authorization : `Bearer ${token}` }}
    )
    const todoId = response1.data._id;
    let response2
    if(subToDos){
            response2 = await axios.post(`${API_URL}/subtodos`,
            {todoId,subToDos},
            {headers:{ Authorization : `Bearer ${token}` }}
        )
    }
   
    return { todo:response1.data, subtodos:response2.data}
   
})

export {createsToDos}