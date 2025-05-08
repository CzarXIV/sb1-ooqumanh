import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import CollectionCard from '../components/ui/CollectionCard';

const CollectionsPage: React.FC = () => {
  // Mock data - would come from Firebase in production
  const collections = [
    {
      id: 'fw24',
      title: 'Fall/Winter 2024',
      season: 'Fall/Winter',
      year: '2024',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg'
    },
    {
      id: 'ss24',
      title: 'Spring/Summer 2024',
      season: 'Spring/Summer',
      year: '2024',
      image: 'https://images.pexels.com/photos/7691091/pexels-photo-7691091.jpeg'
    },
    {
      id: 'fw23',
      title: 'Fall/Winter 2023',
      season: 'Fall/Winter',
      year: '2023',
      image: 'https://images.pexels.com/photos/6045833/pexels-photo-6045833.jpeg'
    }
  ];

  // Set page title
  useEffect(() => {
    document.title = 'Collections | S&M Collection';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pt-32 pb-16 bg-gray-100">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Collections</h1>
            <p className="text-lg">
              Explore the world of S&M Collection through our seasonal offerings. 
              Each collection tells a unique story through design, silhouettes, and creative direction.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-20">
        <div className="container-custom">
          {collections.map((collection, index) => (
            <CollectionCard 
              key={collection.id}
              id={collection.id}
              title={collection.title}
              season={collection.season}
              year={collection.year}
              image={collection.image}
              index={index}
            />
          ))}
        </div>
      </div>

      <AnimatedSection className="py-20 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Archive Collections</h2>
          <p className="max-w-2xl mx-auto mb-10">
            Discover our past collections and the creative journey of S&M Collection through the years.
          </p>
          <a href="/archive" className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors">
            View Archive
          </a>
        </div>
      </AnimatedSection>
    </motion.div>
  );
};

export default CollectionsPage;