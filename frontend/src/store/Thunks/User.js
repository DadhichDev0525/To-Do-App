import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4200/api/"

export const signupUser = createAsyncThunk('auth/signup',async (userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${API_URL}auth/signup`,userData)
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data.message || "Signup failed")
    }
})

export const loginUser = createAsyncThunk('auth/login',async( userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${API_URL}auth/login`,userData)
        const{token} = response.data;
        
        return token;
    }catch(error){
        return rejectWithValue(error.response.data.message || "Login failed")
    }
})

export const fetchUser = createAsyncThunk('fetch/user',async(_,{rejectWithValue})=>{
    try{
        const token = localStorage.getItem('token')
        if(!token) throw new Error("No token found")

        const response = await axios.get(`${API_URL}protected`,{
            headers : {Authorization : `Bearer ${token}`}
        })    
        
        return response.data
    }catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
})


