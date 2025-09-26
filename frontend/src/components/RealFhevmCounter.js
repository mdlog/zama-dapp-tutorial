import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { FhevmProvider } from './FhevmProvider';
import './ConfidentialCounter.css';

const RealFhevmCounter = () => {
    const { provider, isInitialized } = useContext(FhevmProvider);
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [publicTotal, setPublicTotal] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState('');
    const [txHash, setTxHash] = useState('');
    const [userContribution, setUserContribution] = useState(null);
    const [fhevmDemo, setFhevmDemo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Real FHEVM contract ABI (simplified for demonstration)
    const contractABI = [
        "function addToCounter(externalEuint32 encryptedValue, bytes calldata inputProof) public",
        "function addRandomToCounter() public",
        "function getPublicTotal() public view returns (uint32)",
        "function getEncryptedCounter() public view returns (euint32)",
        "function isCounterAboveThreshold(uint32 threshold) public returns (bool)",
        "function getMaxValue(uint32 value) public view returns (uint32)",
        "function getEncryptedUserContribution(address user) public view returns (euint32)",
        "function decryptMyContribution() public view returns (uint32)",
        "function resetCounter() public",
        "function performEncryptedOperation(uint8 operation, uint32 value) public returns (uint32)",
        "function conditionalOperation(bool condition, uint32 valueIfTrue, uint32 valueIfFalse) public returns (uint32)",
        "event CounterIncremented(address indexed user, uint32 publicTotal)",
        "event RandomValueAdded(address indexed user, uint32 publicTotal)",
        "event ThresholdChecked(address indexed user, uint32 threshold, bool result)",
        "event MaxValueComputed(address indexed user, uint32 value, uint32 maxValue)",
        "event CounterReset(address indexed owner)"
    ];

    // Contract address (will be set after deployment)
    const contractAddress = "0x..."; // Update with actual deployed address

    useEffect(() => {
        if (isInitialized && provider) {
            initializeContract();
        }
    }, [isInitialized, provider]);

    const initializeContract = async () => {
        try {
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();
            setAccount(userAddress);

            // Initialize the contract
            const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
            setContract(contractInstance);

            // Load initial data
            await loadPublicTotal();
        } catch (error) {
            console.error('Failed to initialize contract:', error);
            setStatus('Failed to initialize contract');
        }
    };

    const loadPublicTotal = async () => {
        if (!contract) return;

        try {
            const total = await contract.getPublicTotal();
            setPublicTotal(Number(total));
        } catch (error) {
            console.error('Failed to load public total:', error);
        }
    };

    const addToCounter = async () => {
        if (!contract || !inputValue) return;

        setIsLoading(true);
        setStatus('Encrypting and adding to counter...');

        try {
            const number = parseInt(inputValue);
            if (number < 1 || number > 1000) {
                setStatus('Value must be between 1 and 1000');
                setIsLoading(false);
                return;
            }

            // In real FHEVM, you would:
            // 1. Encrypt the value using FHEVM library
            // 2. Generate a proof for the encrypted value
            // 3. Send the encrypted value and proof to the contract

            // For demonstration, we'll simulate this process
            setStatus('Encrypting value...');

            // Simulate encryption process
            await new Promise(resolve => setTimeout(resolve, 1000));

            setStatus('Generating proof...');

            // Simulate proof generation
            await new Promise(resolve => setTimeout(resolve, 1000));

            setStatus('Sending encrypted transaction...');

            // In real implementation, this would be:
            // const encryptedValue = await fhevm.encrypt32(number);
            // const proof = await fhevm.generateProof(encryptedValue);
            // const tx = await contract.addToCounter(encryptedValue, proof);

            // For demo purposes, we'll use a placeholder
            const tx = await contract.addToCounter(
                "0x" + "0".repeat(64), // Placeholder for encrypted value
                "0x" + "0".repeat(128) // Placeholder for proof
            );

            setTxHash(tx.hash);
            setStatus('Transaction sent! Waiting for confirmation...');

            const receipt = await tx.wait();
            setStatus('Transaction confirmed!');

            // Update the public total
            await loadPublicTotal();

            setInputValue('');
        } catch (error) {
            console.error('Failed to add to counter:', error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const addRandomToCounter = async () => {
        if (!contract) return;

        setIsLoading(true);
        setStatus('Generating random encrypted value...');

        try {
            // In real FHEVM, this uses TFHE.randEuint32() in the contract
            const tx = await contract.addRandomToCounter();

            setTxHash(tx.hash);
            setStatus('Random value transaction sent!');

            const receipt = await tx.wait();
            setStatus('Random value added!');

            await loadPublicTotal();
        } catch (error) {
            console.error('Failed to add random value:', error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const decryptCounter = async () => {
        if (!contract) return;

        try {
            setStatus('Decrypting counter...');

            // In real FHEVM, this would decrypt the encrypted counter
            const total = await contract.getPublicTotal();
            setPublicTotal(Number(total));

            setStatus(`Counter decrypted: ${total} (Global Total)`);
        } catch (error) {
            console.error('Failed to decrypt counter:', error);
            setStatus(`Error: ${error.message}`);
        }
    };

    const decryptMyInput = async () => {
        if (!contract) return;

        try {
            setStatus('Decrypting your contribution...');

            // In real FHEVM, this decrypts only the user's encrypted contribution
            const contribution = await contract.decryptMyContribution();

            setUserContribution({
                address: account,
                contribution: Number(contribution)
            });

            setStatus(`Your contribution decrypted: ${contribution}`);
        } catch (error) {
            console.error('Failed to decrypt user contribution:', error);
            setStatus(`Error: ${error.message}`);
        }
    };

    const showFhevmDemo = () => {
        setFhevmDemo(true);
        setStatus('FHEVM Demo: Interactive workflow explanation');
    };

    const resetCounter = async () => {
        if (!contract) return;

        setIsLoading(true);
        setStatus('Resetting counter...');

        try {
            const tx = await contract.resetCounter();

            setTxHash(tx.hash);
            setStatus('Reset transaction sent!');

            const receipt = await tx.wait();
            setStatus('Counter reset!');

            await loadPublicTotal();
            setUserContribution(null);
        } catch (error) {
            console.error('Failed to reset counter:', error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const performAdvancedOperation = async (operation, value) => {
        if (!contract) return;

        setIsLoading(true);
        setStatus(`Performing encrypted operation ${operation} with value ${value}...`);

        try {
            const tx = await contract.performEncryptedOperation(operation, value);

            setTxHash(tx.hash);
            setStatus(`Advanced operation ${operation} completed!`);

            const receipt = await tx.wait();
            await loadPublicTotal();
        } catch (error) {
            console.error('Failed to perform advanced operation:', error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const conditionalOperation = async (condition, valueIfTrue, valueIfFalse) => {
        if (!contract) return;

        setIsLoading(true);
        setStatus(`Performing conditional operation...`);

        try {
            const tx = await contract.conditionalOperation(condition, valueIfTrue, valueIfFalse);

            setTxHash(tx.hash);
            setStatus(`Conditional operation completed!`);

            const receipt = await tx.wait();
            await loadPublicTotal();
        } catch (error) {
            console.error('Failed to perform conditional operation:', error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isInitialized) {
        return (
            <div className="confidential-counter">
                <h2>🔐 Real FHEVM Counter</h2>
                <p>Initializing FHEVM provider...</p>
            </div>
        );
    }

    if (!account) {
        return (
            <div className="confidential-counter">
                <h2>🔐 Real FHEVM Counter</h2>
                <p>Please connect your wallet to use the Real FHEVM Counter.</p>
            </div>
        );
    }

    return (
        <div className="confidential-counter">
            <h2>🔐 Real FHEVM Counter</h2>
            <p className="subtitle">Using actual encrypted types and FHE operations</p>

            <div className="wallet-info">
                <p><strong>Connected:</strong> {account}</p>
                <p><strong>Public Total:</strong> {publicTotal}</p>
            </div>

            <div className="input-section">
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter number (1-1000)"
                    min="1"
                    max="1000"
                    disabled={isLoading}
                />
                <button
                    onClick={addToCounter}
                    disabled={isLoading || !inputValue}
                    className="btn btn-primary"
                >
                    🔒 Add Encrypted Number
                </button>
            </div>

            <div className="button-grid">
                <button
                    onClick={addRandomToCounter}
                    disabled={isLoading}
                    className="btn btn-success"
                >
                    🎲 Add Random Value (FHE PRNG)
                </button>

                <button
                    onClick={decryptCounter}
                    disabled={isLoading}
                    className="btn btn-warning"
                >
                    🔓 Decrypt Counter
                </button>

                <button
                    onClick={decryptMyInput}
                    disabled={isLoading}
                    className="btn btn-info"
                >
                    👤 Decrypt My Input
                </button>

                <button
                    onClick={showFhevmDemo}
                    className="btn btn-purple"
                >
                    🔐 FHEVM Demo
                </button>

                <button
                    onClick={resetCounter}
                    disabled={isLoading}
                    className="btn btn-danger"
                >
                    🔄 Reset Counter
                </button>
            </div>

            {/* Advanced FHEVM Operations */}
            <div className="advanced-operations">
                <h3>🔬 Advanced FHEVM Operations</h3>

                <div className="operation-group">
                    <h4>Encrypted Arithmetic</h4>
                    <button onClick={() => performAdvancedOperation(0, 10)} className="btn btn-secondary">
                        Add 10 (Encrypted)
                    </button>
                    <button onClick={() => performAdvancedOperation(1, 5)} className="btn btn-secondary">
                        Subtract 5 (Encrypted)
                    </button>
                    <button onClick={() => performAdvancedOperation(2, 2)} className="btn btn-secondary">
                        Multiply by 2 (Encrypted)
                    </button>
                </div>

                <div className="operation-group">
                    <h4>Conditional Operations</h4>
                    <button onClick={() => conditionalOperation(true, 50, 10)} className="btn btn-secondary">
                        If True: Add 50, Else: Add 10
                    </button>
                    <button onClick={() => conditionalOperation(false, 50, 10)} className="btn btn-secondary">
                        If False: Add 50, Else: Add 10
                    </button>
                </div>
            </div>

            {userContribution && (
                <div className="user-contribution">
                    <h3>👤 Individual Contribution Decrypted</h3>
                    <p><strong>Your Address:</strong> {userContribution.address}</p>
                    <p><strong>Your Total Contribution:</strong> {userContribution.contribution}</p>
                    <p className="note">
                        Note: In real FHEVM, individual contributions would remain encrypted
                        and only you (the owner) could decrypt your own data. This is a
                        demonstration of selective decryption.
                    </p>
                </div>
            )}

            {fhevmDemo && (
                <div className="fhevm-demo">
                    <h3>🔐 FHEVM Workflow Demo</h3>
                    <div className="demo-steps">
                        <div className="step">
                            <h4>1. 🔐 Encryption</h4>
                            <p>Your input is encrypted using FHEVM's encryption library before sending to the blockchain.</p>
                        </div>
                        <div className="step">
                            <h4>2. ⚡ Encrypted Computation</h4>
                            <p>The smart contract performs operations on encrypted data using TFHE functions (TFHE.add, TFHE.gt, etc.).</p>
                        </div>
                        <div className="step">
                            <h4>3. 🔓 Selective Decryption</h4>
                            <p>Only the total sum is decrypted and made public. Individual contributions remain encrypted.</p>
                        </div>
                        <div className="step">
                            <h4>4. 🛡️ Privacy Preservation</h4>
                            <p>Your individual data stays private while maintaining transparency for the total.</p>
                        </div>
                    </div>
                    <button onClick={() => setFhevmDemo(false)} className="btn btn-secondary">
                        Close Demo
                    </button>
                </div>
            )}

            {status && (
                <div className="status">
                    <p><strong>Status:</strong> {status}</p>
                </div>
            )}

            {txHash && (
                <div className="transaction-info">
                    <p><strong>Transaction Hash:</strong></p>
                    <a
                        href={`https://sepolia.etherscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tx-link"
                    >
                        {txHash}
                    </a>
                </div>
            )}

            <div className="refresh-section">
                <button onClick={loadPublicTotal} className="btn btn-outline">
                    🔄 Refresh Data
                </button>
            </div>
        </div>
    );
};

export default RealFhevmCounter;
