import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import ProductCard from '../components/ui/ProductCard';

const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Mock data - would come from Firebase in production
  const products = [
    { id: '101', name: 'Structured Wool Coat', category: 'outerwear', image: 'https://images.pexels.com/photos/5325881/pexels-photo-5325881.jpeg', price: 1850 },
    { id: '102', name: 'Draped Silk Dress', category: 'dresses', image: 'https://images.pexels.com/photos/9775937/pexels-photo-9775937.jpeg', price: 1250 },
    { id: '103', name: 'Tailored Pinstripe Suit', category: 'suits', image: 'https://images.pexels.com/photos/7626975/pexels-photo-7626975.jpeg', price: 2200 },
    { id: '104', name: 'Angular Cashmere Sweater', category: 'knitwear', image: 'https://images.pexels.com/photos/7691211/pexels-photo-7691211.jpeg', price: 780 },
    { id: '201', name: 'Lightweight Linen Blazer', category: 'outerwear', image: 'https://images.pexels.com/photos/7679753/pexels-photo-7679753.jpeg', price: 1450 },
    { id: '202', name: 'Translucent Silk Shirt', category: 'tops', image: 'https://images.pexels.com/photos/7691091/pexels-photo-7691091.jpeg', price: 680 },
    { id: '203', name: 'Wide-Leg Cotton Trousers', category: 'bottoms', image: 'https://images.pexels.com/photos/5325893/pexels-photo-5325893.jpeg', price: 720 },
    { id: '204', name: 'Layered Chiffon Dress', category: 'dresses', image: 'https://images.pexels.com/photos/15693116/pexels-photo-15693116.jpeg', price: 1380 }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'tops', name: 'Tops' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'knitwear', name: 'Knitwear' },
    { id: 'suits', name: 'Suits' }
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Set page title
  useEffect(() => {
    document.title = 'Products | S&M Collection';
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
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Products</h1>
            <p className="text-lg">
              Explore our curated selection of luxury pieces, designed with precision and crafted with exceptional materials.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-16">
        <div className="container-custom">
          {/* Category filters */}
          <AnimatedSection className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-6">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    activeCategory === category.id
                      ? 'bg-black text-white'
                      : 'bg-white text-black border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 0.05}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  category={product.category}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;