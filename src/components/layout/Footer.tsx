import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-2xl mb-6">S&M Collection</h3>
            <p className="text-gray-300 mb-6 text-sm">
              Luxury fashion redefined. Bold silhouettes with a timeless approach to design.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/by_smartmira?igsh=ZTFpMjY5c255a29q&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-accent-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/by_smartmira?s=21" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-accent-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="uppercase text-sm tracking-wider mb-6">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/collections" className="text-gray-300 hover:text-white transition-colors text-sm">Collections</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors text-sm">New Arrivals</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors text-sm">Best Sellers</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors text-sm">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase text-sm tracking-wider mb-6">Information</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/journal" className="text-gray-300 hover:text-white transition-colors text-sm">Journal</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-white transition-colors text-sm">Press</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase text-sm tracking-wider mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors text-sm">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} S&M Collection. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed and crafted with passion</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;