import React from 'react'
import { Link } from 'react-router-dom';
import { FiArrowUp, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaGitAlt, FaTrello, FaDatabase } from 'react-icons/fa';
import { RiTailwindCssFill } from 'react-icons/ri';
import { IoLogoJavascript } from 'react-icons/io5';
import { SiPostman, SiExpress, SiPrisma } from 'react-icons/si';
import Wordmark from './ui/Wordmark';

const stack = [
  { name: 'React', icon: FaReact },
  { name: 'JavaScript', icon: IoLogoJavascript },
  { name: 'Tailwind CSS', icon: RiTailwindCssFill },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Express', icon: SiExpress },
  { name: 'Prisma', icon: SiPrisma },
  { name: 'SQLite', icon: FaDatabase },
  { name: 'Postman', icon: SiPostman },
  { name: 'Git', icon: FaGitAlt },
  { name: 'Trello', icon: FaTrello },
];

const contacts = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vasilis-tsomakas-dev/', icon: FaLinkedin, external: true },
  { label: 'GitHub', href: 'https://github.com/VasilisTso', icon: FaGithub, external: true },
  { label: 'vtsomakas@gmail.com', href: 'mailto:vtsomakas@gmail.com', icon: FiMail },
];

const headingClass = 'text-xs font-medium uppercase tracking-[0.12em] text-brass mb-4';
const linkClass = 'text-paper/75 hover:text-paper transition-colors';

function Footer() {
  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="text-4xl" aria-label="Barbershop VT, home">
              <Wordmark className="[&_span]:text-brass" />
            </Link>
            <p className="mt-4 text-paper/70 leading-relaxed max-w-xs">
              A demo barbershop booking app. Pick a service, choose a slot, and the shop confirms it.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className={headingClass}>Shop</h2>
            <ul className="space-y-2.5">
              <li><Link to="/" className={linkClass}>Home</Link></li>
              <li><Link to="/services" className={linkClass}>Services</Link></li>
              <li><Link to="/appointments" className={linkClass}>Appointments</Link></li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>Built with</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {stack.map(({ name, icon }) => {
                const Icon = icon;
                return (
                  <li key={name} className="flex items-center gap-2 text-paper/75 text-sm">
                    <Icon aria-hidden="true" className="shrink-0 text-paper/50" />
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>Contact</h2>
            <ul className="space-y-2.5">
              {contacts.map(({ label, href, icon, external }) => {
                const Icon = icon;
                return (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className={`inline-flex items-center gap-2.5 ${linkClass}`}
                  >
                    <Icon aria-hidden="true" className="text-paper/50" />
                    {label}
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-paper/15 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-paper/60">
          <div>
            <p>&copy; {new Date().getFullYear()} Vasilis Tsomakas.</p>
            <p>University project · Barbershop management system.</p>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="self-start sm:self-auto inline-flex items-center gap-2 h-10 px-3 -mx-3 rounded-[4px] text-paper/75 hover:text-paper transition-colors cursor-pointer"
          >
            Back to top <FiArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
