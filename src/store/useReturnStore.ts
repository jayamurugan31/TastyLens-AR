import { create } from 'zustand';
import { ReturnRequest } from '../types';

interface ReturnState {
  returnRequests: ReturnRequest[];
  discountTokens: Map<string, string>;
  addReturnRequest: (request: ReturnRequest) => void;
  updateReturnStatus: (orderId: string, status: ReturnRequest['status']) => void;
  verifyReturnOTP: (orderId: string, otp: string) => boolean;
  generateDiscountToken: (orderId: string) => string;
  verifyDiscountToken: (token: string) => boolean;
}

export const useReturnStore = create<ReturnState>((set, get) => ({
  returnRequests: [],
  discountTokens: new Map(),
  
  addReturnRequest: (request) =>
    set((state) => ({
      returnRequests: [...state.returnRequests, request],
    })),
    
  updateReturnStatus: (orderId, status) =>
    set((state) => ({
      returnRequests: state.returnRequests.map((request) =>
        request.orderId === orderId ? { ...request, status } : request
      ),
    })),
    
  verifyReturnOTP: (orderId, otp) => {
    const request = get().returnRequests.find((r) => r.orderId === orderId);
    return request?.returnOTP === otp;
  },
  
  generateDiscountToken: (orderId) => {
    const token = `RETURN${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    set((state) => {
      const newTokens = new Map(state.discountTokens);
      newTokens.set(token, orderId);
      return { discountTokens: newTokens };
    });
    return token;
  },
  
  verifyDiscountToken: (token) => {
    return get().discountTokens.has(token);
  },
}));