import { create } from 'zustand';
import { blockchainService } from '../services/blockchain';

interface BlockchainState {
  isInitialized: boolean;
  isConnecting: boolean;
  error: string | null;
  tokenBalance: number;
  sustainableOrders: number;
  totalOrders: number;
  stakes: Array<{
    amount: number;
    timestamp: number;
    lockPeriod: number;
    isActive: boolean;
  }>;
  rewards: number;
  initialize: () => Promise<void>;
  createOrder: (restaurantAddress: string, amount: number) => Promise<number>;
  payOrder: (orderId: number, amount: number) => Promise<void>;
  verifyOrder: (orderId: number) => Promise<void>;
  getUserStats: () => Promise<void>;
  mintTokens: (amount: number) => Promise<void>;
  transferTokens: (recipient: string, amount: number) => Promise<void>;
  getTransactionHistory: () => Promise<any[]>;
  getTokenPrice: () => Promise<number>;
  stake: (amount: number, lockPeriod: number) => Promise<void>;
  unstake: (stakeIndex: number) => Promise<void>;
  claimRewards: () => Promise<void>;
  getStakes: () => Promise<void>;
  getRewards: () => Promise<void>;
  // New methods for food tracking
  registerProduct: (
    name: string,
    origin: string,
    producer: string,
    batchNumber: string,
    isOrganic: boolean,
    ingredients: string[]
  ) => Promise<number>;
  addQualityCheck: (
    productId: number,
    inspector: string,
    result: string,
    notes: string
  ) => Promise<void>;
  updateLogistics: (
    productId: number,
    location: string,
    handler: string,
    status: string,
    temperature: string
  ) => Promise<void>;
  getProduct: (productId: number) => Promise<any>;
  getQualityChecks: (productId: number) => Promise<any[]>;
  getLogisticsRecords: (productId: number) => Promise<any[]>;
  getAllProducts: () => Promise<any[]>;
}

export const useBlockchainStore = create<BlockchainState>((set, get) => ({
  isInitialized: false,
  isConnecting: false,
  error: null,
  tokenBalance: 0,
  sustainableOrders: 0,
  totalOrders: 0,
  stakes: [],
  rewards: 0,

  initialize: async () => {
    if (get().isInitialized) return;

    set({ isConnecting: true, error: null });
    try {
      await blockchainService.initialize();
      const contract = await blockchainService.getRewardsContract();
      const [tokenBalance, totalOrders, sustainableOrders] = await contract.getUserStats();
      const stakes = await contract.getStakes();
      const rewards = await contract.getRewards();
      
      set({
        isInitialized: true,
        tokenBalance,
        totalOrders,
        sustainableOrders,
        stakes,
        rewards
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isConnecting: false });
    }
  },

  createOrder: async (restaurantAddress: string, amount: number) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    return await blockchainService.createOrder(restaurantAddress, amount);
  },

  payOrder: async (orderId: number, amount: number) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    await blockchainService.payOrder(orderId, amount);
    await get().getUserStats();
  },

  verifyOrder: async (orderId: number) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    await blockchainService.verifyOrder(orderId);
    await get().getUserStats();
  },

  getUserStats: async () => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      const contract = await blockchainService.getRewardsContract();
      const [tokenBalance, totalOrders, sustainableOrders] = await contract.getUserStats();
      const stakes = await contract.getStakes();
      const rewards = await contract.getRewards();
      set({
        tokenBalance,
        totalOrders,
        sustainableOrders,
        stakes,
        rewards
      });
    } catch (error) {
      console.error('Failed to get user stats:', error);
      throw error;
    }
  },

  mintTokens: async (amount: number) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      const contract = await blockchainService.getRewardsContract();
      await contract.mintRewardTokens(amount, true);
      await get().getUserStats();
    } catch (error) {
      console.error('Failed to mint tokens:', error);
      throw error;
    }
  },

  transferTokens: async (recipient: string, amount: number) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      const contract = await blockchainService.getRewardsContract();
      await contract.transferTokens(recipient, amount);
      await get().getUserStats();
    } catch (error) {
      console.error('Failed to transfer tokens:', error);
      throw error;
    }
  },

  getTransactionHistory: async () => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      return await blockchainService.getTransactionHistory();
    } catch (error) {
      console.error('Failed to get transaction history:', error);
      throw error;
    }
  },

  getTokenPrice: async () => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      return await blockchainService.getTokenPrice();
    } catch (error) {
      console.error('Failed to get token price:', error);
      throw error;
    }
  },

  stake: async (amount: number, lockPeriod: number) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      const contract = await blockchainService.getRewardsContract();
      await contract.stake(amount, lockPeriod);
      await get().getUserStats();
    } catch (error) {
      console.error('Failed to stake tokens:', error);
      throw error;
    }
  },

  unstake: async (stakeIndex: number) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      const contract = await blockchainService.getRewardsContract();
      await contract.unstake(stakeIndex);
      await get().getUserStats();
    } catch (error) {
      console.error('Failed to unstake tokens:', error);
      throw error;
    }
  },

  claimRewards: async () => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      const contract = await blockchainService.getRewardsContract();
      await contract.claimRewards();
      await get().getUserStats();
    } catch (error) {
      console.error('Failed to claim rewards:', error);
      throw error;
    }
  },

  getStakes: async () => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      const contract = await blockchainService.getRewardsContract();
      const stakes = await contract.getStakes();
      set({ stakes });
    } catch (error) {
      console.error('Failed to get stakes:', error);
      throw error;
    }
  },

  getRewards: async () => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      const contract = await blockchainService.getRewardsContract();
      const rewards = await contract.getRewards();
      set({ rewards });
    } catch (error) {
      console.error('Failed to get rewards:', error);
      throw error;
    }
  },

  registerProduct: async (
    name: string,
    origin: string,
    producer: string,
    batchNumber: string,
    isOrganic: boolean,
    ingredients: string[]
  ) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      return await blockchainService.registerProduct(
        name,
        origin,
        producer,
        batchNumber,
        isOrganic,
        ingredients
      );
    } catch (error) {
      console.error('Failed to register product:', error);
      throw error;
    }
  },

  addQualityCheck: async (
    productId: number,
    inspector: string,
    result: string,
    notes: string
  ) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      await blockchainService.addQualityCheck(
        productId,
        inspector,
        result,
        notes
      );
    } catch (error) {
      console.error('Failed to add quality check:', error);
      throw error;
    }
  },

  updateLogistics: async (
    productId: number,
    location: string,
    handler: string,
    status: string,
    temperature: string
  ) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      await blockchainService.updateLogistics(
        productId,
        location,
        handler,
        status,
        temperature
      );
    } catch (error) {
      console.error('Failed to update logistics:', error);
      throw error;
    }
  },

  getProduct: async (productId: number) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      return await blockchainService.getProduct(productId);
    } catch (error) {
      console.error('Failed to get product:', error);
      throw error;
    }
  },

  getQualityChecks: async (productId: number) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      return await blockchainService.getQualityChecks(productId);
    } catch (error) {
      console.error('Failed to get quality checks:', error);
      throw error;
    }
  },

  getLogisticsRecords: async (productId: number) => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      return await blockchainService.getLogisticsRecords(productId);
    } catch (error) {
      console.error('Failed to get logistics records:', error);
      throw error;
    }
  },

  getAllProducts: async () => {
    if (!get().isInitialized) {
      await get().initialize();
    }
    try {
      return await blockchainService.getAllProducts();
    } catch (error) {
      console.error('Failed to get all products:', error);
      throw error;
    }
  }
}));