import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteSubTodo = createAsyncThunk('delete/subTodo',async({todoId,subToDoKey},{getState})=>{

    const todo = getState().todos.data.find(todo=>todo.id===todoId)

    if(!todo || !todo.subToDos){
        throw new Error("Todo or SubToDo not found");
    }
    const updatedSubTodos = {...todo.subToDos}

    delete updatedSubTodos[subToDoKey]

    await axios.patch(`http://localhost:5000/ToDos/${todoId}`,{
        subToDos : updatedSubTodos
    })

   return {todoId, subToDoKey}
})

export { deleteSubTodo };