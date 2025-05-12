import { AdminStats } from '../types';

// Daily Revenue Data (Last 7 days)
export const dailyRevenue = [
  { date: '2024-03-15', revenue: 25600, orders: 128 },
  { date: '2024-03-14', revenue: 28900, orders: 145 },
  { date: '2024-03-13', revenue: 22400, orders: 112 },
  { date: '2024-03-12', revenue: 24800, orders: 124 },
  { date: '2024-03-11', revenue: 27200, orders: 136 },
  { date: '2024-03-10', revenue: 30100, orders: 150 },
  { date: '2024-03-09', revenue: 26400, orders: 132 }
];

// Hourly Order Distribution
export const hourlyOrders = [
  { hour: '00:00', orders: 5 },
  { hour: '01:00', orders: 3 },
  { hour: '02:00', orders: 2 },
  { hour: '03:00', orders: 1 },
  { hour: '04:00', orders: 1 },
  { hour: '05:00', orders: 2 },
  { hour: '06:00', orders: 8 },
  { hour: '07:00', orders: 15 },
  { hour: '08:00', orders: 25 },
  { hour: '09:00', orders: 30 },
  { hour: '10:00', orders: 28 },
  { hour: '11:00', orders: 35 },
  { hour: '12:00', orders: 45 },
  { hour: '13:00', orders: 50 },
  { hour: '14:00', orders: 40 },
  { hour: '15:00', orders: 35 },
  { hour: '16:00', orders: 30 },
  { hour: '17:00', orders: 38 },
  { hour: '18:00', orders: 48 },
  { hour: '19:00', orders: 55 },
  { hour: '20:00', orders: 52 },
  { hour: '21:00', orders: 45 },
  { hour: '22:00', orders: 30 },
  { hour: '23:00', orders: 15 }
];

// Top Performing Restaurants
export const topRestaurants = [
  {
    id: 1,
    name: 'Saravana Bhavan',
    totalOrders: 450,
    revenue: 89000,
    rating: 4.5,
    growth: 15 // Percentage growth from last month
  },
  {
    id: 2,
    name: 'Punjab Grill',
    totalOrders: 380,
    revenue: 95000,
    rating: 4.3,
    growth: 12
  },
  {
    id: 3,
    name: 'Paradise Biryani',
    totalOrders: 320,
    revenue: 78000,
    rating: 4.4,
    growth: 18
  }
];

// Top Performing Delivery Partners
export const topDeliveryPartners = [
  {
    id: 'DP001',
    name: 'Jayamurugan',
    deliveries: 150,
    rating: 4.8,
    onTime: 98, // Percentage
    earnings: 15000
  },
  {
    id: 'DP002',
    name: 'Ramesh Kumar',
    deliveries: 142,
    rating: 4.7,
    onTime: 96,
    earnings: 14200
  },
  {
    id: 'DP003',
    name: 'Karthik Raja',
    deliveries: 138,
    rating: 4.9,
    onTime: 99,
    earnings: 13800
  }
];

// Customer Demographics
export const customerDemographics = {
  ageGroups: [
    { group: '18-24', percentage: 25 },
    { group: '25-34', percentage: 40 },
    { group: '35-44', percentage: 20 },
    { group: '45-54', percentage: 10 },
    { group: '55+', percentage: 5 }
  ],
  orderFrequency: [
    { frequency: 'Daily', percentage: 15 },
    { frequency: 'Weekly', percentage: 45 },
    { frequency: 'Monthly', percentage: 30 },
    { frequency: 'Occasional', percentage: 10 }
  ],
  topCuisines: [
    { cuisine: 'South Indian', orders: 2800 },
    { cuisine: 'North Indian', orders: 2500 },
    { cuisine: 'Chinese', orders: 1800 },
    { cuisine: 'Fast Food', orders: 1500 },
    { cuisine: 'Desserts', orders: 1200 }
  ]
};

// Order Analytics
export const orderAnalytics = {
  averageOrderValue: 450,
  averageDeliveryTime: 35, // minutes
  orderCompletionRate: 96.5, // percentage
  cancelationRate: 3.5, // percentage
  peakHours: [
    { time: 'Lunch (12-2 PM)', percentage: 35 },
    { time: 'Dinner (7-9 PM)', percentage: 40 },
    { time: 'Other', percentage: 25 }
  ]
};

// Payment Analytics
export const paymentAnalytics = {
  methods: [
    { method: 'UPI', percentage: 45, amount: 450000 },
    { method: 'Cards', percentage: 30, amount: 300000 },
    { method: 'Cash', percentage: 20, amount: 200000 },
    { method: 'Other', percentage: 5, amount: 50000 }
  ],
  successRate: 98.5,
  refundRate: 1.2,
  averageRefundTime: 24 // hours
};

// Current Month Overview
export const currentMonthStats: AdminStats = {
  totalOrders: 4850,
  totalRevenue: 985000,
  activeDeliveries: 85,
  totalUsers: 12500,
  newUsers: 450,
  activeRestaurants: 125,
  orderGrowth: 15, // Percentage growth from last month
  revenueGrowth: 18 // Percentage growth from last month
};

// Delivery Analytics
export const deliveryAnalytics = {
  averageTime: 32, // minutes
  onTimeRate: 94.5, // percentage
  lateDeliveries: 5.5, // percentage
  partnerUtilization: 78, // percentage
  busyAreas: [
    { area: 'T. Nagar', orders: 850 },
    { area: 'Anna Nagar', orders: 720 },
    { area: 'Velachery', orders: 680 },
    { area: 'Adyar', orders: 580 },
    { area: 'Mylapore', orders: 520 }
  ]
};

// Support Tickets
export const supportTickets = {
  open: 45,
  inProgress: 28,
  resolved: 152,
  averageResponseTime: 15, // minutes
  categories: [
    { type: 'Delivery Issues', count: 85 },
    { type: 'Food Quality', count: 65 },
    { type: 'Payment Issues', count: 45 },
    { type: 'App Technical', count: 30 }
  ]
};