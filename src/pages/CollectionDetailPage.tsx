import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import ProductCard from '../components/ui/ProductCard';

const CollectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - would come from Firebase in production
  const collections = {
    'fw24': {
      title: 'Fall/Winter 2024',
      headline: 'Structure & Form',
      description: 'Inspired by architectural elements and geometric forms, our Fall/Winter 2024 collection brings a bold new perspective to contemporary silhouettes. Heavy wools contrast with fluid silks, creating a dynamic interplay of structure and movement.',
      coverImage: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
      galleryImages: [
        'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
        'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg',
        'https://images.pexels.com/photos/3779422/pexels-photo-3779422.jpeg',
        'https://images.pexels.com/photos/9775937/pexels-photo-9775937.jpeg'
      ],
      products: [
        { id: '101', name: 'Structured Wool Coat', image: 'https://images.pexels.com/photos/5325881/pexels-photo-5325881.jpeg', price: 1850 },
        { id: '102', name: 'Draped Silk Dress', image: 'https://images.pexels.com/photos/9775937/pexels-photo-9775937.jpeg', price: 1250 },
        { id: '103', name: 'Tailored Pinstripe Suit', image: 'https://images.pexels.com/photos/7626975/pexels-photo-7626975.jpeg', price: 2200 },
        { id: '104', name: 'Angular Cashmere Sweater', image: 'https://images.pexels.com/photos/7691211/pexels-photo-7691211.jpeg', price: 780 }
      ]
    },
    'ss24': {
      title: 'Spring/Summer 2024',
      headline: 'Ethereal Light',
      description: 'Our Spring/Summer 2024 collection captures the essence of light and transparency. Diaphanous fabrics create layers of luminosity, while precise cuts maintain the structural language that defines S&M Collection.',
      coverImage: 'https://images.pexels.com/photos/7691091/pexels-photo-7691091.jpeg',
      galleryImages: [
        'https://images.pexels.com/photos/7679753/pexels-photo-7679753.jpeg',
        'https://images.pexels.com/photos/7680030/pexels-photo-7680030.jpeg',
        'https://images.pexels.com/photos/15693116/pexels-photo-15693116.jpeg',
        'https://images.pexels.com/photos/5325893/pexels-photo-5325893.jpeg'
      ],
      products: [
        { id: '201', name: 'Lightweight Linen Blazer', image: 'https://images.pexels.com/photos/7679753/pexels-photo-7679753.jpeg', price: 1450 },
        { id: '202', name: 'Translucent Silk Shirt', image: 'https://images.pexels.com/photos/7691091/pexels-photo-7691091.jpeg', price: 680 },
        { id: '203', name: 'Wide-Leg Cotton Trousers', image: 'https://images.pexels.com/photos/5325893/pexels-photo-5325893.jpeg', price: 720 },
        { id: '204', name: 'Layered Chiffon Dress', image: 'https://images.pexels.com/photos/15693116/pexels-photo-15693116.jpeg', price: 1380 }
      ]
    },
    'fw23': {
      title: 'Fall/Winter 2023',
      headline: 'Urban Monoliths',
      description: 'Fall/Winter 2023 draws inspiration from brutalist architecture and industrial design. Bold, sculptural shapes redefine the silhouette, while a restrained palette of black, charcoal, and deep navy creates a powerful visual statement.',
      coverImage: 'https://images.pexels.com/photos/6045833/pexels-photo-6045833.jpeg',
      galleryImages: [
        'https://images.pexels.com/photos/6045024/pexels-photo-6045024.jpeg',
        'https://images.pexels.com/photos/5325882/pexels-photo-5325882.jpeg',
        'https://images.pexels.com/photos/7691105/pexels-photo-7691105.jpeg',
        'https://images.pexels.com/photos/7626977/pexels-photo-7626977.jpeg'
      ],
      products: [
        { id: '301', name: 'Oversized Wool Peacoat', image: 'https://images.pexels.com/photos/6045024/pexels-photo-6045024.jpeg', price: 1950 },
        { id: '302', name: 'Heavy Knit Turtleneck', image: 'https://images.pexels.com/photos/5325882/pexels-photo-5325882.jpeg', price: 580 },
        { id: '303', name: 'Structured Leather Skirt', image: 'https://images.pexels.com/photos/7691105/pexels-photo-7691105.jpeg', price: 890 },
        { id: '304', name: 'Monochrome Layered Suit', image: 'https://images.pexels.com/photos/7626977/pexels-photo-7626977.jpeg', price: 2350 }
      ]
    }
  };
  
  // Get the current collection based on the ID
  const collection = id ? collections[id as keyof typeof collections] : null;

  // Set page title
  useEffect(() => {
    if (collection) {
      document.title = `${collection.title} | S&M Collection`;
    } else {
      document.title = 'Collection | S&M Collection';
    }
  }, [collection]);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Collection not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
          <img 
            src={collection.coverImage} 
            alt={collection.title} 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-white text-center px-4">
          <AnimatedSection>
            <h1 className="font-serif text-5xl md:text-6xl mb-4">{collection.title}</h1>
            <p className="text-2xl font-serif">{collection.headline}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Collection Description */}
      <section className="py-20">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">The Collection</h2>
            <p className="text-lg leading-relaxed mb-12">
              {collection.description}
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {collection.galleryImages.map((image, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${collection.title} lookbook ${index + 1}`}
                    className="w-full h-[300px] md:h-[400px] object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Products */}
      <section className="py-20 bg-gray-100">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">Shop the Collection</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collection.products.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 0.1}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                />
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="text-center mt-12">
            <a href="/products" className="btn-outline">
              View All Products
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Behind The Scenes */}
      <section className="py-20">
        <div className="container-custom">
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Behind the Scenes</h2>
              <p className="mb-6">
                Explore the creative process behind {collection.title}. From initial sketches to runway presentation, discover how our atelier brings each conceptual collection to life.
              </p>
              <a href="/journal/behind-the-scenes" className="btn-outline">
                Read the Story
              </a>
            </div>
            <div className="overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/7697399/pexels-photo-7697399.jpeg" 
                alt="Behind the scenes" 
                className="w-full h-[500px] object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
};

export default CollectionDetailPage;