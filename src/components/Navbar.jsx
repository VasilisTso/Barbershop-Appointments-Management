// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link,  } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiX } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { CiLogout, CiLogin } from "react-icons/ci";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const { user, logout, } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          💈 <span className='bg-gradient-to-r from-violet-800 to-white bg-clip-text text-transparent'>Barber VT</span>
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
          } md:flex justify-center items-center flex-col md:flex-row gap-4 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-4 md:p-0`}
        >
          <Link to="/services" className="hover:text-gray-300 pr-6 border-r border-gray-600">
            Services
          </Link>

          {user && (
            <>
              <Link to="/appointments" className="hover:text-gray-300 pr-6 border-r border-gray-600">
                Appointments
              </Link>

              {user.role === "ADMIN" && (
                <Link
                  to="/services/create"
                  className="flex justify-center items-center gap-2 bg-violet-800 text-white px-3 py-1 text-center rounded-md font-medium hover:bg-violet-900 transition"
                >
                  Add Service <IoAddCircle />
                </Link>
              )}
            </>
          )}
          
          {!user ? (
            <>
              <Link to="/login" className="flex justify-center items-center gap-1 hover:text-blue-500 pr-6 border-r border-gray-600">
                Login <CiLogin />
              </Link>
              <Link to="/register" className="flex justify-center items-center gap-1 hover:text-blue-500">
                Register <FaUser />
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 cursor-pointer px-3 py-1 text-center font-medium rounded-md transition"
            >
              Logout <CiLogout />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar