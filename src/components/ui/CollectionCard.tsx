import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface CollectionCardProps {
  id: string;
  title: string;
  season: string;
  year: string;
  image: string;
  index: number;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ id, title, season, year, image, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-24 ${isEven ? '' : 'md:flex-row-reverse'}`}
    >
      <div className={`${isEven ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}>
        <h3 className="font-serif text-3xl md:text-4xl mb-3">{title}</h3>
        <p className="text-lg text-gray-500 mb-4">{season} {year}</p>
        <p className="mb-6">A striking collection that defines contemporary elegance with bold silhouettes and meticulous attention to detail.</p>
        <Link 
          to={`/collections/${id}`}
          className="btn-outline"
        >
          Explore Collection
        </Link>
      </div>
      <div className={`overflow-hidden ${isEven ? '' : 'md:order-1'}`}>
        <Link to={`/collections/${id}`}>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-[600px] object-cover object-center hover:scale-105 transition-transform duration-700"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default CollectionCard;