// src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [length, setLength] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      const api = "https://ecommerce-zv1v.onrender.com"

      const res = await axios.get(`${api}/cart/view`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLength(res.data.items?.length || 0);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    fetchCart();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  
  };

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0 text-2xl font-bold text-indigo-600">
            <Link to="/">Beep</Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-indigo-600">
              Home
            </Link>
            <Link to="/shop" className="text-white hover:text-indigo-600">
              Shop
            </Link>
            <Link to="/contact" className="text-white hover:text-indigo-600">
              Contact
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <span className="text-2xl">🛒</span>
              {length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {length}
                </span>
              )}
            </Link>

            {/* Auth Button */}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-indigo-600"
            >
              Shop
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-indigo-600"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="block relative"
            >
              🛒
              {length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {length}
                </span>
              )}
            </Link>

            {/* Auth Button Mobile */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
