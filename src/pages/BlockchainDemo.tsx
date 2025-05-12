import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useBlockchainStore } from '../store/useBlockchainStore';
import { Wallet, ArrowRight, Clock, CheckCircle, Loader2, Shield, Coins, ArrowUpRight, BarChart3, History } from 'lucide-react';
import toast from 'react-hot-toast';

export const BlockchainDemo: React.FC = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { 
    initialize, 
    createOrder, 
    payOrder, 
    verifyOrder, 
    tokenBalance, 
    sustainableOrders, 
    totalOrders,
    mintTokens,
    transferTokens,
    getTransactionHistory,
    getTokenPrice
  } = useBlockchainStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  const [tokenPrice, setTokenPrice] = useState<number>(0);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    initialize();
    loadTokenPrice();
    loadTransactionHistory();
  }, [isLoggedIn, navigate, initialize]);

  const loadTokenPrice = async () => {
    const price = await getTokenPrice();
    setTokenPrice(price);
  };

  const loadTransactionHistory = async () => {
    const history = await getTransactionHistory();
    setTransactionHistory(history);
  };

  const handleTransaction = async () => {
    setIsProcessing(true);
    try {
      // Step 1: Create Order
      setCurrentStep(1);
      const newOrderId = await createOrder('0xRestaurantAddress', 0.1);
      setOrderId(newOrderId);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 2: Pay Order
      setCurrentStep(2);
      await payOrder(newOrderId, 0.1);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 3: Verify Order
      setCurrentStep(3);
      await verifyOrder(newOrderId);
      
      toast.success('Blockchain transaction completed successfully!');
      loadTransactionHistory(); // Refresh transaction history
    } catch (error) {
      console.error('Transaction failed:', error);
      toast.error('Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMintTokens = async () => {
    try {
      setIsProcessing(true);
      await mintTokens(10); // Mint 10 tokens
      toast.success('Tokens minted successfully!');
      loadTransactionHistory();
    } catch (error) {
      toast.error('Failed to mint tokens');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTransferTokens = async () => {
    if (!transferAmount || !recipientAddress) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsProcessing(true);
      await transferTokens(recipientAddress, parseFloat(transferAmount));
      toast.success('Tokens transferred successfully!');
      setShowTransferModal(false);
      loadTransactionHistory();
    } catch (error) {
      toast.error('Failed to transfer tokens');
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { title: 'Initialize', description: 'Connect to blockchain network' },
    { title: 'Create Order', description: 'Create a new order on the blockchain' },
    { title: 'Process Payment', description: 'Process payment transaction' },
    { title: 'Verify Order', description: 'Verify order on the blockchain' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-8 mb-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Blockchain Integration</h1>
          <p className="text-lg mb-6">
            Experience how blockchain technology powers our food delivery platform.
            This is a demonstration using simulated blockchain transactions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Wallet className="text-white" size={24} />
                <div>
                  <p className="text-sm">Token Balance</p>
                  <p className="text-xl font-bold">{tokenBalance}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Shield className="text-white" size={24} />
                <div>
                  <p className="text-sm">Sustainable Orders</p>
                  <p className="text-xl font-bold">{sustainableOrders}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="text-white" size={24} />
                <div>
                  <p className="text-sm">Total Orders</p>
                  <p className="text-xl font-bold">{totalOrders}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Coins className="text-white" size={24} />
                <div>
                  <p className="text-sm">Token Price</p>
                  <p className="text-xl font-bold">${tokenPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Token Management Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Token Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={handleMintTokens}
            disabled={isProcessing}
            className="p-6 border border-green-200 rounded-lg hover:border-green-500 transition-colors flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg mb-2">Mint Tokens</h3>
              <p className="text-gray-600">Create new tokens through sustainable actions</p>
            </div>
            <Coins className="text-green-500" size={24} />
          </button>

          <button
            onClick={() => setShowTransferModal(true)}
            className="p-6 border border-blue-200 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg mb-2">Transfer Tokens</h3>
              <p className="text-gray-600">Send tokens to another wallet</p>
            </div>
            <ArrowUpRight className="text-blue-500" size={24} />
          </button>
        </div>
      </div>

      {/* Transaction Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">New Transaction</h2>
        
        {/* Steps Progress */}
        <div className="mb-8">
          <div className="relative">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => {
                const isCompleted = currentStep > index;
                const isCurrent = currentStep === index;
                
                return (
                  <div
                    key={step.title}
                    className={`flex flex-col items-center ${
                      isCompleted ? 'text-green-500' : isCurrent ? 'text-blue-500' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-100'
                          : isCurrent
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : isCurrent && isProcessing ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <ArrowRight size={20} />
                      )}
                    </div>
                    <span className="text-xs mt-1">{step.title}</span>
                  </div>
                );
              })}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Step Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-2">{steps[currentStep].title}</h3>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleTransaction}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Processing Transaction...</span>
            </>
          ) : (
            <>
              <Wallet size={20} />
              <span>Start Transaction</span>
            </>
          )}
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Transaction History</h2>
          <button
            onClick={loadTransactionHistory}
            className="text-blue-500 hover:text-blue-600"
          >
            <History size={20} />
          </button>
        </div>
        <div className="space-y-4">
          {transactionHistory.map((tx, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{tx.type}</p>
                <p className="text-sm text-gray-500">{tx.timestamp}</p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} tokens
                </p>
                <p className="text-xs text-gray-500">Hash: {tx.hash}</p>
              </div>
            </div>
          ))}
          {transactionHistory.length === 0 && (
            <p className="text-center text-gray-500 py-4">No transactions yet</p>
          )}
        </div>
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Transfer Tokens</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0x..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransferTokens}
                  disabled={isProcessing}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Transfer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};