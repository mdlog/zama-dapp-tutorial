import React, { useState, useEffect } from 'react';
import './App.css';
import { FhevmProvider } from './components/FhevmProvider';
import WalletConnection from './components/WalletConnection';
import ConfidentialCounter from './components/ConfidentialCounter';

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState(null);

    return (
        <FhevmProvider>
            <div className="App">
                <header className="App-header">
                    <h1>🔐 Hello FHEVM</h1>
                    <p>Your first confidential dApp - Confidential Counter</p>
                </header>

                <main className="App-main">
                    <WalletConnection
                        onConnect={(connected, account) => {
                            setIsConnected(connected);
                            setAccount(account);
                        }}
                    />

                    {isConnected && (
                        <div className="connected-section">
                            <div className="account-info">
                                <p>✅ Connected: {account}</p>
                            </div>
                            <ConfidentialCounter />
                        </div>
                    )}

                    {!isConnected && (
                        <div className="welcome-section">
                            <h2>Welcome to FHEVM!</h2>
                            <p>This tutorial demonstrates how to build your first confidential dApp using FHEVM.</p>
                            <div className="features">
                                <div className="feature">
                                    <h3>🔒 Confidential Computation</h3>
                                    <p>Add encrypted numbers to a counter without revealing individual values</p>
                                </div>
                                <div className="feature">
                                    <h3>🌐 Public Transparency</h3>
                                    <p>View the total sum while keeping individual contributions private</p>
                                </div>
                                <div className="feature">
                                    <h3>⚡ Real-time Updates</h3>
                                    <p>See your encrypted transactions update the public total instantly</p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                <footer className="App-footer">
                    <p>Built for Zama Bounty Program Season 10</p>
                    <p>Learn more about FHEVM at <a href="https://docs.zama.ai" target="_blank" rel="noopener noreferrer">docs.zama.ai</a></p>
                </footer>
            </div>
        </FhevmProvider>
    );
}

export default App;
