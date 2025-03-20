import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUser = createAsyncThunk('fetch/user', async()=>{
    const response = await axios.get('http://localhost:5000/user')

    return response.data || [];
})

const deleteUser = createAsyncThunk('delete/user',async(userId)=>{
    await axios.delete(`http://localhost:5000/user/${userId}`)
    return userId;
})

const createUser = createAsyncThunk('create/user',async(userName)=>{
   const response = await axios.post(`http://localhost:5000/user`,{name:userName})
   return response.data;
})

export {fetchUser,deleteUser,createUser};