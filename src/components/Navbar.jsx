// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiX } from "react-icons/fi";
import { CiLogout, CiLogin } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

function Navbar() {
  const { user, logout, } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // active state

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Helper for link styling
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
        <Link to={to} className={`relative px-4 py-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            {children}
            {isActive && (
                <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-full" />
            )}
        </Link>
    );
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-50 mx-4 md:mx-auto max-w-6xl rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20"
    >
      <div className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-extrabold tracking-tighter flex items-center gap-2">
          <span className="text-3xl">💈</span> 
          <span className='bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent'>Barber VT</span>
        </Link>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/services">Services</NavLink>
          {user && <NavLink to="/appointments">Appointments</NavLink>}
          
          <div className="h-6 w-px bg-white/10 mx-2"></div> {/* Separator */}

          {!user ? (
            <div className="flex gap-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition flex items-center gap-2">Login</Link>
              <Link to="/register" className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full font-medium transition shadow-lg shadow-violet-500/20 flex items-center gap-2">
                Register <FaUser className="text-xs"/>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Hi, {user.name}</span>
                <button onClick={logout} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-full transition flex items-center gap-2 border border-red-500/10 cursor-pointer">
                    <CiLogout />
                </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (Simplified animation) */}
      {menuOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden border-t border-white/10 bg-black/90 rounded-b-2xl overflow-hidden">
            <div className="flex flex-col p-6 gap-4">
                <Link to="/services" className="text-gray-300 py-2">Services</Link>
                {user && <Link to="/appointments" className="text-gray-300 py-2">Appointments</Link>}
                {!user ? (
                    <>
                        <Link to="/login" className="text-gray-300 py-2">Login</Link>
                        <Link to="/register" className="bg-violet-600 text-white py-3 rounded-lg text-center">Register</Link>
                    </>
                ) : (
                    <button onClick={logout} className="text-red-400 text-left py-2">Logout</button>
                )}
            </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar