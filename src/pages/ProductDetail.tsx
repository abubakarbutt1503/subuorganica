import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Shield, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate(); // ✅ Added for navigation

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button className="bg-gradient-hero">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Helper function to format price in Pakistani Rupees
  const formatPrice = (price: number) => `Rs.${price.toLocaleString('ur-PK')}`;

  // ✅ Handle Buy Now (add to cart + navigate to checkout)
  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    toast({
      title: 'Added to cart!',
      description: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`,
    });
    navigate('/checkout'); // ✅ Redirects to checkout
  };

  // ✅ Discount logic
  const discountPercentage = Math.round(product.discount || 35.05);
  const discountedPrice =
    product.price - (product.price * (product.discount || 35.05)) / 100;

  const features = [
    {
      icon: <Truck className="h-5 w-5 text-secondary" />,
      title: 'Free Shipping',
      description: 'On orders over Rs.2000',
    },
    {
      icon: <RotateCcw className="h-5 w-5 text-secondary" />,
      title: '30-Day Returns',
      description: 'Money-back guarantee',
    },
    {
      icon: <Shield className="h-5 w-5 text-secondary" />,
      title: 'Secure Payment',
      description: '100% secure checkout',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-organic"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-sage/10 relative">
              {discountPercentage > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  {discountPercentage}% OFF
                </div>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-organic"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-organic ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-sage/30 hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                  <span className="text-muted-foreground ml-2">(128 reviews)</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    product.inStock
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-destructive/20 text-destructive'
                  }`}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* ✅ Price Display with Discount */}
              <div className="flex items-baseline space-x-3 mb-6">
                <p className="text-4xl font-bold text-primary">
                  {formatPrice(discountedPrice)}
                </p>
                {discountPercentage > 0 && (
                  <>
                    <p className="text-lg line-through text-muted-foreground">
                      {formatPrice(product.price)}
                    </p>
                    <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Benefits */}
            {product.benefits && (
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Star className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Buy Now */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <label className="text-foreground font-medium">Quantity:</label>
                <div className="flex items-center border border-sage/30 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-foreground hover:bg-sage/20 transition-organic"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-sage/30 text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-foreground hover:bg-sage/20 transition-organic"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-hero hover:shadow-gold transition-organic text-lg py-6"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now - {formatPrice(discountedPrice * quantity)}
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-sage/10 rounded-lg"
                >
                  {feature.icon}
                  <div>
                    <p className="font-medium text-foreground text-sm">{feature.title}</p>
                    <p className="text-muted-foreground text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <Card className="border-sage/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Natural Ingredients
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-sage/10 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-foreground text-sm">{ingredient}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How to Use */}
          {product.howToUse && (
            <Card className="border-sage/30">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  How to Use
                </h3>
                <p className="text-foreground leading-relaxed">{product.howToUse}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
