import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import Button from './ui/Button';
import Wordmark from './ui/Wordmark';

const links = [
  { to: '/services', label: 'Services' },
  { to: '/appointments', label: 'Appointments' },
];

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      className={`relative py-2 text-[15px] transition-colors duration-200 ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-px left-0 right-0 h-px bg-ink"
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
      )}
    </Link>
  );
}

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-hairline">
      <nav aria-label="Main" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-[1.65rem]" aria-label="Barbershop VT, home">
          <Wordmark />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}

          <span aria-hidden="true" className="h-5 w-px bg-hairline" />

          {!user ? (
            <div className="flex items-center gap-2">
              <Button as={Link} to="/login" variant="ghost" size="sm">
                Log in
              </Button>
              <Button as={Link} to="/register" size="sm">
                Create account
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted">
                {user.name || user.email}
                {user.role === 'ADMIN' && <span className="ml-2 text-xs uppercase tracking-[0.08em] text-accent">Admin</span>}
              </span>
              <Button variant="ghost" size="sm" onClick={logout} aria-label="Log out">
                <FiLogOut aria-hidden="true" />
                <span>Log out</span>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden grid place-items-center size-11 -mr-2 text-2xl rounded-[4px] cursor-pointer"
        >
          {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-hairline bg-paper"
          >
            <div className="px-4 sm:px-6 py-4 flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={location.pathname === l.to ? 'page' : undefined}
                  className="font-display text-3xl py-3 border-b border-hairline aria-[current=page]:text-accent"
                >
                  {l.label}
                </Link>
              ))}
              {!user ? (
                <div className="grid grid-cols-2 gap-3 pt-5">
                  <Button as={Link} to="/login" variant="secondary">
                    Log in
                  </Button>
                  <Button as={Link} to="/register">
                    Create account
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-5">
                  <span className="text-sm text-muted">Signed in as {user.name || user.email}</span>
                  <Button variant="secondary" size="sm" onClick={logout}>
                    <FiLogOut aria-hidden="true" /> Log out
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
