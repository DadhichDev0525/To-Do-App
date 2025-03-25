import { createSlice } from "@reduxjs/toolkit";
import { fetchToDos, deleteTodo, updateToDo } from "../Thunks/ToDosThunk";


const todoSlice = createSlice({
  name: "todos",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
    expandedToDoId: null,
  },
  reducers: {
    toggleExpand: (state, action) => {
      state.expandedToDoId =
        state.expandedToDoId === action.payload ? null : action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchToDos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchToDos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchToDos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      const todoId = action.payload;
      state.data = state.data.filter((todo) => todo._id !== todoId);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(updateToDo.fulfilled, (state, action) => {
      const { todoId, title } = action.payload;
      const todo = state.data.find((todo) => todo._id === todoId);
      if (todo) {
        todo.title = title;
      }
    });
  },
});

export const todoReducer = todoSlice.reducer;
export const { toggleExpand } = todoSlice.actions;
