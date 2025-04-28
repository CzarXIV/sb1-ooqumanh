import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import { BlogPost, blogService } from '../firebase/services/blogService';
import { format } from 'date-fns';

const JournalPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        const data = await blogService.getPost(id);
        setPost(data);
        if (data) {
          document.title = `${data.title} | S&M Collection Journal`;
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load the post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl mb-4">{error || 'Post not found'}</p>
        <Link to="/journal" className="btn-primary py-2 px-4">
          Back to Journal
        </Link>
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
      <section className="relative h-[70vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-white text-center px-4">
          <AnimatedSection>
            <div className="flex items-center gap-4 text-sm mb-6">
              <span>{post.category}</span>
              <span>•</span>
              <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl max-w-4xl mb-6">
              {post.title}
            </h1>
            <p className="text-lg">By {post.author}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">{paragraph}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-20 bg-gray-100">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl mb-8">Share this Story</h2>
            <div className="flex justify-center gap-6">
              <a href="#" className="hover:opacity-70 transition-opacity">Twitter</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Facebook</a>
              <a href="#" className="hover:opacity-70 transition-opacity">LinkedIn</a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* More Stories */}
      <section className="py-20">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-serif text-3xl mb-8">More Stories</h2>
            <Link 
              to="/journal" 
              className="btn-outline"
            >
              View All Posts
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
};

export default JournalPostPage;