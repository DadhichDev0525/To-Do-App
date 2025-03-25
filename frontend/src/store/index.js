import { configureStore } from "@reduxjs/toolkit";
import { todoReducer, toggleExpand } from "./Slices/todoSlice";
import { subToDoReducer } from "./Slices/subToDoSlice";
import { authReducer, logoutUser } from "./Slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    subTodos: subToDoReducer,
  },
});

export { toggleExpand, logoutUser };

export * from "./Thunks/User";
export * from "./Thunks/ToDosThunk";
export * from "./Thunks/createToDos";
export * from "./Thunks/subToDosThunk";

