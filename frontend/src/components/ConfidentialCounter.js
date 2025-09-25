import React, { useState, useEffect } from 'react';
import { useFhevm } from './FhevmProvider';
import { ethers } from 'ethers';
import contractInfo from '../contract-info.json';
import './ConfidentialCounter.css';

const ConfidentialCounter = () => {
    const { fhevm, provider } = useFhevm();
    const [contract, setContract] = useState(null);
    const [publicTotal, setPublicTotal] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [transactionHash, setTransactionHash] = useState(null);

    // Contract ABI - simplified version for the frontend
    const contractABI = [
        "function addToCounter(bytes calldata encryptedValue) external",
        "function getPublicTotal() external view returns (uint32)",
        "function resetCounter() external",
        "function owner() external view returns (address)",
        "event CounterIncremented(address indexed user, uint32 publicTotal)",
        "event CounterReset(address indexed owner)"
    ];

    useEffect(() => {
        const initializeContract = async () => {
            if (!provider || !fhevm) return;

            try {
                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(
                    contractInfo.contractAddress,
                    contractABI,
                    signer
                );

                setContract(contractInstance);

                // Load initial public total
                const total = await contractInstance.getPublicTotal();
                setPublicTotal(Number(total));

                console.log('✅ Contract initialized');
            } catch (error) {
                console.error('❌ Failed to initialize contract:', error);
                setStatus({ type: 'error', message: 'Failed to initialize contract' });
            }
        };

        initializeContract();
    }, [provider, fhevm]);

    const addToCounter = async () => {
        if (!contract || !fhevm || !inputValue) {
            setStatus({ type: 'error', message: 'Please enter a number to add' });
            return;
        }

        const number = parseInt(inputValue);
        if (isNaN(number) || number < 1 || number > 1000) {
            setStatus({ type: 'error', message: 'Please enter a number between 1 and 1000' });
            return;
        }

        setIsLoading(true);
        setStatus(null);
        setTransactionHash(null);

        try {
            // Encrypt the number using FHEVM
            const encryptedValue = fhevm.encrypt32(number);

            // Call the smart contract
            const tx = await contract.addToCounter(encryptedValue);
            setTransactionHash(tx.hash);

            setStatus({
                type: 'info',
                message: `Transaction submitted! Hash: ${tx.hash.substring(0, 10)}...`
            });

            // Wait for transaction confirmation
            const receipt = await tx.wait();

            if (receipt.status === 1) {
                // Update the public total
                const newTotal = await contract.getPublicTotal();
                setPublicTotal(Number(newTotal));

                setStatus({
                    type: 'success',
                    message: `Successfully added ${number} to the counter! New total: ${newTotal}`
                });

                // Clear the input
                setInputValue('');
            } else {
                setStatus({ type: 'error', message: 'Transaction failed' });
            }

        } catch (error) {
            console.error('❌ Failed to add to counter:', error);
            setStatus({
                type: 'error',
                message: `Transaction failed: ${error.message}`
            });
        } finally {
            setIsLoading(false);
        }
    };

    const resetCounter = async () => {
        if (!contract) return;

        setIsLoading(true);
        setStatus(null);

        try {
            const tx = await contract.resetCounter();
            setTransactionHash(tx.hash);

            setStatus({
                type: 'info',
                message: `Reset transaction submitted! Hash: ${tx.hash.substring(0, 10)}...`
            });

            const receipt = await tx.wait();

            if (receipt.status === 1) {
                setPublicTotal(0);
                setStatus({
                    type: 'success',
                    message: 'Counter reset successfully!'
                });
            } else {
                setStatus({ type: 'error', message: 'Reset transaction failed' });
            }

        } catch (error) {
            console.error('❌ Failed to reset counter:', error);
            setStatus({
                type: 'error',
                message: `Reset failed: ${error.message}`
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!contract) {
        return (
            <div className="card">
                <h3>🔄 Loading Contract...</h3>
                <p>Please wait while we connect to the smart contract.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3>🔐 Confidential Counter</h3>
            <p>Add encrypted numbers to the counter. Your individual contributions remain private!</p>

            <div className="counter-display">
                <h2>Public Total: {publicTotal}</h2>
                <p className="counter-description">
                    This is the sum of all encrypted contributions. Individual values remain confidential.
                </p>
            </div>

            <div className="input-section">
                <input
                    type="number"
                    placeholder="Enter a number (1-1000)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    min="1"
                    max="1000"
                    disabled={isLoading}
                />
                <button
                    onClick={addToCounter}
                    disabled={isLoading || !inputValue}
                >
                    {isLoading ? '🔄 Processing...' : '🔒 Add Encrypted Number'}
                </button>
            </div>

            <div className="reset-section">
                <button
                    onClick={resetCounter}
                    disabled={isLoading}
                    style={{ background: 'linear-gradient(45deg, #ff4757, #c44569)' }}
                >
                    {isLoading ? '🔄 Resetting...' : '🔄 Reset Counter'}
                </button>
            </div>

            {status && (
                <div className={`status ${status.type}`}>
                    {status.type === 'success' && '✅ '}
                    {status.type === 'error' && '❌ '}
                    {status.type === 'info' && 'ℹ️ '}
                    {status.message}
                </div>
            )}

            {transactionHash && (
                <div className="transaction-info">
                    <p><strong>Transaction Hash:</strong></p>
                    <p style={{
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        wordBreak: 'break-all',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '0.5rem',
                        borderRadius: '5px'
                    }}>
                        {transactionHash}
                    </p>
                    <p>
                        <a
                            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#ffd700' }}
                        >
                            View on Etherscan →
                        </a>
                    </p>
                </div>
            )}

            <div className="how-it-works">
                <h4>🔍 How It Works</h4>
                <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                    <li><strong>Encryption:</strong> Your number is encrypted using FHEVM before sending to the blockchain</li>
                    <li><strong>Computation:</strong> The smart contract adds your encrypted number to the encrypted counter</li>
                    <li><strong>Decryption:</strong> Only the total sum is decrypted and made public</li>
                    <li><strong>Privacy:</strong> Your individual contribution remains completely private</li>
                </ol>
            </div>
        </div>
    );
};

export default ConfidentialCounter;
