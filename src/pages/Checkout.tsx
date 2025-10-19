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

  // 🧮 Format price in PKR
  const formatPrice = (price: number) => {
    const formattedPrice = price.toLocaleString('ur-PK');
    return `Rs.${formattedPrice}`;
  };

  // 🧾 Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  // 📨 Submit checkout form
  const handleSubmit = async (e: React.FormEvent) => {
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
    const missing = requiredFields.filter((f) => !formData[f as keyof typeof formData]);

    if (missing.length > 0) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields before continuing.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // 🧠 Backend API URL — change if deployed
      const baseURL = 'https://subuorganica.onrender.com';

      const response = await fetch(`${baseURL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          items: state.items,
          total: discountedTotal,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: '✅ Order Placed Successfully!',
          description:
            'Your order details have been sent. You will receive a confirmation email shortly.',
        });
        dispatch({ type: 'CLEAR_CART' });
      } else {
        throw new Error(result.error || 'Failed to send order.');
      }
    } catch (err: any) {
      console.error('Checkout Error:', err);
      toast({
        title: '❌ Error Sending Order',
        description: err.message || 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  // 🛒 Empty cart message
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">No Items to Checkout</h1>
        <p className="text-muted-foreground mb-8">Add some products to your cart first.</p>
        <Link to="/shop">
          <Button className="bg-gradient-hero hover:shadow-gold transition-organic">
            Continue Shopping
          </Button>
        </Link>
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
                    <Label>First Name *</Label>
                    <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label>Last Name *</Label>
                    <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <Label>Email Address *</Label>
                  <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label>Phone Number *</Label>
                  <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label>Address *</Label>
                  <Textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>City *</Label>
                    <Input name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label>State *</Label>
                    <Input name="state" value={formData.state} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <Label>PIN Code *</Label>
                  <Input name="pincode" value={formData.pincode} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label>Order Notes (Optional)</Label>
                  <Textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} placeholder="Any special instructions..." />
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
                  const discountedPrice = item.product.price - (item.product.price * discount) / 100;

                  return (
                    <div key={item.product.id} className="flex justify-between items-start">
                      <div className="flex space-x-3">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-foreground text-sm">{item.product.name}</p>
                          <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                          {discount > 0 && <p className="text-xs text-green-600 font-medium">{discount}% OFF</p>}
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

            {/* Submit Order */}
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
