import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateToDo = createAsyncThunk('update/todo', async ({todoId,title,subToDos})=>{
      await axios.patch(`http://localhost:5000/ToDos/${todoId}`,{title , subToDos})

      return {todoId,title,subToDos}
})

export {updateToDo}