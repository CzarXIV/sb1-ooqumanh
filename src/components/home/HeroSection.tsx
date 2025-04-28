import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

const HeroSection: React.FC = () => {
  // Hero background video or high-res image
  const heroBackground = "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg";
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <img 
          src={heroBackground} 
          alt="S&M Collection Fashion" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
            Redefining Luxury
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            The new season of S&M Collection. Bold silhouettes with a timeless approach to design.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <a href="/collections" className="btn-primary py-3 px-8 text-lg">
              Explore Collection
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-10 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <ScrollLink
            to="featured-section"
            smooth={true}
            duration={800}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;