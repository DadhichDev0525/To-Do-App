import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchToDos = createAsyncThunk('fetch/ToDos',async (userId)=>{
 const response = await axios.get(`http://localhost:5000/ToDos?username=${encodeURIComponent(userId.userId)}`);

 await pause(500);

 return response.data 
})
// for Development purpose only
const pause = (duration)=>{
    return new Promise (resolve=>{
        setTimeout(resolve,duration)
    })
}

export {fetchToDos}