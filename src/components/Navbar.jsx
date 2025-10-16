// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold">BarberApp</Link>
        <div className="flex items-center gap-4">
          <Link to="/services">Services</Link>
          {user && <Link to="/appointments">Appointments</Link>}
          {isAdmin() && <Link to="/services/create">Create Service</Link>}
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={() => { logout(); nav('/'); }} className="bg-red-600 px-3 py-1 rounded">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar