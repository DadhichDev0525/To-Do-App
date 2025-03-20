import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createsToDos = createAsyncThunk('create/ToDos',async ({userId,inputs})=>{
    const {title,...subTitles} = inputs
    const formattedSubToDos = Object.keys(subTitles).reduce((acc, key, index) => {
        acc[key] = { name: subTitles[key], completed: false };
        return acc;
      }, {});
    const response = await axios.post("http://localhost:5000/ToDos",{
        title: title,
        username: userId,
        subToDos : formattedSubToDos
    })
    return response.data
   
})

export {createsToDos}