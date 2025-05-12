import { Restaurant, MenuItem, Order, User, Review } from '../types';

// Restaurant Categories
export const categories = [
  'South Indian',
  'North Indian',
  'Chinese',
  'Italian',
  'Continental',
  'Fast Food',
  'Desserts',
  'Beverages'
];

// Menu Items
export const popularDishes: MenuItem[] = [
  {
    id: 101,
    name: 'Masala Dosa',
    price: 80,
    description: 'Crispy rice crepe filled with spiced potato masala, served with coconut chutney and sambar',
    spiceLevel: 'Medium',
    prepTime: '15-20 mins',
    calories: '350 kcal',
    serves: '1 person',
    isVegetarian: true,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1630410364547-5bb6d31c8c42?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 102,
    name: 'Butter Chicken',
    price: 280,
    description: 'Tender chicken pieces in rich, creamy tomato gravy with butter and cream',
    spiceLevel: 'Medium',
    prepTime: '25-30 mins',
    calories: '650 kcal',
    serves: '2 persons',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60'
  }
];

// Extended Restaurant Data
export const extendedRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Saravana Bhavan',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60',
    rating: 4.5,
    cuisine: 'South Indian',
    cost: '₹300 for two',
    location: 'T. Nagar, Chennai',
    distance: '1.2 km',
    deliveryTime: '30-35 mins',
    isVeg: true,
    offers: ['50% off up to ₹100', '20% off on first order'],
    featuredItems: popularDishes.slice(0, 2),
    reviews: [
      {
        id: 1,
        userId: 'USR001',
        rating: 5,
        comment: 'Best South Indian food in the city!',
        date: new Date('2024-03-15')
      }
    ]
  },
  {
    id: 2,
    name: 'Punjab Grill',
    image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&auto=format&fit=crop&q=60',
    rating: 4.3,
    cuisine: 'North Indian',
    cost: '₹800 for two',
    location: 'Nungambakkam, Chennai',
    distance: '2.5 km',
    deliveryTime: '40-45 mins',
    isVeg: false,
    offers: ['15% off on orders above ₹1000'],
    featuredItems: popularDishes.slice(1, 2),
    reviews: [
      {
        id: 2,
        userId: 'USR002',
        rating: 4,
        comment: 'Authentic North Indian flavors',
        date: new Date('2024-03-14')
      }
    ]
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD123456',
    userId: 'USR001',
    restaurantId: 1,
    items: [
      { ...popularDishes[0], quantity: 2 },
      { ...popularDishes[1], quantity: 1 }
    ],
    status: 'delivered',
    totalAmount: 440,
    createdAt: new Date('2024-03-15T10:30:00'),
    deliveryAddress: {
      fullAddress: '123, Anna Nagar East',
      landmark: 'Near East Park Signal',
      contactName: 'John Doe',
      contactPhone: '+91 9876543211'
    },
    deliveryPartnerId: 'DP001',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    specialInstructions: 'Please add extra chutney'
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    username: 'john_doe',
    userType: 'customer',
    email: 'john@example.com',
    phone: '+91 9876543210',
    address: 'Anna Nagar, Chennai',
    healthInfo: {
      height: 175,
      weight: 70,
      age: 28,
      gender: 'male'
    },
    preferences: {
      cuisines: ['South Indian', 'North Indian'],
      spiceLevel: 'Medium',
      dietaryRestrictions: ['No onion', 'No garlic']
    }
  },
  {
    username: 'delivery_partner1',
    userType: 'delivery_partner',
    email: 'partner1@example.com',
    phone: '+91 9876543211',
    vehicleType: 'bike',
    licenseNumber: 'TN1234567',
    activeOrders: ['ORD123456'],
    rating: 4.8,
    totalDeliveries: 150
  }
];

// Reviews and Ratings
export const mockReviews: Review[] = [
  {
    id: 1,
    userId: 'USR001',
    restaurantId: 1,
    orderId: 'ORD123456',
    rating: 5,
    comment: 'Amazing food and quick delivery!',
    date: new Date('2024-03-15'),
    images: [
      'https://images.unsplash.com/photo-1630410364547-5bb6d31c8c42?w=800&auto=format&fit=crop&q=60'
    ],
    likes: 12,
    replies: [
      {
        userId: 'RESTAURANT1',
        comment: 'Thank you for your kind words!',
        date: new Date('2024-03-15T14:30:00')
      }
    ]
  }
];

// Offers and Promotions
export const mockOffers = [
  {
    id: 1,
    title: '50% OFF up to ₹100',
    code: 'WELCOME50',
    description: 'Get 50% off on your first order',
    minOrder: 200,
    maxDiscount: 100,
    validUntil: new Date('2024-04-15'),
    termsAndConditions: [
      'Valid on first order only',
      'Minimum order value ₹200',
      'Maximum discount ₹100'
    ]
  }
];

// Payment Methods
export const paymentMethods = [
  {
    id: 1,
    name: 'Credit/Debit Card',
    icon: 'credit-card',
    isEnabled: true
  },
  {
    id: 2,
    name: 'UPI',
    icon: 'smartphone',
    isEnabled: true
  },
  {
    id: 3,
    name: 'Cash on Delivery',
    icon: 'cash',
    isEnabled: true
  }
];