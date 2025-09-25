import React, { useState, useEffect } from 'react';
import { useFhevm } from './FhevmProvider';

const WalletConnection = ({ onConnect }) => {
    const { provider, isInitialized } = useFhevm();
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);

    const connectWallet = async () => {
        if (!provider) {
            setError('Provider not initialized. Please refresh the page.');
            return;
        }

        setIsConnecting(true);
        setError(null);

        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Get the connected account
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length === 0) {
                throw new Error('No accounts found. Please connect your wallet.');
            }

            const account = accounts[0];

            // Check if we're on the correct network
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const expectedChainId = '0xaa36a7'; // 11155111 in hex (Sepolia)

            if (chainId !== expectedChainId) {
                // Try to switch to Sepolia testnet
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: expectedChainId }],
                    });
                } catch (switchError) {
                    // If the network doesn't exist, add it
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: expectedChainId,
                                chainName: 'Sepolia Testnet',
                                nativeCurrency: {
                                    name: 'ETH',
                                    symbol: 'ETH',
                                    decimals: 18,
                                },
                                rpcUrls: ['https://eth-sepolia.public.blastapi.io'],
                                blockExplorerUrls: ['https://sepolia.etherscan.io'],
                            }],
                        });
                    } else {
                        throw switchError;
                    }
                }
            }

            onConnect(true, account);
            console.log('✅ Wallet connected:', account);

        } catch (error) {
            console.error('❌ Failed to connect wallet:', error);
            setError(error.message);
            onConnect(false, null);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        onConnect(false, null);
        setError(null);
    };

    // Listen for account changes
    useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                if (accounts.length === 0) {
                    onConnect(false, null);
                } else {
                    onConnect(true, accounts[0]);
                }
            };

            const handleChainChanged = () => {
                window.location.reload();
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            };
        }
    }, [onConnect]);

    if (!isInitialized) {
        return (
            <div className="card">
                <h3>🔄 Initializing FHEVM...</h3>
                <p>Please wait while we set up the FHEVM environment.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3>🔗 Connect Your Wallet</h3>
            <p>Connect your MetaMask wallet to interact with the confidential counter.</p>

            {error && (
                <div className="status error">
                    ❌ {error}
                </div>
            )}

            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={connectWallet}
                    disabled={isConnecting}
                >
                    {isConnecting ? '🔄 Connecting...' : '🔗 Connect MetaMask'}
                </button>
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                <p>Make sure you're connected to <strong>Sepolia Testnet</strong></p>
                <p>Chain ID: 11155111</p>
            </div>
        </div>
    );
};

export default WalletConnection;
