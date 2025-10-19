import { Heart, Leaf, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import productLifestyle from '@/assets/product-lifestyle.png';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-organic">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Where nature meets premium hair care – SuBu Organica was born from a passion 
            for natural beauty and healthy hair.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At SuBu Organica, we believe that nature holds the key to beautiful, healthy hair. 
                Our mission is to harness the power of organic herbs and essential oils to create 
                premium hair care products that nourish from root to tip.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We're committed to providing chemical-free, sustainable solutions that not only 
                transform your hair but also respect our planet. Every bottle is a testament to 
                our dedication to purity, quality, and natural beauty.
              </p>
              <Link to="/shop">
                <Button className="bg-gradient-hero hover:shadow-gold transition-organic">
                  Discover Our Products
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={productLifestyle}
                alt="SuBu Organica lifestyle"
                className="rounded-2xl shadow-organic w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-organic">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-card rounded-2xl shadow-organic">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">100% Natural</h3>
              <p className="text-muted-foreground text-sm">
                Only the finest organic ingredients, sourced sustainably from nature
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-2xl shadow-organic">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Chemical-Free</h3>
              <p className="text-muted-foreground text-sm">
                No harmful chemicals, sulfates, or parabens – just pure goodness
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-2xl shadow-organic">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">
                Meticulously crafted products that deliver exceptional results
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-2xl shadow-organic">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Made with Love</h3>
              <p className="text-muted-foreground text-sm">
                Every product is crafted with care and passion for healthy hair
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We envision a world where everyone has access to pure, natural hair care that honors 
            both personal wellness and environmental responsibility. Through SuBu Organica, we're 
            building a community of conscious consumers who choose nature's wisdom over synthetic alternatives.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join us on this journey towards healthier hair and a healthier planet – one bottle at a time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;