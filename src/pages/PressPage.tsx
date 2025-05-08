import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/ui/AnimatedSection';
import { BlogPost, blogService } from '../firebase/services/blogService';
import { format } from 'date-fns';

const PressPage: React.FC = () => {
  const [pressItems, setPressItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Press | S&M Collection';
    loadPressItems();
  }, []);

  const loadPressItems = async () => {
    try {
      const data = await blogService.getPostsByDestination('press');
      setPressItems(data);
    } catch (error) {
      console.error('Error loading press items:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading press items...</div>;
  }

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
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Press</h1>
            <p className="text-lg">
              Discover what the fashion world is saying about S&M Collection.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {pressItems.map((item, index) => (
              <AnimatedSection key={item.id} delay={index * 0.1}>
                <Link 
                  to={`/press/${item.id}`} 
                  className="block group"
                >
                  <div className="overflow-hidden mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-[400px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.category} • {format(new Date(item.date), 'MMM d, yyyy')}
                    </p>
                    <h2 className="font-serif text-2xl mb-4 group-hover:text-gray-600 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <span className="text-sm uppercase tracking-wider">Read Article</span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Press Inquiries</h2>
            <p className="text-lg mb-12">
              For press inquiries and media kit requests, please contact our press office.
            </p>
            <Link 
              to="/contact" 
              className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              Contact Press Office
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
};

export default PressPage;