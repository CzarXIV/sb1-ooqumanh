import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setErrorMessage('Please enter your email');
      return;
    }
    
    setStatus('submitting');
    
    // Mock form submission - would connect to Firebase in production
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="bg-gray-100 py-16 md:py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="font-serif text-3xl md:text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join the world of S&M
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Get first access to exclusive drops, private events, and editorial content.
          </motion.p>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black bg-white"
              disabled={status === 'submitting' || status === 'success'}
            />
            <button
              type="submit"
              className="btn-primary py-3 px-6 whitespace-nowrap"
              disabled={status === 'submitting' || status === 'success'}
            >
              {status === 'submitting' ? 'Subscribing...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
            </button>
          </motion.form>
          
          {status === 'error' && (
            <p className="mt-3 text-red-500 text-sm">{errorMessage}</p>
          )}
          
          {status === 'success' && (
            <p className="mt-3 text-green-600 text-sm">Thank you for subscribing!</p>
          )}
          
          <p className="mt-4 text-xs text-gray-500">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;