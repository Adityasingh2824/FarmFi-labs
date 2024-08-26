// src/services/ProfileService.js

const ProfileService = {
    getFarmerProfile: async (farmerId) => {
      // Simulate an API call to fetch farmer profile data
      return {
        id: farmerId,
        name: 'John Doe',
        email: 'john@example.com',
        tokenizedCrops: [
          { cropName: 'Soybean', quantity: 1000, tokenSymbol: 'SOY' },
          { cropName: 'Corn', quantity: 500, tokenSymbol: 'CORN' },
        ],
        transactions: [
          { id: 1, type: 'Buy', amount: 100, date: '2024-08-10' },
          { id: 2, type: 'Stake', amount: 50, date: '2024-08-15' },
        ],
      };
    },
  
    getMerchantProfile: async (merchantId) => {
      // Simulate an API call to fetch merchant profile data
      return {
        id: merchantId,
        name: 'Jane Smith',
        email: 'jane@example.com',
        tokenizedAssets: [
          { cropName: 'Wheat', quantity: 2000, tokenSymbol: 'WHT' },
          { cropName: 'Barley', quantity: 800, tokenSymbol: 'BAR' },
        ],
        transactions: [
          { id: 1, type: 'Sell', amount: 200, date: '2024-08-12' },
          { id: 2, type: 'Lend', amount: 100, date: '2024-08-20' },
        ],
      };
    },
  };
  
  export default ProfileService;
  