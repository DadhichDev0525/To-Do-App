import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Slices/authSlice";

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

        localStorage.setItem("token",token)
        
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
        const dispacth = useDispatch();
        if(error.response?.status === 401){
            alert('Session Expired, Please login again!')
            dispacth(logoutUser())
            window.location.href ='/login'
        }
        return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
})


