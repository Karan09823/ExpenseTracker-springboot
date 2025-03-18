import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetForm, updateField, validateForm } from "./redux/signupSlice";
import toast from "react-hot-toast";
import { registerUser } from "./redux/UserSlice";
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
// Extracting form fields & errors from Redux store
const { fullName, email, password, confirmPassword, errors } = useSelector(
  (state) => state.signup
);

const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch(validateForm());

  // Check if there are any validation errors
  if (Object.keys(errors).length === 0) {
    dispatch(registerUser({ fullName, email, password}))
      .unwrap()
      .then(() => {
        
        dispatch(resetForm());
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err || "Something went wrong");
      });
  }
};


  const handleChange = (e) => {
    dispatch(updateField({ name: e.target.name, value: e.target.value }));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 px-6 py-2 bg-green-400 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300 cursor-pointer"
        >
          Home
        </button>
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoComplete="off"
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoComplete="off"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoComplete="new-password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Signup Button (Disabled Until Form is Valid) */}
            <button
              type="submit"
              className={`w-full py-2 text-white rounded transition ${
                Object.keys(errors).length
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 cursor-pointer"
              }`}
            >
              Sign Up
            </button>
          </form>

          {/* Login Redirect Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <Link to="/login">
              <span className="text-blue-500 hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
