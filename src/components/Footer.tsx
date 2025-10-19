import { Instagram, Facebook, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="SuBu Organica" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-xl font-bold">SuBu Organica</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Nourish your hair naturally with our premium organic hair care products. 
              Crafted with love and nature's finest ingredients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-secondary transition-organic">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-primary-foreground/80 hover:text-secondary transition-organic">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-secondary transition-organic">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-secondary transition-organic">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-organic">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-organic">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-organic">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-organic">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-secondary" />
                <span className="text-primary-foreground/80">subuorganica@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-secondary" />
                <span className="text-primary-foreground/80">0327-4805089</span>
              </div>
              <div className="flex items-center space-x-4 pt-2">
                <a 
                  href="https://www.instagram.com/subuorganica/" 
                  className="text-primary-foreground/80 hover:text-secondary transition-organic"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61579730559017&sk=reels_tab" 
                  className="text-primary-foreground/80 hover:text-secondary transition-organic"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.tiktok.com/@subuorganica" 
                  className="text-primary-foreground/80 hover:text-secondary transition-organic"
                  aria-label="TikTok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path d="M12.75 2c.66 0 1.2.54 1.2 1.2v.2a5.25 5.25 0 0 0 5.25 5.25h.3c.66 0 1.2.54 1.2 1.2v2.4a1.2 1.2 0 0 1-1.2 1.2h-.3c-.84 0-1.68-.12-2.46-.36v5.81a5.79 5.79 0 1 1-5.79-5.79c.3 0 .6.03.87.09v2.58a3.21 3.21 0 1 0 2.28 3.07V2.8c0-.66.54-1.2 1.2-1.2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; 2025 SuBu Organica. All rights reserved. | Made with 💚 for healthy hair.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
