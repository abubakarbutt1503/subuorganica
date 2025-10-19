import { ArrowRight, Leaf, Shield, Heart, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-hair-oil.png';
import beforeAfterImage from '@/assets/before-after.png';

const Home = () => {
  const benefits = [
    {
      icon: <Leaf className="h-6 w-6 text-secondary" />,
      title: "100% Organic",
      description: "Made with certified organic ingredients, free from harmful chemicals"
    },
    {
      icon: <Shield className="h-6 w-6 text-secondary" />,
      title: "Clinically Tested",
      description: "Dermatologically tested and proven safe for all hair types"
    },
    {
      icon: <Heart className="h-6 w-6 text-secondary" />,
      title: "Cruelty Free",
      description: "Never tested on animals, ethically sourced and produced"
    }
  ];

  const testimonials = [
    {
      name: "Sumaiya Butt",
      rating: 5,
      comment: "My hair has never felt this healthy! The oil is lightweight yet deeply nourishing.",
      location: "Iqbal Town, Lahore."
    },
    {
      name: "Abdullah",
      rating: 5,
      comment: "Finally found a natural solution that actually works. My hair fall has reduced significantly!",
      location: "Wapda Town, Lahore."
    },
    {
      name: "Haleema",
      rating: 5,
      comment: "Love the natural fragrance and how soft my hair feels after each use.",
      location: "Islamabad"
    }
  ];

  const ingredients = [
    "Organic Coconut Oil",
    "Almond Oil", 
    "Caster Oil",
    "Rosemary Extract",
    "Alma Reetha Oil",
    "Olive Oil",
    "Onion Oil",
    "Daniyee Oil",
    "Shikakai"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-organic min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                  Nourish Your Hair,
                  <span className="text-secondary block">Naturally</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform your hair with our premium organic hair oil. 
                  Crafted with nature's finest ingredients for healthier, stronger, more beautiful hair.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button className="bg-gradient-hero hover:shadow-gold transition-organic text-lg px-8 py-6">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/product/1">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6">
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span>Tested Formula</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span>100% Organic</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 transform hover:scale-105 transition-organic">
                <img
                  src={heroImage}
                  alt="SuBu Organica Hair Oil"
                  className="w-full h-auto rounded-2xl shadow-organic"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-gold opacity-20 rounded-2xl blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose SuBu Organica?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our commitment to quality and nature sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-sage/30 hover:shadow-organic transition-organic">
                <CardContent className="p-8">
                  <div className="inline-flex p-3 bg-gradient-organic rounded-full mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 bg-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={beforeAfterImage}
                alt="Before and After Results"
                className="w-full rounded-2xl shadow-organic"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                See the Transformation
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Experience visible results in just 4 weeks of regular use. 
                Our customers see stronger, shinier, and healthier hair.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-foreground">Reduces hair fall by up to 70%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-foreground">Increases hair shine and softness</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-foreground">Promotes healthy hair growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Pure, Natural Ingredients
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Each ingredient is carefully selected for its nourishing properties
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="bg-card border border-sage/30 rounded-lg p-6 text-center hover:shadow-organic transition-organic"
              >
                <div className="w-12 h-12 bg-gradient-organic rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium text-foreground">{ingredient}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-organic">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of happy customers who've transformed their hair naturally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-sage/30 hover:shadow-organic transition-organic">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Hair?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the SuBu Organica family and discover the power of natural hair care
          </p>
          <Link to="/shop">
            <Button
              variant="secondary"
              className="text-lg px-8 py-6 hover:shadow-gold transition-organic"
            >
              Shop Now - Rs.1,299 only
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;