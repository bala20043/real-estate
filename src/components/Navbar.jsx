import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Properties', path: '/properties' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <nav
        className={`fixed w-full z-[100] transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-primary/95 backdrop-blur-md shadow-sm border-b border-border'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <svg width="36" height="36" viewBox="0 0 80 80" fill="none">
              <path
                d="M40 8L12 30V68H30V48H50V68H68V30L40 8Z"
                stroke="var(--color-accent)"
                strokeWidth="2.5"
                fill="none"
                className="transition-all duration-300 group-hover:stroke-accent-light"
              />
              <path d="M35 48H45V68H35V48Z" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
            </svg>
            <span className="font-heading text-2xl text-accent tracking-wider">ELARA</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-body text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 py-2 group ${
                  location.pathname === link.path ? 'text-accent font-extrabold' : 'text-accent/70 hover:text-accent'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Theme Switcher Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 border border-accent/20 text-accent hover:border-accent transition-all duration-300 rounded-sm cursor-pointer flex items-center justify-center bg-transparent"
              aria-label="Toggle Theme Mode"
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 border-2 border-accent text-accent text-xs font-body font-bold tracking-[0.15em] uppercase hover:bg-accent hover:text-primary transition-all duration-300 shadow-sm"
            >
              <Phone size={12} />
              Book Visit
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-accent p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-primary/98 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className={`font-heading text-3xl tracking-wide transition-colors duration-300 ${
                      location.pathname === link.path ? 'text-accent font-semibold' : 'text-accent/70 hover:text-accent'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Mobile Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="px-6 py-2.5 border border-accent/30 text-accent font-body text-xs font-bold uppercase tracking-[0.15em] hover:bg-accent hover:text-primary transition-all duration-300 flex items-center gap-2 bg-transparent"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon size={14} /> Cinematic Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun size={14} /> Alabaster Light Mode
                    </>
                  )}
                </button>

                <Link
                  to="/contact"
                  className="px-8 py-3 border border-accent text-accent font-body text-sm tracking-wide hover:bg-accent hover:text-primary transition-all duration-300"
                >
                  Book a Visit
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
