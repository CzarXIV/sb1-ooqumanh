import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  
  // Determine if we should use transparent header (only on homepage when not scrolled)
  const useTransparentHeader = isHomePage && !scrolled && !mobileMenuOpen;

  const navItems = [
    { name: 'Collections', path: '/collections' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Press', path: '/press' },
    { name: 'Journal', path: '/journal' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        useTransparentHeader 
          ? 'bg-transparent text-white' 
          : 'bg-white text-black shadow-sm'
      }`}
    >
      <div className="container-custom py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-serif text-xl md:text-2xl font-semibold tracking-wider"
          >
            S&M Collection
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm uppercase tracking-widest hover:opacity-70 transition-opacity ${
                  location.pathname === item.path ? 'font-medium' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/cart" 
              className="hover:opacity-70 transition-opacity"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={20} />
            </Link>
            <Link 
              to="/admin/login" 
              className="hover:opacity-70 transition-opacity"
              aria-label="Admin"
            >
              <Settings size={20} />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link 
              to="/cart" 
              className="mr-4 hover:opacity-70 transition-opacity"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={20} />
            </Link>
            <Link 
              to="/admin/login" 
              className="mr-4 hover:opacity-70 transition-opacity"
              aria-label="Admin"
            >
              <Settings size={20} />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="p-1 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white text-black"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm uppercase tracking-widest py-2 ${
                      location.pathname === item.path ? 'font-medium' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;