import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../ui/AnimatedSection';

const LatestCollection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
            Latest Collection
          </h2>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatedSection delay={0.1}>
            <div className="relative h-[600px] overflow-hidden group">
              <img 
                src="https://images.pexels.com/photos/7697399/pexels-photo-7697399.jpeg" 
                alt="Fall/Winter Collection" 
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link 
                  to="/collections/fw24" 
                  className="btn-primary py-3 px-8"
                >
                  Explore FW24
                </Link>
              </div>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 gap-8">
            <AnimatedSection delay={0.2}>
              <div className="bg-gray-100 p-12 h-[280px] flex flex-col justify-center">
                <h3 className="font-serif text-3xl mb-4">Fall/Winter 2024</h3>
                <p className="mb-6">
                  A bold exploration of structure and silhouette, crafted for the modern wardrobe.
                </p>
                <Link to="/collections/fw24" className="link-hover text-sm uppercase tracking-wider self-start">
                  View Collection
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="relative h-[280px] overflow-hidden group">
                <img 
                  src="https://images.pexels.com/photos/5119579/pexels-photo-5119579.jpeg" 
                  alt="Behind the scenes" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link 
                    to="/journal/behind-the-scenes" 
                    className="btn-primary py-2 px-6"
                  >
                    Behind the Scenes
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;