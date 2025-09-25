import React, { createContext, useContext, useState, useEffect } from 'react';
import { createInstance, SepoliaConfig } from '@zama-fhe/relayer-sdk';
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
    const [fhevm, setFhevm] = useState(null);
    const [provider, setProvider] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeFhevm = async () => {
            try {
                // Check if MetaMask is installed
                if (typeof window.ethereum === 'undefined') {
                    throw new Error('MetaMask is not installed. Please install MetaMask to use this dApp.');
                }

                // Create ethers provider
                const ethersProvider = new ethers.BrowserProvider(window.ethereum);
                setProvider(ethersProvider);

                // Initialize FHEVM instance using SepoliaConfig
                const fhevmInstance = await createInstance(SepoliaConfig);

                setFhevm(fhevmInstance);
                setIsInitialized(true);

                console.log('✅ FHEVM initialized successfully');
            } catch (error) {
                console.error('❌ Failed to initialize FHEVM:', error);
                setIsInitialized(false);
            }
        };

        initializeFhevm();
    }, []);

    const value = {
        fhevm,
        provider,
        isInitialized,
    };

    return (
        <FhevmContext.Provider value={value}>
            {children}
        </FhevmContext.Provider>
    );
};
