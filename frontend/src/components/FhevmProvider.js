import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const FhevmContext = createContext();

export const useFhevm = () => {
    const context = useContext(FhevmContext);
    if (!context) {
        throw new Error('useFhevm must be used within a FhevmProvider');
    }
    return context;
};

export const FhevmProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeProvider = async () => {
      try {
        // Check if MetaMask is installed
        if (typeof window.ethereum === 'undefined') {
          throw new Error('MetaMask is not installed. Please install MetaMask to use this dApp.');
        }

        // Create ethers provider
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(ethersProvider);
        setIsInitialized(true);
        
        console.log('✅ Provider initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize provider:', error);
        setIsInitialized(false);
      }
    };

    initializeProvider();
  }, []);

  const value = {
    provider,
    isInitialized,
  };

  return (
    <FhevmContext.Provider value={value}>
      {children}
    </FhevmContext.Provider>
  );
};
