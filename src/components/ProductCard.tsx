import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  // ✅ Format price according to Pakistani locale
  const formatPrice = (price: number) => {
    const formattedPrice = price.toLocaleString('ur-PK');
    return `Rs.${formattedPrice}`;
  };

  // ✅ Discount logic
  const discountPercentage = product.discount || 35.05; // use product.discount if available, else default to 20%
  const discountedPrice = product.price - (product.price * discountPercentage) / 100;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden bg-card hover:shadow-organic transition-organic border-sage/30">
        {/* Product Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-contain group-hover:scale-105 transition-organic"
          />

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-muted-foreground font-medium">Out of Stock</span>
            </div>
          )}

          {/* Star Rating */}
          <div className="absolute top-2 right-2">
            <div className="flex items-center space-x-1 bg-secondary/90 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="h-3 w-3 fill-secondary-foreground text-secondary-foreground" />
              <span className="text-xs font-medium text-secondary-foreground">4.9</span>
            </div>
          </div>

          {/* 🔥 Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              {Math.round(discountPercentage)}% OFF
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-organic">
            {product.name}
          </h3>

          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            {/* Price Section */}
            <div className="flex flex-col">
              {/* Original Price (strikethrough) */}
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>

              {/* Discounted Price */}
              <span className="text-2xl font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-gradient-hero hover:shadow-gold transition-organic"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
