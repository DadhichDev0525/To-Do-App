import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../Slices/authSlice";
import { API_URL } from "../../utils/constant";

let sessionAlertShown = false

export const signupUser = createAsyncThunk('auth/signup',async (userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${API_URL}/auth/signup`,userData)
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data.message || "Signup failed")
    }
})

export const loginUser = createAsyncThunk('auth/login',async( userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${API_URL}/auth/login`,userData)
        const{token} = response.data;

        localStorage.setItem("token",token)
        
        return token;
    }catch(error){
        return rejectWithValue(error.response.data.message || "Login failed")
    }
})

export const fetchUser = createAsyncThunk('fetch/user',async(_,{rejectWithValue,dispatch})=>{
    try{
        const token = localStorage.getItem('token')
        if(!token) throw new Error("No token found")

        const response = await axios.get(`${API_URL}/protected`,{
            headers : {Authorization : `Bearer ${token}`}
        })    
        
        return response.data
    }catch (error) {
        if(error.response?.status === 401){
           if (!sessionAlertShown) {
            sessionAlertShown = true;
          alert("Session Expired, Please login again!");
          dispatch(logoutUser())
          window.location.replace('/login')
        }

            return rejectWithValue("Unauthorized");
        }
        return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
})


