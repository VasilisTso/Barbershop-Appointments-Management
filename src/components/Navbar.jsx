// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout, } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          💈 Barber VT
        </Link>

        <div className="flex items-center gap-4 text-lg">
          <Link to="/services" className="text-gray-100 hover:text-gray-300">
            Services
          </Link>
          {user && (
            <>
              <Link to="/appointments" className="text-gray-100 hover:text-gray-300">
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
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
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