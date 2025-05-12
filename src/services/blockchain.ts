import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

// Mock blockchain data store
const mockBlockchain = {
  orders: new Map<number, any>(),
  orderCount: 0,
  userBalances: new Map<string, number>(),
  userStats: new Map<string, { 
    tokenBalance: number, 
    totalOrders: number, 
    sustainableOrders: number,
    stakes: Array<{
      amount: number,
      timestamp: number,
      lockPeriod: number,
      isActive: boolean
    }>,
    rewards: number
  }>(),
  transactions: [] as any[],
  tokenPrice: 1.25, // Mock token price in USD
  products: new Map<number, any>(),
  productCount: 0
};

export class BlockchainService {
  private isInitialized = false;
  private currentUser = 'demo_user'; // Mock user address

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      // Initialize mock user data if not exists
      if (!mockBlockchain.userStats.has(this.currentUser)) {
        mockBlockchain.userStats.set(this.currentUser, {
          tokenBalance: 100,
          totalOrders: 5,
          sustainableOrders: 3,
          stakes: [],
          rewards: 0
        });
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize blockchain service:', error);
      throw error;
    }
  }

  async createOrder(restaurantAddress: string, amount: number): Promise<number> {
    await this.ensureInitialized();
    
    try {
      // Simulate blockchain transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const orderId = ++mockBlockchain.orderCount;
      mockBlockchain.orders.set(orderId, {
        customer: this.currentUser,
        restaurant: restaurantAddress,
        amount,
        isPaid: false,
        isVerified: false,
        isDelivered: false,
        timestamp: Date.now()
      });

      this.addTransaction('Create Order', amount, true);

      return orderId;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  }

  async payOrder(orderId: number, amount: number) {
    await this.ensureInitialized();
    
    try {
      // Simulate blockchain transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const order = mockBlockchain.orders.get(orderId);
      if (!order) throw new Error('Order not found');
      
      order.isPaid = true;
      mockBlockchain.orders.set(orderId, order);

      // Update user stats
      const stats = mockBlockchain.userStats.get(this.currentUser)!;
      stats.totalOrders++;
      if (Math.random() > 0.5) stats.sustainableOrders++; // Randomly mark orders as sustainable
      mockBlockchain.userStats.set(this.currentUser, stats);

      this.addTransaction('Pay Order', -amount, true);
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    }
  }

  async verifyOrder(orderId: number) {
    await this.ensureInitialized();
    
    try {
      // Simulate blockchain transaction delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const order = mockBlockchain.orders.get(orderId);
      if (!order) throw new Error('Order not found');
      
      order.isVerified = true;
      mockBlockchain.orders.set(orderId, order);

      // Mint reward tokens for verified orders
      const stats = mockBlockchain.userStats.get(this.currentUser)!;
      const rewardAmount = 10;
      stats.tokenBalance += rewardAmount;
      mockBlockchain.userStats.set(this.currentUser, stats);

      this.addTransaction('Reward Tokens', rewardAmount, true);
    } catch (error) {
      console.error('Order verification failed:', error);
      throw error;
    }
  }

  async getRewardsContract() {
    await this.ensureInitialized();
    
    return {
      mintRewardTokens: async (amount: number, isSustainable: boolean) => {
        const stats = mockBlockchain.userStats.get(this.currentUser)!;
        stats.tokenBalance += amount;
        if (isSustainable) stats.sustainableOrders++;
        mockBlockchain.userStats.set(this.currentUser, stats);
        this.addTransaction('Mint Tokens', amount, true);
        return stats;
      },
      transferTokens: async (recipient: string, amount: number) => {
        const stats = mockBlockchain.userStats.get(this.currentUser)!;
        if (stats.tokenBalance < amount) throw new Error('Insufficient tokens');
        stats.tokenBalance -= amount;
        mockBlockchain.userStats.set(this.currentUser, stats);
        this.addTransaction('Transfer Tokens', -amount, true);
        return stats;
      },
      getUserStats: async () => {
        const stats = mockBlockchain.userStats.get(this.currentUser) || {
          tokenBalance: 0,
          totalOrders: 0,
          sustainableOrders: 0,
          stakes: [],
          rewards: 0
        };
        return [stats.tokenBalance, stats.totalOrders, stats.sustainableOrders];
      },
      stake: async (amount: number, lockPeriod: number) => {
        const stats = mockBlockchain.userStats.get(this.currentUser)!;
        if (stats.tokenBalance < amount) throw new Error('Insufficient tokens');
        
        stats.tokenBalance -= amount;
        stats.stakes.push({
          amount,
          timestamp: Date.now(),
          lockPeriod,
          isActive: true
        });
        
        mockBlockchain.userStats.set(this.currentUser, stats);
        this.addTransaction('Stake Tokens', -amount, true);
        return stats;
      },
      unstake: async (stakeIndex: number) => {
        const stats = mockBlockchain.userStats.get(this.currentUser)!;
        const stake = stats.stakes[stakeIndex];
        
        if (!stake || !stake.isActive) throw new Error('Invalid stake');
        if (Date.now() < stake.timestamp + stake.lockPeriod) {
          throw new Error('Lock period not ended');
        }
        
        const reward = this.calculateStakingReward(stake);
        stake.isActive = false;
        stats.tokenBalance += stake.amount;
        stats.rewards += reward;
        
        mockBlockchain.userStats.set(this.currentUser, stats);
        this.addTransaction('Unstake Tokens', stake.amount + reward, true);
        return stats;
      },
      claimRewards: async () => {
        const stats = mockBlockchain.userStats.get(this.currentUser)!;
        if (stats.rewards <= 0) throw new Error('No rewards to claim');
        
        const reward = stats.rewards;
        stats.rewards = 0;
        stats.tokenBalance += reward;
        
        mockBlockchain.userStats.set(this.currentUser, stats);
        this.addTransaction('Claim Rewards', reward, true);
        return stats;
      },
      getStakes: async () => {
        const stats = mockBlockchain.userStats.get(this.currentUser)!;
        return stats.stakes.filter(stake => stake.isActive);
      },
      getRewards: async () => {
        const stats = mockBlockchain.userStats.get(this.currentUser)!;
        return stats.rewards;
      }
    };
  }

  async getTransactionHistory() {
    await this.ensureInitialized();
    return mockBlockchain.transactions;
  }

  async getTokenPrice() {
    await this.ensureInitialized();
    // Simulate small price fluctuations
    const fluctuation = (Math.random() - 0.5) * 0.1; // ±5% fluctuation
    return mockBlockchain.tokenPrice * (1 + fluctuation);
  }

  async registerProduct(
    name: string,
    origin: string,
    producer: string,
    batchNumber: string,
    isOrganic: boolean,
    ingredients: string[]
  ) {
    await this.ensureInitialized();
    
    try {
      const productId = ++mockBlockchain.productCount;
      const product = {
        id: productId,
        name,
        origin,
        productionDate: Date.now(),
        producer,
        batchNumber,
        isOrganic,
        ingredients,
        qualityChecks: [],
        logisticsRecords: [],
        isActive: true
      };

      mockBlockchain.products.set(productId, product);
      this.addTransaction('Register Product', 0, true);

      return productId;
    } catch (error) {
      console.error('Failed to register product:', error);
      throw error;
    }
  }

  async addQualityCheck(
    productId: number,
    inspector: string,
    result: string,
    notes: string
  ) {
    await this.ensureInitialized();
    
    try {
      const product = mockBlockchain.products.get(productId);
      if (!product) throw new Error('Product not found');

      const qualityCheck = {
        timestamp: Date.now(),
        inspector,
        result,
        notes
      };

      product.qualityChecks.push(qualityCheck);
      mockBlockchain.products.set(productId, product);
      this.addTransaction('Add Quality Check', 0, true);

      return qualityCheck;
    } catch (error) {
      console.error('Failed to add quality check:', error);
      throw error;
    }
  }

  async updateLogistics(
    productId: number,
    location: string,
    handler: string,
    status: string,
    temperature: string
  ) {
    await this.ensureInitialized();
    
    try {
      const product = mockBlockchain.products.get(productId);
      if (!product) throw new Error('Product not found');

      const logisticsRecord = {
        timestamp: Date.now(),
        location,
        handler,
        status,
        temperature
      };

      product.logisticsRecords.push(logisticsRecord);
      mockBlockchain.products.set(productId, product);
      this.addTransaction('Update Logistics', 0, true);

      return logisticsRecord;
    } catch (error) {
      console.error('Failed to update logistics:', error);
      throw error;
    }
  }

  async getProduct(productId: number) {
    await this.ensureInitialized();
    
    try {
      const product = mockBlockchain.products.get(productId);
      if (!product) throw new Error('Product not found');
      return product;
    } catch (error) {
      console.error('Failed to get product:', error);
      throw error;
    }
  }

  async getQualityChecks(productId: number) {
    await this.ensureInitialized();
    
    try {
      const product = mockBlockchain.products.get(productId);
      if (!product) throw new Error('Product not found');
      return product.qualityChecks;
    } catch (error) {
      console.error('Failed to get quality checks:', error);
      throw error;
    }
  }

  async getLogisticsRecords(productId: number) {
    await this.ensureInitialized();
    
    try {
      const product = mockBlockchain.products.get(productId);
      if (!product) throw new Error('Product not found');
      return product.logisticsRecords;
    } catch (error) {
      console.error('Failed to get logistics records:', error);
      throw error;
    }
  }

  async getAllProducts() {
    await this.ensureInitialized();
    
    try {
      return Array.from(mockBlockchain.products.values());
    } catch (error) {
      console.error('Failed to get all products:', error);
      throw error;
    }
  }

  private calculateStakingReward(stake: { amount: number; lockPeriod: number }) {
    const REWARD_RATE = 0.1; // 10% APY
    const yearInMs = 365 * 24 * 60 * 60 * 1000;
    const stakingDuration = stake.lockPeriod;
    const annualReward = stake.amount * REWARD_RATE;
    return Math.floor((annualReward * stakingDuration) / yearInMs);
  }

  private addTransaction(type: string, amount: number, success: boolean) {
    const transaction = {
      type,
      amount,
      timestamp: new Date().toLocaleString(),
      hash: '0x' + Math.random().toString(36).substring(2, 15),
      status: success ? 'success' : 'failed',
      from: this.currentUser,
      to: 'contract',
      gas: Math.floor(Math.random() * 1000000)
    };
    mockBlockchain.transactions.unshift(transaction);
    // Keep only last 10 transactions
    if (mockBlockchain.transactions.length > 10) {
      mockBlockchain.transactions.pop();
    }
  }

  private async ensureInitialized() {
    if (!this.isInitialized) {
      await this.initialize();
    }
  }
}

export const blockchainService = new BlockchainService();