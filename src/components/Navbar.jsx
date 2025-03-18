import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfileName, updatePassword, fetchCurrentUser } from "./redux/UserSlice";
import toast from "react-hot-toast";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const modalRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // Fetch user data on mount or refresh
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isAuthenticated, user]);

  // Handle Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      navigate("/login");
    }
  };

  // Toggle profile modal
  const toggleModal = () => setIsOpen(!isOpen);

  // Handle Name Update
  const handleUpdateName = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    await dispatch(updateProfileName(name));
    await dispatch(fetchCurrentUser()); // Fetch latest user data
    toast.success("Name updated successfully!");
    setShowUpdateModal(false);
  };

  // Handle Password Update
  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    await dispatch(updatePassword(newPassword));
    toast.success("Password updated successfully!");
    setShowUpdateModal(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-green-500 text-white p-4 flex items-center justify-between shadow-lg relative">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <RiMoneyRupeeCircleFill className="h-8 w-8" />
        <span className="text-xl font-semibold">Expense Tracker</span>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        <Link to="/AddExpense" className="flex items-center gap-2 hover:underline">
          <MdLibraryAdd className="w-6 h-6" />
          <span>Add Entry</span>
        </Link>
        <Link to="/Records" className="flex items-center gap-2 hover:underline">
          <IoIosPaper className="w-6 h-6" />
          <span>Records</span>
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-black shadow-md p-4 flex flex-col gap-4 md:hidden">
          <Link to="/AddExpense" className="flex items-center gap-2 hover:underline cursor-pointer">
            <MdLibraryAdd className="w-6 h-6" />
            <span>Add Entry</span>
          </Link>
          <Link to="/Records" className="flex items-center gap-2">
            <IoIosPaper className="w-6 h-6" />
            <span>Records</span>
          </Link>
        </div>
      )}

      {/* Profile Section or Login Button */}
      <div className="relative flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <span className="hidden sm:block">
              {user ? user.name : "Loading..."}
            </span>
            <FaUserCircle
              className="h-10 w-10 cursor-pointer"
              onClick={toggleModal}
            />

            {/* Profile Dropdown */}
            {isOpen && (
              <div
                ref={modalRef}
                className="absolute right-0 top-full mt-2 w-48 bg-gray-200 shadow-md rounded-md p-3 z-50"
              >
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-blue-500"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Login
          </button>
        )}
      </div>

      {/* Update Profile Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Update Profile</h2>

            {/* Update Name */}
            <input
              type="text"
              placeholder="New Name"
              className="w-full p-2 border border-gray-700 rounded-md mb-3 bg-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={handleUpdateName}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-3"
            >
              Update Name
            </button>

            {/* Update Password */}
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border border-gray-700 rounded-md mb-3 bg-gray-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleUpdatePassword}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Update Password
            </button>

            {/* Close Button */}
            <button
              onClick={() => setShowUpdateModal(false)}
              className="w-full mt-3 text-red-500 hover:cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
