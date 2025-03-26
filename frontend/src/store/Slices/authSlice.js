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
        logoutUser : (state,action)=>{
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers(builder){
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
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
                console.log(action.payload,action.error)
            });
    },
})

export const {logoutUser} = authSlice.actions;
export const authReducer = authSlice.reducer;