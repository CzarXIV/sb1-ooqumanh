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
              The story of S&M Collection and our passion for all-inclusive
              design.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="font-serif text-3xl md:text-4xl mb-8">
                Our Philosophy
              </h2>
              <p className="mb-6 text-lg">
                Founded in 2020, S&M Collection was born from a singular vision:
                to create clothing that empowers every individual to feel
                confident, seen, and celebrated. We believe true luxury lies in
                inclusive design – where elegance, comfort, and self-expression
                coexist.
              </p>
              <p className="text-lg">
                Our design philosophy blends architectural precision with
                fluidity, ensuring each piece moves with the body and honors its
                unique form. Every S&M Collection garment reflects our
                commitment to inclusive representation, exceptional
                craftsmanship, and thoughtful creation. We collaborate with
                skilled ateliers and artisans across Europe who share our
                dedication to detail and respect for the wearer’s individuality.
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
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Design Process
            </h2>
            <p className="text-lg">
              Our creative journey is guided by a meticulous process that
              balances artistic vision with technical precision.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-white p-8 h-full">
                <span className="block font-serif text-4xl mb-4">01</span>
                <h3 className="font-serif text-xl mb-4">Concept Development</h3>
                <p>
                  Each collection begins with extensive research and conceptual
                  exploration. Our design team draws inspiration from
                  architecture, contemporary art, and cultural movements to
                  establish a cohesive narrative.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white p-8 h-full">
                <span className="block font-serif text-4xl mb-4">02</span>
                <h3 className="font-serif text-xl mb-4">Material Selection</h3>
                <p>
                  Each material is selected for its quality, texture, and
                  environmental impact, ensuring our pieces are both luxurious
                  and responsibly produced.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white p-8 h-full">
                <span className="block font-serif text-4xl mb-4">03</span>
                <h3 className="font-serif text-xl mb-4">Craftsmanship</h3>
                <p>
                  Our garments are meticulously constructed by skilled artisans
                  who bring decades of experience to each piece. From
                  pattern-making to final stitching, every step reflects our
                  commitment to exceptional quality.
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
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              The Creative Director
            </h2>
            <p className="text-lg">
              The vision behind S&M Collection comes from Creative Director
              Smart Mira, whose background in fashion design informs the brand's
              distinctive aesthetic.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.1}>
              <img
                src="https://res.cloudinary.com/dgol3fmky/image/upload/v1746711116/891eff32-4260-4c9f-8763-01796fa90803_vvkkew.jpg"
                alt="S&M Collection Creative Director"
                className="w-full h-[600px] object-cover object-center"
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <blockquote className="font-serif text-2xl md:text-3xl mb-8 leading-relaxed">
                "I believe in creating clothing that becomes an extension of the
                wearer – pieces that feel intuitive and move with every body,
                celebrating individuality while creating a striking silhouette.
                True luxury should feel effortless and inclusive, empowering
                confidence in all who wear it."
              </blockquote>
              <p className="text-right font-serif text-lg">
                — Smart Mira, Creative Director
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Our Commitment
            </h2>
            <p className="text-lg mb-12">
              Inclusivity is central to our ethos. We believe that true luxury
              fashion must embrace and celebrate every individual – across size,
              complexion, gender identity, and ability – fostering confidence,
              representation, and belonging through every piece we create.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="font-serif text-xl mb-4">Fit & Feel</h3>
                <p>
                  We design for real bodies in all their forms, using thoughtful
                  silhouettes and adaptive features that honor diversity and
                  promote comfort without compromising style.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl mb-4">
                  Design & Collaboration
                </h3>
                <p>
                  Every collection is shaped by diverse voices – from our team
                  to our muses – ensuring that inclusivity is woven into the
                  creative process. We partner with experts and advocates to
                  create clothing that reflects real experiences.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl mb-4">
                  Empowerment & Representation
                </h3>
                <p>
                  S&M Collection pieces are made to empower. We tell stories
                  through fashion that center inclusivity, ensuring everyone can
                  see themselves in our campaigns, our sizing, and our brand.
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
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Visit Our Showroom
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto">
              Experience S&M Collection in person at our Abuja showroom. Explore
              current and archive pieces, and meet with our styling consultants.
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
