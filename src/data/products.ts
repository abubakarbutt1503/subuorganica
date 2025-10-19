import { Product } from '@/types/product';
import productBottle from '@/assets/product-bottle.png';
import productLifestyle from '@/assets/product-lifestyle.png';

export const products: Product[] = [
  {
    id: '1',
    name: 'SuBu Organica Herbal Hair Growth Oil',
    description: 'Premium herbal oil that strengthens roots, promotes hair growth, and restores natural shine. 100% Natural, no chemicals, herbal blend crafted with nature\'s finest ingredients.',
    ingredients: [
      'Amla Extract',
      'Organic Coconut Oil',
      'Castor Oil',
      'Bhringraj',
      'Neem Oil',
      'Fenugreek Extract',
      'Hibiscus Extract',
      'Essential Oils Blend'
    ],
    price: 2000, // Price in PKR (converted to cents: 1200 PKR = 120000 cents)
    images: [productBottle, productLifestyle],
    category: 'Hair Care',
    inStock: true,
    benefits: [
      'Promotes natural hair growth',
      'Strengthens hair roots and reduces breakage',
      'Adds natural shine and softness',
      'Nourishes scalp with herbal ingredients',
      '100% natural and chemical-free',
      'Suitable for all hair types',
      'Reduces dandruff and scalp irritation'
    ],
    howToUse: 'Apply 3-5 drops to damp or dry hair. Massage gently into scalp and distribute through hair length. For best results, use 2-3 times per week. Can be left overnight for deep conditioning.'
  }
];