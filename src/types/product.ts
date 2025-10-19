export interface Product {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  benefits?: string[];
  howToUse?: string;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  products: CartItem[];
  totalPrice: number;
  status: 'pending' | 'processed';
  createdAt: Date;
}