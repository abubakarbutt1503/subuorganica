import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { state, dispatch } = useCart();

  const formatPrice = (price: number) => {
    const formattedPrice = price.toLocaleString('ur-PK');
    return `Rs.${formattedPrice}`;
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16 text-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Discover our amazing organic hair care products and start your natural hair journey.
        </p>
        <Link to="/shop">
          <Button className="bg-gradient-hero hover:shadow-gold transition-organic text-lg px-8 py-6">
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    );
  }

  // 🧾 Calculate subtotal with discount
  const discountedSubtotal = state.items.reduce((sum, item) => {
    const discount = item.product.discount || 35.05;
    const discountedPrice = Math.floor(item.product.price * (1 - discount / 100));
    return sum + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground mb-8">
          {state.items.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => {
              const discount = item.product.discount || 35.05;
              const discountedPrice = Math.floor(item.product.price * (1 - discount / 100));
              return (
                <Card key={item.product.id} className="border-sage/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-sage/10 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-primary mb-2">{item.product.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {item.product.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="h-8 w-8 border-sage/30"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium text-foreground w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="h-8 w-8 border-sage/30"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex flex-col items-end space-y-1">
                            {discount > 0 ? (
                              <>
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(item.product.price * item.quantity)}
                                </span>
                                <span className="text-lg font-bold text-primary">
                                  {formatPrice(discountedPrice * item.quantity)}
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-primary">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.product.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-sage/30 sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-primary mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(discountedSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Shipping</span>
                    <span className="text-secondary">Free</span>
                  </div>
                  <div className="border-t border-sage/30 pt-4">
                    <div className="flex justify-between text-lg font-bold text-primary">
                      <span>Total</span>
                      <span>{formatPrice(discountedSubtotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/checkout" className="block">
                    <Button className="w-full bg-gradient-hero hover:shadow-gold transition-organic text-lg py-6">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/shop" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
