import { create } from 'zustand';

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  cost: string;
  location: string;
  distance: string;
  closing?: string;
  menu: MenuItem[];
  deliveryTime?: string;
  isVeg?: boolean;
  offers?: string[];
  featuredItems?: MenuItem[];
  reviews?: Review[];
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  spiceLevel: string;
  prepTime: string;
  calories: string;
  serves: string;
  isVegetarian?: boolean;
  rating?: number;
  imageUrl?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  username: string;
  userType: 'customer' | 'delivery_partner' | 'admin' | 'ngo';
  email?: string;
  phone?: string;
  address?: string;
  vehicleType?: string;
  licenseNumber?: string;
  healthInfo?: HealthInfo;
  preferences?: UserPreferences;
  activeOrders?: string[];
  rating?: number;
  totalDeliveries?: number;
  ngoDetails?: NGODetails;
}

export interface NGODetails {
  registrationNumber: string;
  name: string;
  type: string;
  capacity: number;
  contactPerson: string;
  operatingHours: string;
}

export interface HealthInfo {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
}

export interface UserPreferences {
  cuisines: string[];
  spiceLevel: string;
  dietaryRestrictions: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Review {
  id: number;
  userId: string;
  restaurantId: number;
  orderId?: string;
  rating: number;
  comment: string;
  date: Date;
  images?: string[];
  likes?: number;
  replies?: ReviewReply[];
}

export interface ReviewReply {
  userId: string;
  comment: string;
  date: Date;
}

export interface OrderComment {
  id: number;
  userId: string;
  message: string;
  timestamp: Date;
}

export interface DeliveryOTP {
  code: string;
  orderId: number;
  verified: boolean;
}

export interface DeliveryStatus {
  status: 'picked_up' | 'on_the_way' | 'near_location' | 'delivered' | 'return_initiated' | 'return_completed' | 'ngo_donation_initiated' | 'ngo_donation_completed';
  timestamp: Date;
}

export interface ReturnRequest {
  orderId: string;
  userId: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'donated_to_ngo';
  returnOTP: string;
  createdAt: Date;
  ngoId?: string;
  donationOTP?: string;
}

export interface DeliveryAddress {
  fullAddress: string;
  landmark?: string;
  contactName: string;
  contactPhone: string;
}

export interface DeliveryPartnerDetails {
  name: string;
  phone: string;
  vehicleType: string;
  vehicleNumber?: string;
  currentLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  rating: number;
  totalDeliveries: number;
  photo?: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: number;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'return_initiated' | 'return_completed' | 'ngo_donation_initiated' | 'ngo_donation_completed' | 'cancelled';
  totalAmount: number;
  createdAt: Date;
  deliveryAddress: DeliveryAddress;
  deliveryPartnerId?: string;
  deliveryPartner?: DeliveryPartnerDetails;
  paymentMethod?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  specialInstructions?: string;
  returnRequest?: ReturnRequest;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  activeDeliveries: number;
  totalUsers: number;
  newUsers?: number;
  activeRestaurants?: number;
  orderGrowth?: number;
  revenueGrowth?: number;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopRestaurant {
  id: number;
  name: string;
  totalOrders: number;
  revenue: number;
  rating: number;
  growth: number;
}

export interface TopDeliveryPartner {
  id: string;
  name: string;
  deliveries: number;
  rating: number;
  onTime: number;
  earnings: number;
}

export interface CustomerDemographics {
  ageGroups: Array<{ group: string; percentage: number }>;
  orderFrequency: Array<{ frequency: string; percentage: number }>;
  topCuisines: Array<{ cuisine: string; orders: number }>;
}

export interface OrderAnalytics {
  averageOrderValue: number;
  averageDeliveryTime: number;
  orderCompletionRate: number;
  cancelationRate: number;
  peakHours: Array<{ time: string; percentage: number }>;
}

export interface PaymentAnalytics {
  methods: Array<{ method: string; percentage: number; amount: number }>;
  successRate: number;
  refundRate: number;
  averageRefundTime: number;
}

export interface DeliveryAnalytics {
  averageTime: number;
  onTimeRate: number;
  lateDeliveries: number;
  partnerUtilization: number;
  busyAreas: Array<{ area: string; orders: number }>;
}

export interface SupportTickets {
  open: number;
  inProgress: number;
  resolved: number;
  averageResponseTime: number;
  categories: Array<{ type: string; count: number }>;
}

export interface FoodItem {
  name: string;
  weight: number;
  unit: 'kg' | 'g';
  type: string;
  temperature: number;
  packagingType: string;
  preparationTime: string;
  expiryTime: string;
  image?: string;
  description?: string;
}