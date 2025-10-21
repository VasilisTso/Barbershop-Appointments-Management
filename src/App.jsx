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
import Footer from './components/Footer';
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
      <div className='min-h-screen flex flex-col bg-gradient-to-br from-[#0f0224] via-gray-700 to-gray-900'>
        <BrowserRouter>

          <Navbar />

          <main className="flex-grow container mx-auto p-4">
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
          </main>

          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
