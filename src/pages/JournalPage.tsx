import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import { Link } from 'react-router-dom';
import { BlogPost, blogService } from '../firebase/services/blogService';
import { format } from 'date-fns';

const JournalPage: React.FC = () => {
  const [journalPosts, setJournalPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Journal | S&M Collection';
    loadJournalPosts();
  }, []);

  const loadJournalPosts = async () => {
    try {
      const data = await blogService.getPostsByDestination('journal');
      setJournalPosts(data);
    } catch (error) {
      console.error('Error loading journal posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading journal posts...</div>;
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
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Journal</h1>
            <p className="text-lg">
              Stories, insights, and inspiration from the world of S&M Collection.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {journalPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 0.1}>
                <Link to={`/journal/${post.id}`} className="block group">
                  <div className="overflow-hidden mb-6">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-[400px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                    </div>
                    <h2 className="font-serif text-2xl mb-3 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <span className="text-sm uppercase tracking-wider">Read More</span>
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
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Never Miss a Story</h2>
            <p className="text-lg mb-12">
              Subscribe to our newsletter for exclusive content and behind-the-scenes insights.
            </p>
            <Link 
              to="/contact" 
              className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              Subscribe Now
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
};

export default JournalPage;