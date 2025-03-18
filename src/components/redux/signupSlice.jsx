import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: {},
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    validateForm: (state) => {
      let errors = {};

      if (!state.fullName.trim()) {
        errors.fullName = "Full name is required";
      }

      if (!state.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        errors.email = "Invalid email format";
      }

      if (state.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      if (state.password !== state.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      state.errors = errors;
    },
    resetForm: () => initialState,
  },
});

export default signupSlice.reducer;
export const { updateField, validateForm, resetForm } = signupSlice.actions;
