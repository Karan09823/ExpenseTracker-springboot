import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  errors: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    validateForm: (state) => {
      let errors = {};

      if (
        !state.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ) {
        errors.email = "Invalid email format";
      }

      if (state.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      state.errors = errors;
    },
    resetForm: (state) => {
      state.email = "";
      state.password = "";
      state.errors = {};
    },
  },
});

export default loginSlice.reducer;
export const { updateField, validateForm,resetForm } = loginSlice.actions;
