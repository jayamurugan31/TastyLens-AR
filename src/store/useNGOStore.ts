import { create } from 'zustand';
import { User } from '../types';

interface NGOState {
  ngos: User[];
  selectedNGO: User | null;
  setSelectedNGO: (ngo: User | null) => void;
}

// Demo NGO data
const demoNGOs: User[] = [
  {
    username: 'feedinghope',
    userType: 'ngo',
    email: 'contact@feedinghope.org',
    phone: '+91 9876543210',
    address: 'Anna Nagar, Chennai',
    ngoDetails: {
      registrationNumber: 'NGO123456',
      name: 'Feeding Hope Foundation',
      type: 'Food Distribution',
      capacity: 500,
      contactPerson: 'Rajesh Kumar',
      operatingHours: '9:00 AM - 6:00 PM'
    }
  },
  {
    username: 'foodforall',
    userType: 'ngo',
    email: 'info@foodforall.org',
    phone: '+91 9876543211',
    address: 'T. Nagar, Chennai',
    ngoDetails: {
      registrationNumber: 'NGO123457',
      name: 'Food For All',
      type: 'Food Bank',
      capacity: 300,
      contactPerson: 'Priya Sharma',
      operatingHours: '8:00 AM - 8:00 PM'
    }
  }
];

export const useNGOStore = create<NGOState>((set) => ({
  ngos: demoNGOs,
  selectedNGO: null,
  setSelectedNGO: (ngo) => set({ selectedNGO: ngo }),
}));