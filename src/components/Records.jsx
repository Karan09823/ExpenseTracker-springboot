import React from "react";
import Navbar from "./Navbar";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, deleteExpense } from "./redux/ExpenseSlice";
import toast from "react-hot-toast";

function Records() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state) => state.expense);


  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

 

  return (
    <>
      <Navbar />
      <button
        onClick={() => navigate("/")}
        className="mt-2 px-6 py-2 bg-green-400 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300"
      >
        Home
      </button>
      <div className="max-w-full mx-auto  p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Transaction Records
        </h2>

        <div className="overflow-x-auto">
          <table className=" min-w-[600px] w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border ">Date</th>
                <th className="p-2 border ">Description</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
  <tr>
    <td colSpan="7" className="text-center p-4">Loading...</td>
  </tr>
) : expenses && expenses.length > 0 ? (
  expenses.map((expense) => (
    <tr key={expense.id} className="text-center border-b">
      <td className="p-2 border">{expense.name}</td>
      <td className="p-2 border">₹{expense.amount}</td>
      <td className="p-2 border font-semibold">{expense.type}</td>
      <td className="p-2 border">{expense.category}</td>
      <td className="p-2 border">{expense.entryTime}</td>
      <td className="p-2 border">{expense.description}</td>
      <td className="p-2 border flex flex-col sm:flex-row justify-center gap-2">
        <button
          onClick={() => dispatch(deleteExpense(expense.id))}
          className="px-10 py-2 flex items-center gap-3 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs sm:text-sm"
        >
          <FaTrashAlt /> Delete
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="7" className="text-center p-4 text-gray-500">
      Expense list is empty
    </td>
  </tr>
)}

</tbody>

          </table>
        </div>
      </div>
    </>
  );
}

export default Records;
