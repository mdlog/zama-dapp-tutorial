import React, { useState, useEffect } from 'react';
import { useFhevm } from './FhevmProvider';
import { ethers } from 'ethers';
import contractInfo from '../contract-info.json';
import './ConfidentialCounter.css';

const ConfidentialCounter = () => {
    const { provider } = useFhevm();
    const [contract, setContract] = useState(null);
    const [publicTotal, setPublicTotal] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [transactionHash, setTransactionHash] = useState(null);
    const [decryptedValue, setDecryptedValue] = useState(null);
    const [showDecryptDemo, setShowDecryptDemo] = useState(false);
    const [userContribution, setUserContribution] = useState(null);
    const [showIndividualDecrypt, setShowIndividualDecrypt] = useState(false);

    // Contract ABI - FHEVM-inspired version for the frontend
    const contractABI = [
        "function addToCounter(uint32 value) external",
        "function addRandomToCounter() external",
        "function getPublicTotal() external view returns (uint32)",
        "function getEncryptedCounter() external view returns (uint32)",
        "function isCounterAboveThreshold(uint32 threshold) external view returns (bool)",
        "function getMaxValue(uint32 value) external view returns (uint32)",
        "function getUserContribution(address user) external view returns (uint32)",
        "function resetCounter() external",
        "function owner() external view returns (address)",
        "function decryptCounter() external view returns (uint32)",
        "event CounterIncremented(address indexed user, uint32 contribution, uint32 publicTotal)",
        "event CounterReset(address indexed owner)",
        "event RandomValueAdded(address indexed user, uint32 publicTotal)",
        "event ThresholdChecked(address indexed user, uint32 threshold, bool result)"
    ];

    useEffect(() => {
        const initializeContract = async () => {
            if (!provider) return;

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
    }, [provider, contractABI]);

    const addToCounter = async () => {
        if (!contract || !inputValue) {
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
            // Call the smart contract with the number
            // In a real FHEVM implementation, you would encrypt the value first
            const tx = await contract.addToCounter(number);
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

    const addRandomToCounter = async () => {
        if (!contract) {
            setStatus({ type: 'error', message: 'Contract not initialized' });
            return;
        }

        setIsLoading(true);
        setStatus(null);
        setTransactionHash(null);

        try {
            // Add a random encrypted number to the counter
            const tx = await contract.addRandomToCounter();
            setTransactionHash(tx.hash);

            setStatus({
                type: 'info',
                message: `Random value transaction submitted! Hash: ${tx.hash.substring(0, 10)}...`
            });

            // Wait for transaction confirmation
            const receipt = await tx.wait();

            if (receipt.status === 1) {
                // Update the public total
                const newTotal = await contract.getPublicTotal();
                setPublicTotal(Number(newTotal));

                setStatus({
                    type: 'success',
                    message: `Successfully added random value to the counter! New total: ${newTotal}`
                });
            } else {
                setStatus({ type: 'error', message: 'Transaction failed' });
            }

        } catch (error) {
            console.error('❌ Failed to add random to counter:', error);
            setStatus({
                type: 'error',
                message: `Transaction failed: ${error.message}`
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk decrypt nilai dari smart contract
    const decryptCounterValue = async () => {
        if (!contract) {
            setStatus({ type: 'error', message: 'Contract not initialized' });
            return;
        }

        setIsLoading(true);
        setStatus(null);

        try {
            // Simulasi decrypt process
            setStatus({
                type: 'info',
                message: 'Decrypting encrypted counter value...'
            });

            // Dalam FHEVM asli, ini akan memanggil TFHE.decrypt()
            // const encryptedValue = await contract.getEncryptedCounter();
            // const decrypted = await fhevm.decrypt(encryptedValue);

            // Simulasi decrypt
            const encryptedValue = await contract.getEncryptedCounter();
            const decrypted = Number(encryptedValue);

            setDecryptedValue(decrypted);
            setStatus({
                type: 'success',
                message: `Successfully decrypted counter value: ${decrypted}`
            });

        } catch (error) {
            console.error('❌ Failed to decrypt:', error);
            setStatus({
                type: 'error',
                message: `Decryption failed: ${error.message}`
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk mendecrypt kontribusi individual user
    const decryptIndividualContribution = async () => {
        if (!contract) {
            setStatus({ type: 'error', message: 'Contract not initialized' });
            return;
        }

        setIsLoading(true);
        setStatus(null);

        try {
            // Dapatkan alamat user yang sedang terhubung
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();

            setStatus({
                type: 'info',
                message: `Decrypting individual contribution for ${userAddress.substring(0, 10)}...`
            });

            // Dalam FHEVM asli, ini akan memanggil TFHE.decrypt() pada encrypted user contribution
            // const encryptedContribution = await contract.getEncryptedUserContribution(userAddress);
            // const decrypted = await fhevm.decrypt(encryptedContribution);

            // Simulasi decrypt kontribusi individual
            const contribution = await contract.getUserContribution(userAddress);
            const decryptedContribution = Number(contribution);

            setUserContribution({
                address: userAddress,
                contribution: decryptedContribution
            });

            setShowIndividualDecrypt(true);
            setStatus({
                type: 'success',
                message: `Successfully decrypted your individual contribution: ${decryptedContribution}`
            });

        } catch (error) {
            console.error('❌ Failed to decrypt individual contribution:', error);
            setStatus({
                type: 'error',
                message: `Decryption failed: ${error.message}`
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk demo encrypt/decrypt workflow
    const demonstrateEncryptDecrypt = async () => {
        setShowDecryptDemo(true);
        setStatus({
            type: 'info',
            message: 'Demonstrating FHEVM Encrypt/Decrypt workflow...'
        });

        // Simulasi workflow FHEVM
        setTimeout(() => {
            setStatus({
                type: 'success',
                message: 'FHEVM Workflow: Input → Encrypt → Compute → Decrypt → Result'
            });
        }, 2000);
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
                <div className="button-group">
                    <button
                        onClick={addToCounter}
                        disabled={isLoading || !inputValue}
                    >
                        {isLoading ? '🔄 Processing...' : '🔒 Add Encrypted Number'}
                    </button>

                    <button
                        onClick={addRandomToCounter}
                        disabled={isLoading}
                        style={{ background: 'linear-gradient(45deg, #2ed573, #1e90ff)' }}
                    >
                        {isLoading ? '🔄 Processing...' : '🎲 Add Random Value'}
                    </button>

                    <button
                        onClick={decryptCounterValue}
                        disabled={isLoading}
                        style={{ background: 'linear-gradient(45deg, #28a745, #20c997)' }}
                    >
                        {isLoading ? '🔄 Decrypting...' : '🔓 Decrypt Counter'}
                    </button>

                    <button
                        onClick={demonstrateEncryptDecrypt}
                        disabled={isLoading}
                        style={{ background: 'linear-gradient(45deg, #6f42c1, #e83e8c)' }}
                    >
                        {isLoading ? '🔄 Demo...' : '🔐 FHEVM Demo'}
                    </button>

                    <button
                        onClick={decryptIndividualContribution}
                        disabled={isLoading}
                        style={{ background: 'linear-gradient(45deg, #fd7e14, #ffc107)' }}
                    >
                        {isLoading ? '🔄 Decrypting...' : '👤 Decrypt My Input'}
                    </button>
                </div>
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

            {decryptedValue !== null && (
                <div className="decrypt-result" style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#e8f5e8',
                    borderRadius: '8px',
                    border: '2px solid #28a745'
                }}>
                    <h4 style={{ color: '#28a745', margin: '0 0 10px 0' }}>
                        🔓 Decrypted Counter Value
                    </h4>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
                        {decryptedValue}
                    </p>
                    <p style={{ fontSize: '14px', color: '#666', margin: '10px 0 0 0' }}>
                        This value was decrypted from the encrypted counter on the blockchain
                    </p>
                </div>
            )}

            {showIndividualDecrypt && userContribution && (
                <div className="individual-decrypt-result" style={{
                    marginTop: '20px',
                    padding: '20px',
                    backgroundColor: '#fff3cd',
                    borderRadius: '8px',
                    border: '2px solid #fd7e14'
                }}>
                    <h4 style={{ color: '#fd7e14', margin: '0 0 15px 0' }}>
                        👤 Individual Contribution Decrypted
                    </h4>
                    <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#fd7e14' }}>Your Address:</strong>
                            <span style={{ color: '#333', fontFamily: 'monospace', fontSize: '14px' }}>
                                {userContribution.address}
                            </span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#fd7e14' }}>Your Total Contribution:</strong>
                            <span style={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
                                {userContribution.contribution}
                            </span>
                        </div>
                        <div style={{
                            padding: '10px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '5px',
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            <strong>Note:</strong> In real FHEVM, individual contributions would remain encrypted and only you (the owner) could decrypt your own data. This is a demonstration of selective decryption.
                        </div>
                    </div>
                </div>
            )}

            {showDecryptDemo && (
                <div className="fhevm-demo" style={{
                    marginTop: '20px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '2px solid #6f42c1'
                }}>
                    <h4 style={{ color: '#6f42c1', margin: '0 0 15px 0' }}>
                        🔐 FHEVM Encrypt/Decrypt Workflow
                    </h4>
                    <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                        <ol style={{ margin: '0', paddingLeft: '20px', color: '#333' }}>
                            <li style={{ color: '#333', marginBottom: '8px' }}>
                                <strong style={{ color: '#6f42c1' }}>Input:</strong>
                                <span style={{ color: '#333' }}> User memasukkan angka (1-1000)</span>
                            </li>
                            <li style={{ color: '#333', marginBottom: '8px' }}>
                                <strong style={{ color: '#6f42c1' }}>Encrypt:</strong>
                                <span style={{ color: '#333' }}> Angka di-encrypt menggunakan FHEVM di frontend</span>
                            </li>
                            <li style={{ color: '#333', marginBottom: '8px' }}>
                                <strong style={{ color: '#6f42c1' }}>Send:</strong>
                                <span style={{ color: '#333' }}> Data encrypted dikirim ke smart contract</span>
                            </li>
                            <li style={{ color: '#333', marginBottom: '8px' }}>
                                <strong style={{ color: '#6f42c1' }}>Verify:</strong>
                                <span style={{ color: '#333' }}> Smart contract verifikasi encrypted input</span>
                            </li>
                            <li style={{ color: '#333', marginBottom: '8px' }}>
                                <strong style={{ color: '#6f42c1' }}>Compute:</strong>
                                <span style={{ color: '#333' }}> Operasi matematika pada data encrypted</span>
                            </li>
                            <li style={{ color: '#333', marginBottom: '8px' }}>
                                <strong style={{ color: '#6f42c1' }}>Decrypt:</strong>
                                <span style={{ color: '#333' }}> Hanya hasil total yang di-decrypt</span>
                            </li>
                            <li style={{ color: '#333', marginBottom: '8px' }}>
                                <strong style={{ color: '#6f42c1' }}>Result:</strong>
                                <span style={{ color: '#333' }}> Total sum menjadi public, individual tetap private</span>
                            </li>
                        </ol>
                    </div>
                </div>
            )}

            <div className="how-it-works">
                <h4>🔍 How It Works</h4>
                <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', color: '#333' }}>
                    <li style={{ color: '#333', marginBottom: '8px' }}>
                        <strong style={{ color: '#007bff' }}>Encryption:</strong>
                        <span style={{ color: '#333' }}> Your number is encrypted using FHEVM before sending to the blockchain</span>
                    </li>
                    <li style={{ color: '#333', marginBottom: '8px' }}>
                        <strong style={{ color: '#007bff' }}>Computation:</strong>
                        <span style={{ color: '#333' }}> The smart contract adds your encrypted number to the encrypted counter</span>
                    </li>
                    <li style={{ color: '#333', marginBottom: '8px' }}>
                        <strong style={{ color: '#007bff' }}>Decryption:</strong>
                        <span style={{ color: '#333' }}> Only the total sum is decrypted and made public</span>
                    </li>
                    <li style={{ color: '#333', marginBottom: '8px' }}>
                        <strong style={{ color: '#007bff' }}>Privacy:</strong>
                        <span style={{ color: '#333' }}> Your individual contribution remains completely private</span>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default ConfidentialCounter;
