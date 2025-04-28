import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import ProductCard from '../components/ui/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  
  // Mock data - would come from Firebase in production
  const allProducts = [
    { 
      id: '101', 
      name: 'Structured Wool Coat', 
      category: 'outerwear', 
      price: 1850,
      description: 'A statement piece defined by its architectural silhouette and impeccable tailoring. Crafted from premium Italian wool with a soft hand feel and subtle texture. Features a double-breasted closure, notched lapels, and side pockets.',
      details: ['100% Italian virgin wool', 'Acetate lining', 'Double-breasted closure', 'Made in Italy'],
      sizing: 'Model is 5\'10" and wears a size 2',
      images: [
        'https://images.pexels.com/photos/5325881/pexels-photo-5325881.jpeg',
        'https://images.pexels.com/photos/7691105/pexels-photo-7691105.jpeg'
      ]
    },
    { 
      id: '102', 
      name: 'Draped Silk Dress', 
      category: 'dresses', 
      price: 1250,
      description: 'An ethereal mid-length dress with asymmetrical draping that creates a fluid, sculptural silhouette. Made from lightweight silk crepe that moves gracefully with the body. Features a hidden side zipper and adjustable shoulder strap.',
      details: ['100% silk crepe', 'Asymmetrical draping', 'Hidden side zipper', 'Made in France'],
      sizing: 'Model is 5\'9" and wears a size 2',
      images: [
        'https://images.pexels.com/photos/9775937/pexels-photo-9775937.jpeg',
        'https://images.pexels.com/photos/15693116/pexels-photo-15693116.jpeg'
      ]
    },
    // Add more products as needed...
  ];
  
  // Find the current product
  const product = allProducts.find(p => p.id === id);

  // Related products (excluding current product)
  const relatedProducts = allProducts.filter(p => p.id !== id).slice(0, 4);

  // Set page title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | S&M Collection`;
    } else {
      document.title = 'Product | S&M Collection';
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 md:pt-32"
    >
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Product Images */}
          <div className="sticky top-32">
            <div className="mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-[600px] object-cover object-center"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-24 h-24 overflow-hidden ${selectedImage === index ? 'ring-2 ring-black' : ''}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <AnimatedSection>
            <div className="pb-8 mb-8 border-b border-gray-200">
              <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.name}</h1>
              <p className="text-xl">${product.price.toFixed(2)}</p>
            </div>
            
            <div className="mb-8">
              <p className="mb-6 text-lg leading-relaxed">{product.description}</p>
              
              <h3 className="font-serif text-lg mb-2">Details</h3>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              
              <p className="text-sm text-gray-600 mb-8">{product.sizing}</p>
              
              <button className="w-full md:w-auto btn-primary py-3 px-8 mb-4">
                Add to Bag
              </button>
            </div>
            
            <div className="pt-8 border-t border-gray-200">
              <h3 className="font-serif text-lg mb-4">Care & Shipping</h3>
              <p className="mb-4">Professional dry clean only. Store on padded hanger.</p>
              <p>Free shipping and returns on all orders. Delivery within 3-5 business days.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Related Products */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-serif text-2xl md:text-3xl text-center mb-12">You May Also Like</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 0.1}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.images[0]}
                  price={product.price}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProductDetailPage;