import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceForm from './pages/ServiceForm';
import Appointments from './pages/Appointments';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';



function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'ADMIN') return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container mx-auto p-4 bg-gradient-to-br from-gray-">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/create" element={
              <PrivateRoute adminOnly>
                <ServiceForm />
              </PrivateRoute>
            } />
            <Route path="/services/edit/:id" element={
              <PrivateRoute adminOnly>
                <ServiceForm />
              </PrivateRoute>
            } />
            <Route path="/appointments" element={
              <PrivateRoute>
                <Appointments />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
