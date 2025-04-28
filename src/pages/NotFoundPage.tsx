import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Page Not Found | S&M Collection';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center py-20 px-4"
    >
      <h1 className="font-serif text-5xl md:text-6xl mb-6">404</h1>
      <p className="text-xl mb-12 text-center max-w-md">
        The page you're looking for cannot be found.
      </p>
      <Link to="/" className="btn-primary py-3 px-8">
        Back to Homepage
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;