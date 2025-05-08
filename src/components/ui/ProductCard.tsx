import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, price, category }) => {
  return (
    <motion.div 
      className="group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/${id}`} className="block">
        <div className="overflow-hidden mb-4">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-[400px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div>
          {category && (
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{category}</p>
          )}
          <h3 className="font-serif text-lg">{name}</h3>
          <p className="mt-1">${price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;