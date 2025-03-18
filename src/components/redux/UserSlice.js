import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:8080"; // Backend API URL

// ✅ Async thunk for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async ({  email,fullName, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, {
        fullName,
        email,
        password,
      
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// ✅ Async thunk for fetching current user profile
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(`${BASE_URL}/users/fetchUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched user response:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user in localStorage
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

export const updateProfileName = createAsyncThunk(
  "user/updateProfileName",
  async (profileName, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/users/update-name/${profileName}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (newPassword, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/users/update-password`,
        { newPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ User Slice
const UserSlice = createSlice({
  name: "user",
  initialState: {
    user:  null, // Load from localStorage
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      toast.success("Logged out ");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("🔍 Full API Response:", action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        toast.success("User Logged in");
        //console.log("Stored User in Redux:", state.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        toast.success("Registered Successfully");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
       
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        toast.success("user fetched");
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        toast.error("failed to fetch user");
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileName.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, name: action.payload.name };
        toast.success("Profile Name Updated");
      })
      .addCase(updateProfileName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Something went wrong");
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        toast.success("Password Updated ")
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Something went wrong");
      });
  },
});

// ✅ Export actions and reducer
export default UserSlice.reducer;
export const { logout } = UserSlice.actions;
