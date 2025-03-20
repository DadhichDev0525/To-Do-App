import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const  deleteTodo = createAsyncThunk('Delete/Task',async(todoId)=>{
    await axios.delete(`http://localhost:5000/ToDos/${todoId}`)

    return todoId;
})

export {deleteTodo}