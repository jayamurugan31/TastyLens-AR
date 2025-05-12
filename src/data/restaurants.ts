import { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Hotel Crescent',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60',
    rating: 4.1,
    cuisine: 'Arabian, Biryani, Chinese, Continental',
    cost: '₹600 for two',
    location: 'Nungambakkam, Chennai',
    distance: '2.7 km',
    menu: [
      {
        id: 1,
        name: 'Burger with French Fries',
        price: 1050,
        description: 'Juicy burger patty served with crispy golden french fries. Choice of vegetarian or non-vegetarian patty available.',
        spiceLevel: 'Medium',
        prepTime: '20-25 mins',
        calories: '850 kcal',
        serves: '1 person'
      },
      {
        id: 2,
        name: 'Pizza',
        price: 360,
        description: 'Fresh handmade pizza with your choice of toppings, baked to perfection in our stone oven. Available in various sizes.',
        spiceLevel: 'Customizable',
        prepTime: '25-30 mins',
        calories: '750 kcal',
        serves: '1-2 persons'
      },
      {
        id: 3,
        name: 'Takoyaki',
        price: 560,
        description: 'Japanese octopus balls made with a wheat flour-based batter, topped with takoyaki sauce, mayo, and bonito flakes.',
        spiceLevel: 'Mild',
        prepTime: '15-20 mins',
        calories: '450 kcal',
        serves: '1 person'
      },
      {
        id: 4,
        name: 'Gourmet Burger',
        price: 860,
        description: 'Premium burger featuring artisanal buns, gourmet patty, fresh vegetables, and signature sauce. Served with seasoned wedges.',
        spiceLevel: 'Medium',
        prepTime: '25-30 mins',
        calories: '950 kcal',
        serves: '1 person'
      }
    ]
  },
  {
    id: 2,
    name: 'Courtallam Border Rahmath',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop&q=60',
    rating: 4.0,
    cuisine: 'South Indian, Chettinad, Special',
    cost: '₹800 for two',
    location: 'T. Nagar, Chennai',
    distance: '578 m',
    closing: 'Closes in 1 hour 40 minutes',
    menu: [
      {
        id: 1,
        name: 'Millet Parotta with Veg Kurma',
        price: 120,
        description: 'Foxtail millet parotta served with a mild coconut veggie kurma. Low-carbon footprint and locally sourced ingredients.',
        spiceLevel: 'Mild',
        prepTime: '15-20 mins',
        calories: '350 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 2,
        name: 'Jackfruit Kothu Parotta',
        price: 140,
        description: 'Shredded parotta with spicy jackfruit masala. Plant-based choice with water-efficient ingredients.',
        spiceLevel: 'Medium',
        prepTime: '20-25 mins',
        calories: '400 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 3,
        name: 'Banana Stem Poriyal',
        price: 90,
        description: 'Banana stem stir fry with coconut and mustard seeds. Water-efficient and zero-waste dish.',
        spiceLevel: 'Mild',
        prepTime: '15-20 mins',
        calories: '200 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 4,
        name: 'Tamarind Millet Rice',
        price: 110,
        description: 'Tangy millet rice with curry leaf tempering. Eco-friendly meal using indigenous grains.',
        spiceLevel: 'Medium',
        prepTime: '15-20 mins',
        calories: '320 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 5,
        name: 'South Veg Meals (Eco Edition)',
        price: 180,
        description: 'Seasonal vegetables, rasam, kootu, poriyal, and millet rice. Sustainable combo eligible for donation.',
        spiceLevel: 'Customizable',
        prepTime: '20-25 mins',
        calories: '650 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 6,
        name: 'Border Style Chicken Biryani',
        price: 280,
        description: 'Traditional seeraga samba biryani with chicken and signature spices.',
        spiceLevel: 'Hot',
        prepTime: '25-30 mins',
        calories: '750 kcal',
        serves: '1-2 persons'
      },
      {
        id: 7,
        name: 'Mutton Chukka Varuval',
        price: 320,
        description: 'Spicy dry-fried mutton prepared in authentic Chettinad style.',
        spiceLevel: 'Very Hot',
        prepTime: '25-30 mins',
        calories: '450 kcal',
        serves: '2 persons'
      },
      {
        id: 8,
        name: 'Kudam Puli Fish Curry',
        price: 260,
        description: 'Tamarind-based fish curry with aromatic coconut paste.',
        spiceLevel: 'Hot',
        prepTime: '20-25 mins',
        calories: '380 kcal',
        serves: '2 persons'
      },
      {
        id: 9,
        name: 'Egg Kalakki',
        price: 90,
        description: 'Soft scrambled eggs with pepper and ghee, street-style preparation.',
        spiceLevel: 'Medium',
        prepTime: '10-15 mins',
        calories: '280 kcal',
        serves: '1 person'
      },
      {
        id: 10,
        name: 'Parotta with Chicken Salna',
        price: 160,
        description: 'Classic street-style layered parotta served with rich chicken gravy.',
        spiceLevel: 'Hot',
        prepTime: '15-20 mins',
        calories: '580 kcal',
        serves: '1 person'
      }
    ]
  },
  {
    id: 3,
    name: "Hotel Pandia's",
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop&q=60',
    rating: 3.6,
    cuisine: 'South Indian, Andhra, Biryani',
    location: 'Vadapalani, Chennai',
    distance: '3.4 km',
    menu: [
      {
        id: 1,
        name: 'Kambu Idli with Veg Sambar',
        price: 80,
        description: 'Pearl millet idlis served with lentil-rich sambar. Eco-friendly and water-efficient.',
        spiceLevel: 'Mild',
        prepTime: '15-20 mins',
        calories: '250 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 2,
        name: 'Black Rice Pulao',
        price: 160,
        description: 'Heirloom black rice cooked with herbs and local vegetables. Ancient grain, water-saving recipe.',
        spiceLevel: 'Mild',
        prepTime: '25-30 mins',
        calories: '380 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 3,
        name: 'Vazhapoo Vadai',
        price: 90,
        description: 'Banana flower fritters made with lentils. Plant-powered and using local ingredients.',
        spiceLevel: 'Medium',
        prepTime: '15-20 mins',
        calories: '280 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 4,
        name: 'Eco Thali (Mini Meals)',
        price: 150,
        description: 'Millet rice, veg kurma, rasam, poriyal, and salad. Eco-friendly combo eligible for donation.',
        spiceLevel: 'Customizable',
        prepTime: '20-25 mins',
        calories: '550 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 5,
        name: 'Kariveppilai Rasam',
        price: 60,
        description: 'Aromatic curry leaf rasam with pepper and garlic. Medicinal properties, home-gardened ingredients.',
        spiceLevel: 'Medium',
        prepTime: '15-20 mins',
        calories: '120 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 6,
        name: 'Chettinad Chicken Gravy',
        price: 240,
        description: 'Authentic spicy Chettinad chicken curry with ground masalas.',
        spiceLevel: 'Very Hot',
        prepTime: '25-30 mins',
        calories: '450 kcal',
        serves: '2 persons'
      },
      {
        id: 7,
        name: 'Mutton Kola Urundai',
        price: 280,
        description: 'Deep-fried spiced mutton meatballs, a classic Chettinad delicacy.',
        spiceLevel: 'Hot',
        prepTime: '20-25 mins',
        calories: '380 kcal',
        serves: '2 persons'
      },
      {
        id: 8,
        name: 'Parotta with Mushroom Masala',
        price: 140,
        description: 'Soft parotta served with rich mushroom-onion gravy.',
        spiceLevel: 'Medium',
        prepTime: '15-20 mins',
        calories: '460 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 9,
        name: 'Paneer Pepper Fry',
        price: 180,
        description: 'Cottage cheese sautéed with pepper, onions, and curry leaves.',
        spiceLevel: 'Medium',
        prepTime: '15-20 mins',
        calories: '380 kcal',
        serves: '1 person',
        isVegetarian: true
      },
      {
        id: 10,
        name: 'Ghee Roast Dosa',
        price: 90,
        description: 'Crispy dosa glazed with ghee and served with chutney.',
        spiceLevel: 'Mild',
        prepTime: '10-15 mins',
        calories: '320 kcal',
        serves: '1 person',
        isVegetarian: true
      }
    ]
  }
];