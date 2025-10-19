import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });

  const formatPrice = (price: number) => {
    const formattedPrice = price.toLocaleString('ur-PK');
    return `Rs.${formattedPrice}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'pincode',
    ];
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast({
        title: 'Please fill in all required fields',
        description: 'Some required information is missing.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Order placed successfully!',
      description:
        'You will receive a confirmation email shortly. Thank you for choosing SuBu Organica!',
    });

    dispatch({ type: 'CLEAR_CART' });
  };

  // 🧮 Calculate discounted total dynamically
  const calculateDiscountedTotal = () => {
    return state.items.reduce((total, item) => {
      const discount = item.product.discount || 35.05;
      const discountedPrice = item.product.price - (item.product.price * discount) / 100;
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const discountedTotal = calculateDiscountedTotal();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">No Items to Checkout</h1>
          <p className="text-muted-foreground mb-8">Add some products to your cart first.</p>
          <Link to="/shop">
            <Button className="bg-gradient-hero hover:shadow-gold transition-organic">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-organic mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card className="border-sage/30">
              <CardHeader>
                <CardTitle className="text-primary">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="border-sage/30 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="border-sage/30 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-sage/30 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-sage/30 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border-sage/30 focus:border-primary"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="border-sage/30 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="border-sage/30 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pincode">PIN Code *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="border-sage/30 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="border-sage/30 focus:border-primary"
                    rows={3}
                    placeholder="Any special instructions for your order..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-sage/30">
              <CardHeader>
                <CardTitle className="text-primary">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 p-4 bg-sage/10 rounded-lg">
                  <CreditCard className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="font-medium text-foreground">Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Pay when you receive your order
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-sage/30">
              <CardHeader>
                <CardTitle className="text-primary">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => {
                  const discount = item.product.discount || 35.05;
                  const discountedPrice =
                    item.product.price - (item.product.price * discount) / 100;

                  return (
                    <div key={item.product.id} className="flex justify-between items-start">
                      <div className="flex space-x-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {item.product.name}
                          </p>
                          <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                          {discount > 0 && (
                            <p className="text-xs text-green-600 font-medium">
                              {discount}% OFF
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        {discount > 0 && (
                          <p className="text-xs line-through text-muted-foreground">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        )}
                        <p className="font-medium text-primary">
                          {formatPrice(discountedPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="border-t border-sage/30 pt-4 space-y-2">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(discountedTotal)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Shipping</span>
                    <span className="text-secondary">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span>{formatPrice(discountedTotal)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border-sage/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-secondary" />
                  <span className="text-sm text-foreground">Free shipping on all orders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-secondary" />
                  <span className="text-sm text-foreground">Secure and safe delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-secondary" />
                  <span className="text-sm text-foreground">Cash on delivery available</span>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <form onSubmit={handleSubmit}>
              <Button
                type="submit"
                className="w-full bg-gradient-hero hover:shadow-gold transition-organic text-lg py-6"
              >
                Place Order - {formatPrice(discountedTotal)}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
