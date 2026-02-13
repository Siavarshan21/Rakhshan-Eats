export const mockCategories = [
  { id: 'cat-1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', image: '/images/categories/fruits.jpg' },
  { id: 'cat-2', name: 'Dairy & Eggs', slug: 'dairy-eggs', image: '/images/categories/dairy.jpg' },
  { id: 'cat-3', name: 'Bakery', slug: 'bakery', image: '/images/categories/bakery.jpg' },
  { id: 'cat-4', name: 'Meat & Seafood', slug: 'meat-seafood', image: '/images/categories/meat.jpg' },
];

export const mockProducts = [
  {
    id: 'prod-1',
    name: 'Organic Bananas',
    slug: 'organic-bananas',
    price: 2.99,
    categoryId: 'cat-1',
    image: '/images/products/bananas.jpg',
    description: 'Fresh organic bananas, perfectly ripe.',
    inStock: true,
    unit: 'bunch',
  },
  {
    id: 'prod-2',
    name: 'Free Range Eggs',
    slug: 'free-range-eggs',
    price: 5.49,
    categoryId: 'cat-2',
    image: '/images/products/eggs.jpg',
    description: 'Farm-fresh free range eggs, dozen.',
    inStock: true,
    unit: 'dozen',
  },
  {
    id: 'prod-3',
    name: 'Sourdough Bread',
    slug: 'sourdough-bread',
    price: 4.99,
    categoryId: 'cat-3',
    image: '/images/products/sourdough.jpg',
    description: 'Artisan sourdough bread, freshly baked.',
    inStock: true,
    unit: 'loaf',
  },
  {
    id: 'prod-4',
    name: 'Atlantic Salmon Fillet',
    slug: 'atlantic-salmon-fillet',
    price: 12.99,
    categoryId: 'cat-4',
    image: '/images/products/salmon.jpg',
    description: 'Premium Atlantic salmon fillet, skin-on.',
    inStock: false,
    unit: 'lb',
  },
];

export const mockCartItems = [
  {
    productId: 'prod-1',
    name: 'Organic Bananas',
    price: 2.99,
    quantity: 2,
    image: '/images/products/bananas.jpg',
  },
  {
    productId: 'prod-2',
    name: 'Free Range Eggs',
    price: 5.49,
    quantity: 1,
    image: '/images/products/eggs.jpg',
  },
  {
    productId: 'prod-3',
    name: 'Sourdough Bread',
    price: 4.99,
    quantity: 3,
    image: '/images/products/sourdough.jpg',
  },
];

export const mockUser = {
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
  },
};

export const mockOrder = {
  orderId: 'order-123',
  status: 'confirmed',
  items: mockCartItems,
  subtotal: 26.44,
  tax: 2.38,
  deliveryFee: 3.99,
  total: 32.81,
  estimatedDelivery: '30-45 min',
};

export const mockPromoCode = {
  code: 'SAVE10',
  valid: true,
  discount: 10,
  type: 'percentage' as const,
};
