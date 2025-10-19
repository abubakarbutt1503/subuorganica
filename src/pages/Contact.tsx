import { useState } from 'react';
import { Mail, Phone, MapPin, Send,Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="bg-gradient-organic border-0 shadow-organic">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-secondary" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">Send us an email</p>
                  <p className="font-semibold text-primary">subuorganica@gmail.com</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-organic border-0 shadow-organic">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-secondary" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">Speak with our team</p>
                  <p className="font-semibold text-primary">03274805089</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-organic border-0 shadow-organic">
      <CardHeader>
        <CardTitle className="text-primary flex items-center">
          <span className="mr-2 text-secondary">🌿</span>
          Follow Us
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Stay connected with <span className="font-semibold">SuBu Organica</span> on social media
          for the latest updates, tips, and natural care inspiration.
        </p>
        <div className="flex items-center space-x-4">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/subuorganica/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 hover:bg-secondary/10 transition-transform transform hover:scale-110"
          >
            <Instagram className="h-6 w-6 text-secondary" />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61579730559017&sk=reels_tab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 hover:bg-secondary/10 transition-transform transform hover:scale-110"
          >
            <Facebook className="h-6 w-6 text-secondary" />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@subuorganica"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 hover:bg-secondary/10 transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-secondary"
            >
              <path d="M16.8 6.63c-.48-.2-1-.33-1.5-.36v4.16c0 .63.07 1.24.21 1.82a5.01 5.01 0 1 1-5.24-5.24v2.04a3 3 0 1 0 3.03 2.39V6.63z" />
            </svg>
          </a>
        </div>
      </CardContent>
    </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-organic border-sage/30">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="border-sage/30 focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="border-sage/30 focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="border-sage/30 focus:border-primary resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-hero hover:shadow-gold transition-organic"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card border-sage/30">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Is your hair oil suitable for all hair types?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! Our herbal hair growth oil is formulated with natural ingredients that work 
                  effectively on all hair types, from fine to thick, straight to curly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-sage/30">
              <CardHeader>
                <CardTitle className="text-lg text-primary">How often should I use the hair oil?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For best results, we recommend using our hair oil 2-3 times per week. 
                  Apply to damp or dry hair, focusing on the ends and scalp.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-sage/30">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Do you offer international shipping?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Currently, we offer shipping within Pakistan. We're working on expanding 
                  our shipping options to serve customers internationally.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-sage/30">
              <CardHeader>
                <CardTitle className="text-lg text-primary">What if I'm not satisfied with my purchase?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 30-day satisfaction guarantee. If you're not completely happy 
                  with your purchase, contact us for a full refund or exchange.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;