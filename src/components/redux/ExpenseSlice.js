import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ExpenseService from "./ExpenseService";
import toast from "react-hot-toast";

// Thunk: Add Expense
export const addExpense = createAsyncThunk(
    "expense/add",
    async (expenseDTO, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await ExpenseService.addExpense(expenseDTO, token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add expense");
        }
    }
);

// Thunk: Edit Expense
export const editExpense = createAsyncThunk(
    "expense/edit",
    async ({ expenseId, expenseDTO }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await ExpenseService.editExpense(expenseId, expenseDTO, token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to edit expense");
        }
    }
);

// Thunk: Delete Expense
export const deleteExpense = createAsyncThunk(
    "expense/delete",
    async (expenseId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            await ExpenseService.deleteExpense(expenseId, token);
            return expenseId;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete expense");
        }
    }
);

export const fetchExpenses = createAsyncThunk(
    "expense/fetch",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await ExpenseService.getExpenses(token);
        console.log("expense",data);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch expenses");
      }
    }
  );
  
  const expenseSlice = createSlice({
    name: "expense",
    initialState: { expenses: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchExpenses.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchExpenses.fulfilled, (state, action) => {
          state.loading = false;
          state.expenses = action.payload;
        })
        .addCase(fetchExpenses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(addExpense.fulfilled, (state, action) => {
          state.expenses.push(action.payload);
          toast.success("Expense added!");
        })
        .addCase(editExpense.fulfilled, (state, action) => {
          state.expenses = state.expenses.map(expense =>
            expense.id === action.payload.id ? action.payload : expense
          );
          toast.success("Expense updated!");
        })
        .addCase(deleteExpense.fulfilled, (state, action) => {
          state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
          toast.success("Expense deleted!");
        });
    },
  });
  
  export default expenseSlice.reducer;
  
