import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import MarqueeText from '../components/ui/MarqueeText';

const AboutPage: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'About | S&M Collection';
  }, []);

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
            src="https://images.pexels.com/photos/5325925/pexels-photo-5325925.jpeg" 
            alt="S&M Collection atelier" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-white text-center px-4">
          <AnimatedSection>
            <h1 className="font-serif text-5xl md:text-6xl mb-4">About Us</h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              The story of S&M Collection and our passion for exceptional design.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="font-serif text-3xl md:text-4xl mb-8">Our Philosophy</h2>
              <p className="mb-6 text-lg">
                Founded in 2015, S&M Collection was born from a singular vision: to create clothing that embodies both architectural precision and effortless elegance. Our approach to design is rooted in the belief that true luxury lies in the perfect balance of form and function.
              </p>
              <p className="text-lg">
                Each S&M Collection piece represents our commitment to exceptional craftsmanship, innovative design, and responsible production. We collaborate with the finest ateliers and artisans across Europe to bring our creative vision to life.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <img 
                src="https://images.pexels.com/photos/7691105/pexels-photo-7691105.jpeg" 
                alt="S&M Collection philosophy" 
                className="w-full h-[500px] object-cover object-center"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 bg-gray-100">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Design Process</h2>
            <p className="text-lg">
              Our creative journey is guided by a meticulous process that balances artistic vision with technical precision.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-white p-8 h-full">
                <span className="block font-serif text-4xl mb-4">01</span>
                <h3 className="font-serif text-xl mb-4">Concept Development</h3>
                <p>
                  Each collection begins with extensive research and conceptual exploration. Our design team draws inspiration from architecture, contemporary art, and cultural movements to establish a cohesive narrative.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="bg-white p-8 h-full">
                <span className="block font-serif text-4xl mb-4">02</span>
                <h3 className="font-serif text-xl mb-4">Material Selection</h3>
                <p>
                  We source the finest fabrics from renowned mills in Italy, France, and Japan. Each material is selected for its quality, texture, and environmental impact, ensuring our pieces are both luxurious and responsibly produced.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="bg-white p-8 h-full">
                <span className="block font-serif text-4xl mb-4">03</span>
                <h3 className="font-serif text-xl mb-4">Craftsmanship</h3>
                <p>
                  Our garments are meticulously constructed by skilled artisans who bring decades of experience to each piece. From pattern-making to final stitching, every step reflects our commitment to exceptional quality.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <MarqueeText 
        text="CRAFT • DESIGN • INNOVATION • QUALITY • SUSTAINABILITY" 
        className="py-6 text-2xl md:text-3xl tracking-wide font-serif bg-black text-white"
      />

      {/* The Team */}
      <section className="py-20">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">The Creative Director</h2>
            <p className="text-lg">
              The vision behind S&M Collection comes from Creative Director Sofia Mendez, whose background in architecture and fashion design informs the brand's distinctive aesthetic.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.1}>
              <img 
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" 
                alt="S&M Collection Creative Director" 
                className="w-full h-[600px] object-cover object-center"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <blockquote className="font-serif text-2xl md:text-3xl mb-8 leading-relaxed">
                "I believe in creating clothing that becomes an extension of the wearer – pieces that feel intuitive, that move with the body while creating a striking silhouette. True luxury should feel effortless."
              </blockquote>
              <p className="text-right font-serif text-lg">— Sofia Mendez, Creative Director</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Our Commitment</h2>
            <p className="text-lg mb-12">
              Sustainability is central to our ethos. We believe that luxury fashion must embrace responsibility – toward our environment, our communities, and future generations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="font-serif text-xl mb-4">Materials</h3>
                <p>
                  We prioritize natural, renewable, and innovative materials with minimal environmental impact. All suppliers adhere to strict ethical standards.
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-xl mb-4">Production</h3>
                <p>
                  Our limited production runs minimize waste while ensuring exceptional quality. We work exclusively with ateliers that provide fair wages and safe conditions.
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-xl mb-4">Longevity</h3>
                <p>
                  S&M Collection pieces are designed to transcend seasons and trends. We create garments meant to be treasured and worn for years, reducing the cycle of consumption.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-20">
        <div className="container-custom">
          <AnimatedSection className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Visit Our Showroom</h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto">
              Experience S&M Collection in person at our Milan showroom. Explore current and archive pieces, and meet with our styling consultants.
            </p>
            <a href="/contact" className="btn-primary py-3 px-8">
              Book an Appointment
            </a>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;