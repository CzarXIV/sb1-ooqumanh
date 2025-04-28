import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeaturedSection from '../components/home/FeaturedSection';
import BrandEthos from '../components/home/BrandEthos';
import LatestCollection from '../components/home/LatestCollection';
import AnimatedSection from '../components/ui/AnimatedSection';

const HomePage: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'S&M Collection | Luxury Fashion';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <FeaturedSection />
      <BrandEthos />
      <LatestCollection />
      
      <AnimatedSection className="py-20 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Experience S&M Collection</h2>
          <p className="max-w-2xl mx-auto mb-12 text-lg">
            Visit our showroom to experience the craftsmanship and design philosophy that defines S&M Collection.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors">
            Book an Appointment
          </a>
        </div>
      </AnimatedSection>
    </motion.div>
  );
};

export default HomePage;