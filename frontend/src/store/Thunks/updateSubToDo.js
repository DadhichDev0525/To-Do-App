import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateSubToDo = createAsyncThunk('update/SubToDo', async ({todoId,subToDoKey,updatedSubToDo})=>{
    
    await axios.patch(`http://localhost:5000/ToDos/${todoId}`,{subToDos : updatedSubToDo})

    return {todoId,subToDoKey,updatedSubToDo}
})



export {updateSubToDo};