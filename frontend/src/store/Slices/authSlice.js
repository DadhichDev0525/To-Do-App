import { createSlice } from "@reduxjs/toolkit";
import { fetchUser,signupUser,loginUser } from "../Thunks/User";

const authSlice = createSlice({
    name : 'auth',
    initialState:{
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers :{
        logoutUser : (state)=>{
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("token");
        },
        clearAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers(builder){
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.loading = false;
                alert("User registered successfully, Login Now!")
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                 state.user = action.payload.user;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const {logoutUser, clearAuthError} = authSlice.actions;
export const authReducer = authSlice.reducer;