import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addExpense } from "./redux/ExpenseSlice";
import toast from "react-hot-toast";

function AddExpense() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    type: "debit",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !expense.name ||
      !expense.amount ||
      !expense.category ||
      !expense.date
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        addExpense({ ...expense, amount: Number(expense.amount) })
      ).unwrap();

      setExpense({
        name: "",
        amount: "",
        type: "debit",
        category: "",
        date: "",
        description: "",
      });

     
    } catch (error) {
      toast.error(error || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   
      <Navbar />
      <button
        onClick={() => navigate("/")}
        className="mt-2 px-6 py-2 bg-green-300 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300"
      >
        Home
      </button>

      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Add Expense</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={expense.name}
              autoComplete="off"
              className="w-full p-2 border rounded"
              placeholder="Money is spent or received from"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-2 border rounded"
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={expense.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="debit">Debit (Money Out)</option>
              <option value="credit">Credit (Money In)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={expense.category}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-2 border rounded"
              placeholder="E.g., Food, Salary, Shopping"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={expense.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              autoComplete="off"
              placeholder="Add a note"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-500 text-white py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddExpense;
