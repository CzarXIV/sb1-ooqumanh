import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Link } from 'react-router-dom';

const FeaturedSection: React.FC = () => {
  // Sample featured products
  const featuredItems = [
    {
      id: '1',
      name: 'Silhouette Blazer',
      image: 'https://images.pexels.com/photos/5325881/pexels-photo-5325881.jpeg',
    },
    {
      id: '2',
      name: 'Structured Coat',
      image: 'https://images.pexels.com/photos/5119561/pexels-photo-5119561.jpeg',
    },
    {
      id: '3',
      name: 'Essential Dress',
      image: 'https://images.pexels.com/photos/9775937/pexels-photo-9775937.jpeg',
    },
  ];

  return (
    <section id="featured-section" className="py-20 md:py-28">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">
            Featured Pieces
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredItems.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.2}>
              <Link to={`/products/${item.id}`} className="block group">
                <div className="overflow-hidden mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-[500px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl text-center">{item.name}</h3>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center">
          <Link to="/products" className="btn-outline">
            View All Pieces
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedSection;