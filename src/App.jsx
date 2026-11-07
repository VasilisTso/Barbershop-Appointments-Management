import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceForm from './pages/ServiceForm';
import Appointments from './pages/Appointments';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Button from './components/ui/Button';
import { AuthContext } from './context/AuthContext';

function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'ADMIN') return <Navigate to="/" replace />;
  return children;
}

function NotFound() {
  return (
    <section className="py-24 md:py-32 max-w-2xl">
      <p className="font-display text-[9rem] md:text-[12rem] leading-none text-accent tracking-[-0.03em]" aria-hidden="true">
        404
      </p>
      <h1 className="font-display text-4xl md:text-5xl mt-2">This chair is empty.</h1>
      <p className="text-muted text-lg mt-4 mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button as={Link} to="/">Back to the shop</Button>
    </section>
  );
}

// Route-level fade. Keyed by pathname so query-string changes don't re-animate.
function AnimatedRoutes() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0, y: -4 }}
        transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        onAnimationStart={() => window.scrollTo({ top: 0 })}
      >
        <Routes location={location}>
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <BrowserRouter>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded-[4px]"
        >
          Skip to content
        </a>
        <Navbar />

        <main id="main" className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
          <AnimatedRoutes />
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
