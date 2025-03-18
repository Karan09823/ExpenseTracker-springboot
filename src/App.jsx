import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddExpense from "./components/AddExpense";
import Records from "./components/Records";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { fetchCurrentUser } from "./components/redux/UserSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  



  // Fetch user data when the app loads if a token exists
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  // PrivateRoute component to protect authenticated routes
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div>
     
      <BrowserRouter>
      
        <Routes>
          <Route
            path="/AddExpense"
            element={
              <PrivateRoute>
              
                <AddExpense />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/Records"
            element={
              <PrivateRoute>
                <Records />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
