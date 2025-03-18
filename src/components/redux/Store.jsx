import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice";
import userReducer from "./UserSlice";
import loginReducer from "./loginSlice";
import expenseReducer from "./ExpenseSlice";
const Store = configureStore({
  reducer: {
    user:userReducer,
    signup: signupReducer,
    login: loginReducer,
    expense: expenseReducer,
  },
});

export default Store;
