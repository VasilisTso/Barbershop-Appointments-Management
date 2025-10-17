// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link,  } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const { user, logout, } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          💈 Barber VT
        </Link>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-4 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-4 md:p-0`}
        >
          <Link to="/services" className="hover:text-gray-300">
            Services
          </Link>

          {user && (
            <>
              <Link to="/appointments" className="hover:text-gray-300">
                Appointments
              </Link>

              {user.role === "ADMIN" && (
                <Link
                  to="/services/create"
                  className="bg-blue-500 text-white px-3 py-1 text-center rounded-md font-medium hover:bg-blue-700 transition"
                >
                  Add Service
                </Link>
              )}
            </>
          )}
          
          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 cursor-pointer px-3 py-1 rounded-md transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar