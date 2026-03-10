import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
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
      <div className='min-h-screen flex flex-col bg-[#030014] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
        <BrowserRouter>

          <Navbar />

          <main className="flex-grow container mx-auto p-6 z-10">
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

              <Route path="/appointments" element={<Appointments />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-4">404</h1>
                  <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
                  <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                  <Link to="/" className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-3 rounded-xl transition-all">
                    Return Home
                  </Link>
                </div>
              } />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
