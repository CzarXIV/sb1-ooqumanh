import React from 'react';
import MarqueeText from '../ui/MarqueeText';
import AnimatedSection from '../ui/AnimatedSection';

const BrandEthos: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container-custom">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              Brand Ethos
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              S&M Collection is committed to designing innovative, trendy, and
              timeless fashion pieces that embody the essence of the brand. By
              balancing the latest trends with unique, creative ideas, we create
              standout pieces that are sustainable and durable.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <AnimatedSection delay={0.1}>
            <img
              src="https://images.pexels.com/photos/7679863/pexels-photo-7679863.jpeg"
              alt="S&M Collection atelier"
              className="w-full h-[500px] object-cover object-center"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div>
              <h3 className="font-serif text-2xl mb-4">Crafted with Purpose</h3>
              <p className="mb-6">
                Each garment is a statement of intention and purpose. We focus
                on creating pieces that empower the wearer through thoughtful
                design and impeccable construction.
              </p>

              <h3 className="font-serif text-2xl mb-4 mt-10">
                Sustainable Approach
              </h3>
              <p>
                Our commitment to quality is matched by our respect for
                resources. We source materials ethically and emphasize longevity
                in every piece we create.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="mt-20">
        <MarqueeText
          text="INNOVATION • QUALITY • DESIGN • ELEGANCE • CRAFTSMANSHIP"
          className="py-4 text-2xl md:text-3xl tracking-wide font-serif bg-black text-white"
        />
      </div>
    </section>
  );
};

export default BrandEthos;
