`# 🔐 Hello FHEVM - Your First Confidential dApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FHEVM](https://img.shields.io/badge/FHEVM-v0.1.0-blue.svg)](https://github.com/fhenixprotocol/fhevm)
[![Zama Protocol](https://img.shields.io/badge/Zama-Protocol-green.svg)](https://www.zama.ai/)

> **The most beginner-friendly tutorial for building your first confidential dApp using FHEVM**

This project demonstrates how to build a **Confidential Counter** - a simple but powerful dApp that showcases the core concepts of Fully Homomorphic Encryption (FHE) on the blockchain. Users can add encrypted numbers to a shared counter while keeping their individual contributions completely private.

## 📋 Table of Contents

1. [What You'll Build](#-what-youll-build)
2. [What is FHEVM?](#-what-is-fhevm)
3. [Quick Start](#-quick-start)
4. [Project Structure](#-project-structure)
5. [How It Works](#-how-it-works)
6. [Complete Tutorial](#-complete-tutorial)
7. [Testing Guide](#-testing-guide)
8. [Advanced Features](#-advanced-features)
9. [Demo Guide](#-demo-guide)
10. [Configuration](#-configuration)
11. [Use Cases](#-use-cases)
12. [Next Steps](#-next-steps)
13. [Contributing](#-contributing)
14. [Support](#-support)

## 🎯 What You'll Build

By the end of this tutorial, you will have built:

- **🔒 Real FHEVM Smart Contract**: Uses actual encrypted types (euint32, ebool) and FHE operations
- **🌐 React Frontend**: Beautiful, user-friendly interface with real FHEVM integration
- **⚡ Encrypted Computation**: Real computation on encrypted data using TFHE functions
- **🛡️ True Privacy**: Individual contributions remain encrypted, only totals are decrypted
- **🎲 FHE PRNG**: Uses FHEVM's built-in random number generation (TFHE.randEuint32)
- **📊 Advanced FHE Operations**: Encrypted arithmetic, comparison, and conditional operations
- **🔓 Selective Decryption**: Decrypt your own contributions while keeping others encrypted
- **🔐 Real FHEVM Workflow**: Complete encrypt → compute → decrypt workflow with proofs

### What You'll Learn

- ✅ Understand the basics of FHEVM and why it matters
- ✅ Set up a complete FHEVM development environment with real encrypted types
- ✅ Build and deploy a real FHEVM smart contract using euint32, ebool, and TFHE functions
- ✅ Create a React frontend with actual FHEVM integration and encrypted inputs
- ✅ Experience the real **Encryption → Computation → Decryption** workflow with proofs
- ✅ Learn about real FHE operations: TFHE.add, TFHE.gt, TFHE.max, TFHE.randEuint32
- ✅ Understand encrypted arithmetic, comparison, and conditional operations
- ✅ Master selective decryption and true privacy-preserving computation
- ✅ Explore advanced FHEVM features like encrypted conditional operations
- ✅ Be confident to build production-ready confidential dApps with FHEVM

## 🔍 What is FHEVM?

**FHEVM** (Fully Homomorphic Encryption Virtual Machine) is a revolutionary technology that allows you to perform computations on encrypted data without ever decrypting it. This means:

- 🔒 **Your data stays private** - even the blockchain can't see your individual values
- ⚡ **Computation happens on encrypted data** - the smart contract processes encrypted inputs
- 🌐 **Only results are revealed** - you can choose what information to make public
- 🛡️ **Privacy by design** - no need to trust third parties with your sensitive data

### Real-World Example

Imagine a voting system where:
- Each vote is encrypted before being sent to the blockchain
- The smart contract counts all encrypted votes
- Only the final tally is revealed
- Individual votes remain completely private

This is exactly what we'll build in this tutorial!

## 🚀 Quick Start

### Prerequisites

This tutorial assumes you have:
- **Basic Solidity knowledge** (comfortable writing simple smart contracts)
- **Familiarity with standard Ethereum dev tools** (Hardhat, MetaMask, React)
- **Node.js and npm installed** on your system
- **MetaMask wallet** installed in your browser
- **No prior knowledge of FHE or cryptography** required! 🎉

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/mdlog/zama-dapp-tutorial.git
cd zama-dapp-tutorial

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 2: Environment Setup

Create a `.env` file in the root directory:

```bash
# .env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.public.blastapi.io

# FHEVM Contract Addresses (Sepolia)
FHEVM_EXECUTOR_CONTRACT=0x848B0066793BcC60346Da1F49049357399B8D595
ACL_CONTRACT=0x687820221192C5B662b25367F70076A37bc79b6c
KMS_VERIFIER_CONTRACT=0x1364cBBf2cDF5032C47d8226a6f6FBD2AFCDacAC
INPUT_VERIFIER_CONTRACT=0xbc91f3daD1A5F19F8390c400196e58073B6a0BC4
DECRYPTION_ORACLE_CONTRACT=0xa02Cda4Ca3a71D7C46997716F4283aa851C28812
DECRYPTION_ADDRESS=0xb6E160B1ff80D67Bfe90A85eE06Ce0A2613607D1
INPUT_VERIFICATION_ADDRESS=0x7048C39f048125eDa9d678AEbaDfB22F7900a29F

# Relayer URL
RELAYER_URL=https://relayer.testnet.zama.cloud
```

**⚠️ Important:** Never commit your private key to version control!

### Step 3: Get Testnet Tokens

1. Visit the [Sepolia Faucet](https://sepoliafaucet.com/)
2. Connect your MetaMask wallet
3. Request testnet tokens (ETH)
4. You'll need these tokens to deploy and interact with your contract

### Step 4: Configure MetaMask

Add the Sepolia Testnet to your MetaMask:

- **Network Name:** Sepolia Testnet
- **RPC URL:** https://eth-sepolia.public.blastapi.io
- **Chain ID:** 11155111
- **Currency Symbol:** ETH
- **Block Explorer:** https://sepolia.etherscan.io

### Step 5: Deployment

```bash
# Compile the smart contracts
npx hardhat compile

# Deploy educational version to Sepolia testnet
npm run deploy -- --network sepolia

# OR deploy real FHEVM version to Sepolia testnet
npm run deploy-real -- --network sepolia

# Start the frontend
cd frontend && npm start
```

The app will open at `http://localhost:3000`

**Note**: Choose the deployment based on your needs:
- **Educational version**: For learning FHEVM concepts
- **Real FHEVM version**: For actual encrypted computation

## 📁 Project Structure

```
hello-fhevm-tutorial/
├── contracts/
│   ├── ConfidentialCounter.sol    # Educational FHEVM smart contract
│   └── RealFhevmCounter.sol       # Real FHEVM implementation with encrypted types
├── scripts/
│   ├── deploy.js                  # Educational deployment script
│   └── deploy-real-fhevm.js       # Real FHEVM deployment script
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FhevmProvider.js   # Educational FHEVM context provider
│   │   │   ├── RealFhevmProvider.js # Real FHEVM context provider
│   │   │   ├── WalletConnection.js # MetaMask integration
│   │   │   ├── ConfidentialCounter.js # Educational dApp component
│   │   │   ├── RealFhevmCounter.js # Real FHEVM dApp component
│   │   │   └── RealFhevmExample.js # Real FHEVM example component
│   │   ├── App.js                 # Main React app
│   │   └── contract-info.json     # Contract deployment info
│   └── package.json
├── hardhat.config.js              # Hardhat configuration with FHEVM support
├── package.json                   # Project dependencies with FHEVM
├── setup-fhevm.sh                 # Real FHEVM setup script
├── REAL_FHEVM_GUIDE.md            # Detailed real FHEVM implementation guide
├── test/
│   ├── ConfidentialCounter.test.js # Educational contract tests
│   └── RealFhevmCounter.test.js    # Real FHEVM contract tests
└── README.md                      # Complete tutorial and guide (this file)
```

## 🔍 How It Works

### The FHEVM Workflow

1. **🔐 Encryption**: User's number is encrypted using FHEVM before sending to blockchain
2. **⚡ Computation**: Smart contract performs addition on encrypted data
3. **🔓 Selective Decryption**: Only the total sum is decrypted and made public
4. **🛡️ Privacy**: Individual contributions remain completely private

### Smart Contract Features

```solidity
contract ConfidentialCounter {
    // Confidential counter - individual values remain private
    uint32 private confidentialCounter;
    
    // Public total - only the sum is revealed
    uint32 public publicTotal;
    
    // Add number to counter (FHEVM-inspired)
    function addToCounter(uint32 value) external;
    
    // Add random value (simulates TFHE.randEuint32())
    function addRandomToCounter() external;
    
    // Check if counter is above threshold (simulates TFHE.gt())
    function isCounterAboveThreshold(uint32 threshold) external returns (bool);
    
    // Get maximum value (simulates TFHE.max())
    function getMaxValue(uint32 value) external view returns (uint32);
    
    // Get current public total
    function getPublicTotal() external view returns (uint32);
    
    // Get user's contribution (for demonstration)
    function getUserContribution(address user) external view returns (uint32);
    
    // Reset counter (owner only)
    function resetCounter() external;
}
```

### Frontend Features

- **🔗 Wallet Connection**: Seamless MetaMask integration with Sepolia testnet
- **🎨 Beautiful UI**: Modern, responsive design with gradient buttons
- **📱 Mobile Friendly**: Works on all devices
- **🔄 Real-time Updates**: Live transaction status and updates
- **🔍 Transaction Explorer**: Direct links to Sepolia Etherscan
- **🎲 Random Value Button**: Add random encrypted values with one click
- **📊 Advanced Operations**: Threshold checking and max value comparison
- **🎯 Multiple Interaction Modes**: Number input, random generation, and reset
- **🔓 Decrypt Counter**: Decrypt and view the total counter value
- **👤 Decrypt My Input**: Decrypt your individual contributions
- **🔐 FHEVM Demo**: Interactive demonstration of encrypt/decrypt workflow

## 🧪 Testing Guide

### Test Scenarios

#### **Scenario 1: Basic Functionality Test**

**Setup:**
1. Open http://localhost:3000
2. Connect MetaMask to Sepolia testnet
3. Ensure you have testnet tokens

**Test Steps:**
1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Approve connection in MetaMask
   - Verify wallet address is displayed

2. **Add Encrypted Number**
   - Enter a number (e.g., 42)
   - Click "🔒 Add Encrypted Number"
   - Approve transaction in MetaMask
   - Verify: Public Total should update to 42

3. **Add Random Value**
   - Click "🎲 Add Random Value"
   - Approve transaction in MetaMask
   - Verify: Public Total should increase

4. **Decrypt Counter**
   - Click "🔓 Decrypt Counter"
   - Verify: Should show current total
   - Verify: Message shows "(Global Total)"

**Expected Results:**
- ✅ Wallet connects successfully
- ✅ Transactions are approved and confirmed
- ✅ Public Total updates correctly
- ✅ Decrypt shows current total

#### **Scenario 2: Multi-User Testing**

**Setup:**
1. Use 2 different MetaMask accounts
2. Both accounts connected to Sepolia testnet
3. Both accounts have testnet tokens

**Test Steps:**
1. **Account A:**
   - Add encrypted number: 50
   - Verify: Public Total = 50
   - Click "🔓 Decrypt Counter"
   - Verify: Shows 50

2. **Account B:**
   - Add encrypted number: 30
   - Verify: Public Total = 80
   - Click "🔓 Decrypt Counter"
   - Verify: Shows 80

3. **Account A (Refresh):**
   - Click "🔄 Refresh Data"
   - Click "🔓 Decrypt Counter"
   - Verify: Shows 80 (global total)

4. **Individual Contributions:**
   - Account A: Click "👤 Decrypt My Input"
   - Verify: Shows 50 (individual contribution)
   - Account B: Click "👤 Decrypt My Input"
   - Verify: Shows 30 (individual contribution)

**Expected Results:**
- ✅ Global total is consistent across accounts
- ✅ Individual contributions are tracked correctly
- ✅ Refresh data works properly
- ✅ Privacy is maintained (individual vs global)

#### **Scenario 3: Advanced Features Test**

**Test Steps:**
1. **FHEVM Demo**
   - Click "🔐 FHEVM Demo"
   - Verify: Interactive workflow explanation appears
   - Verify: Text is visible (not white on white)

2. **Reset Counter**
   - Click "🔄 Reset Counter"
   - Approve transaction in MetaMask
   - Verify: Public Total resets to 0

3. **Error Handling**
   - Try to add number > 1000
   - Verify: Error message appears
   - Try to add number < 1
   - Verify: Error message appears

4. **Network Switching**
   - Switch to different network in MetaMask
   - Verify: Application detects network change
   - Switch back to Sepolia
   - Verify: Application works normally

**Expected Results:**
- ✅ FHEVM demo displays correctly
- ✅ Reset functionality works
- ✅ Error handling is proper
- ✅ Network detection works

### Running Tests

```bash
# Run educational smart contract tests
npx hardhat test test/ConfidentialCounter.test.js

# Run real FHEVM smart contract tests
npx hardhat test test/RealFhevmCounter.test.js

# Run all tests
npx hardhat test

# Test frontend components
cd frontend && npm test
```

### Verification Checklist

#### **Frontend Verification:**
- [ ] Application loads without errors
- [ ] MetaMask connection works
- [ ] All buttons are clickable and responsive
- [ ] Status messages appear correctly
- [ ] Transaction hashes are displayed
- [ ] Error messages are clear and helpful

#### **Smart Contract Verification:**
- [ ] Contract is deployed on Sepolia
- [ ] All functions work correctly
- [ ] Events are emitted properly
- [ ] Access control works (owner functions)
- [ ] Gas estimation is reasonable

#### **Privacy Verification:**
- [ ] Individual contributions are tracked
- [ ] Global total is public
- [ ] Decrypt functions work correctly
- [ ] Data refresh updates properly
- [ ] Multi-user privacy is maintained

### Common Issues and Solutions

#### **Issue 1: "Contract not initialized"**
**Solution:**
- Check if MetaMask is connected
- Verify you're on Sepolia testnet
- Refresh the page

#### **Issue 2: "Transaction failed"**
**Solution:**
- Check if you have enough testnet tokens
- Increase gas limit in MetaMask
- Check network congestion

#### **Issue 3: "Data not updating"**
**Solution:**
- Click "🔄 Refresh Data" button
- Wait for transaction confirmation
- Check blockchain explorer

#### **Issue 4: "Network not supported"**
**Solution:**
- Switch to Sepolia testnet in MetaMask
- Add Sepolia network if not present
- Check network configuration

## 🔓 Advanced Features

### Individual Decryption Features

This section covers the advanced decryption features that have been added to the application.

#### Understanding Individual Decryption

Individual decryption allows users to decrypt their own contributions while keeping other users' data private. This demonstrates the concept of **selective decryption** in FHEVM.

#### Features Added

**1. 🔓 Decrypt Counter Button**
- Decrypts the total counter value from the smart contract
- Shows the current sum of all contributions
- Demonstrates public decryption for transparency

**2. 👤 Decrypt My Input Button**
- Decrypts individual user contributions
- Shows only the user's own total contribution
- Demonstrates private decryption with access control

**3. 🔐 FHEVM Demo Button**
- Interactive demonstration of the encrypt/decrypt workflow
- Shows step-by-step process of FHEVM operations
- Educational tool for understanding FHE concepts

#### How Individual Decryption Works

```javascript
// 1. Get user's encrypted contribution
const encryptedContribution = await contract.getEncryptedUserContribution(userAddress);

// 2. Decrypt using FHEVM (only user with private key can decrypt)
const decryptedContribution = await fhevm.decrypt(encryptedContribution);

// 3. Display result
setUserContribution({
    address: userAddress,
    contribution: decryptedContribution
});
```

#### Smart Contract Implementation

```solidity
// Mapping to store individual encrypted contributions
mapping(address => euint32) private encryptedUserContributions;

// Function to decrypt individual contribution
function decryptMyContribution() public view returns (uint32) {
    // Only the user with private key can decrypt their own data
    return TFHE.decrypt(encryptedUserContributions[msg.sender]);
}
```

#### Testing Individual Decryption

1. **Connect your wallet** to the dApp
2. **Add some numbers** to the counter (e.g., 42, 58, 100)
3. **Click "👤 Decrypt My Input"** to see your total contribution
4. **Click "🔓 Decrypt Counter"** to see the public total
5. **Click "🔐 FHEVM Demo"** to see the workflow explanation

#### Privacy and Security

- **Individual Privacy**: Only you can decrypt your own contributions
- **Public Transparency**: Total sum is publicly available
- **Access Control**: Smart contract manages decryption permissions
- **Selective Decryption**: Choose what to decrypt and what to keep private

## 🔐 Real FHEVM Implementation

This tutorial now includes **two implementations** to help you understand both concepts and real-world usage:

### 1. **Educational Implementation** (`ConfidentialCounter.sol`)
- Demonstrates FHEVM concepts with comments
- Uses regular Solidity types for learning
- Shows the workflow conceptually

### 2. **Real FHEVM Implementation** (`RealFhevmCounter.sol`) ⭐
- **Uses actual encrypted types**: `euint32`, `ebool`
- **Real FHE operations**: `TFHE.add`, `TFHE.gt`, `TFHE.max`, `TFHE.randEuint32`
- **Encrypted inputs with proofs**: `externalEuint32` with `bytes calldata inputProof`
- **True privacy**: Individual data remains encrypted
- **Advanced features**: Encrypted arithmetic, conditional operations

### Real FHEVM Smart Contract Features

```solidity
// Real encrypted data types
euint32 private confidentialCounter;
mapping(address => euint32) private encryptedUserContributions;

// Real FHE operations
function addToCounter(externalEuint32 encryptedValue, bytes calldata inputProof) public {
    euint32 value = TFHE.asEuint32(encryptedValue, inputProof);
    confidentialCounter = TFHE.add(confidentialCounter, value);
    publicTotal = TFHE.decrypt(confidentialCounter);
}

// FHEVM's built-in random number generation
function addRandomToCounter() public {
    euint32 randomValue = TFHE.randEuint32();
    confidentialCounter = TFHE.add(confidentialCounter, randomValue);
    publicTotal = TFHE.decrypt(confidentialCounter);
}

// Encrypted comparison operations
function isCounterAboveThreshold(uint32 threshold) public returns (bool) {
    euint32 encryptedThreshold = TFHE.asEuint32(threshold);
    ebool encryptedResult = TFHE.gt(confidentialCounter, encryptedThreshold);
    return TFHE.decrypt(encryptedResult);
}
```

### Real FHEVM Frontend Integration

```javascript
// Real FHEVM encryption and proof generation
const { encryptedValue, proof } = await fhevm.encryptValue(number);
const tx = await contract.addToCounter(encryptedValue, proof);

// Real FHEVM decryption
const decryptedContribution = await fhevm.decryptValue(encryptedContribution);
```

### Deployment Commands

```bash
# Deploy educational version
npm run deploy

# Deploy real FHEVM version
npm run deploy-real
```

### Key Differences

| Feature | Educational | Real FHEVM |
|---------|-------------|------------|
| **Data Types** | `uint32` | `euint32`, `ebool` |
| **Inputs** | Plain values | Encrypted + proofs |
| **Operations** | Regular Solidity | `TFHE.add`, `TFHE.gt`, etc. |
| **Random** | `keccak256` | `TFHE.randEuint32()` |
| **Privacy** | Simulated | Real encrypted |
| **Use Case** | Learning | Production |

### 📖 Real FHEVM Guide

For detailed information about the real FHEVM implementation, see [REAL_FHEVM_GUIDE.md](./REAL_FHEVM_GUIDE.md).

## 🎬 Demo Guide

This guide will help you demonstrate the Hello FHEVM tutorial to others, showcasing the power of confidential computing on the blockchain.

### Demo Objectives

By the end of this demo, your audience should understand:

1. **What FHEVM is** and why it matters
2. **How confidential computation works** on the blockchain
3. **The practical benefits** of privacy-preserving applications
4. **FHEVM operations**: arithmetic, comparison, random generation
5. **How to get started** with FHEVM development

### Demo Script (15-20 minutes)

#### Introduction (2-3 minutes)

**"Welcome to the future of confidential computing on the blockchain!"**

- **Problem**: Traditional blockchains are transparent - everyone can see everything
- **Solution**: FHEVM enables computation on encrypted data
- **Today's demo**: Building a confidential counter where individual contributions remain private

#### Live Demo (10-12 minutes)

**Step 1: Show the Problem (2 minutes)**

**"Let's see what happens on a traditional blockchain..."**

1. Open a regular blockchain explorer (Ethereum)
2. Show how all transactions are visible
3. Explain privacy concerns: "Everyone can see your data!"

**Step 2: Deploy the Contract (3 minutes)**

**"Now let's deploy our FHEVM-inspired smart contract..."**

```bash
# Show the smart contract code
cat contracts/ConfidentialCounter.sol

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia
```

**Key points to highlight:**
- FHEVM-inspired operations (TFHE.add, TFHE.gt, TFHE.max, TFHE.randEuint32)
- Encrypted data types (euint32, ebool)
- Individual values remain private
- Multiple interaction modes (number input, random generation, threshold checking)

**Step 3: Show the Frontend (5 minutes)**

**"Let's interact with our FHEVM-inspired dApp..."**

1. Start the frontend: `cd frontend && npm start`
2. Connect MetaMask wallet to Sepolia testnet
3. **Add a number** (e.g., 42) - show the blue "Add Encrypted Number" button
4. **Add a random value** - show the green "Add Random Value" button
5. **Decrypt Counter** - show the orange "🔓 Decrypt Counter" button
6. **Decrypt My Input** - show the yellow "👤 Decrypt My Input" button
7. **FHEVM Demo** - show the purple "🔐 FHEVM Demo" button
8. **Show the transaction** on Sepolia Etherscan
9. **Highlight**: Multiple interaction modes, decryption features, and real-time updates!

**Step 4: Demonstrate Advanced Features (4 minutes)**

**"Let's explore the advanced FHEVM features..."**

1. **Add multiple numbers** to build up the counter
2. **Add random values** to show random generation
3. **Decrypt Counter** - show the total counter value
4. **Decrypt My Input** - show individual user contribution
5. **FHEVM Demo** - show the interactive workflow explanation
6. **Test threshold checking** - show how the counter can be compared
7. **Show user contributions** - demonstrate individual tracking
8. **Key point**: "Multiple FHEVM operations and decryption features working together!"

**Step 5: Demonstrate Privacy (3 minutes)**

**"Let's prove the privacy works..."**

1. Add another number from a different account
2. Show that individual values are tracked privately
3. **Decrypt My Input** from each account - show individual contributions
4. **Decrypt Counter** - show the public total
5. Show that only the total is public, individual contributions remain private
6. **Key point**: "Selective decryption - you can see your own data, but others' data stays private!"

#### Q&A and Discussion (3-5 minutes)

**Common questions and answers:**

**Q: "How is this different from regular encryption?"**
A: Regular encryption requires decryption before computation. FHE allows computation on encrypted data without ever decrypting it.

**Q: "What are the real-world use cases?"**
A: Confidential voting, private auctions, confidential surveys, private financial data, confidential machine learning, random number generation for gaming, threshold-based access control.

**Q: "Is this secure?"**
A: Yes, it's based on proven cryptographic techniques and is actively used in production systems.

**Q: "How do I get started?"**
A: Follow our tutorial, join the Zama community, and start building!

### Demo Preparation

#### Before the Demo

1. **Test everything**:
   ```bash
   # Run the setup script
   ./setup.sh
   
   # Test deployment
   npx hardhat run scripts/deploy.js --network sepolia
   
   # Test frontend
   cd frontend && npm start
   ```

2. **Prepare your environment**:
   - Have MetaMask ready with Sepolia testnet configured
   - Get testnet tokens from the faucet
   - Have multiple accounts ready for demonstration

3. **Prepare slides** (optional):
   - Problem statement
   - Solution overview
   - Architecture diagram
   - Use cases

### Key Messages

#### For Developers
- **"FHEVM makes privacy-preserving dApps accessible"**
- **"You can build confidential applications with familiar tools"**
- **"The future of blockchain is private by default"**

#### For Business Leaders
- **"Confidential computing enables new business models"**
- **"Privacy and transparency can coexist"**
- **"FHEVM opens doors to regulated industries"**

#### For General Audience
- **"Your data can stay private on the blockchain"**
- **"You can participate without revealing sensitive information"**
- **"This technology protects your privacy while maintaining trust"**

## 🌐 Live Demo

[🚀 Try the live demo](https://github.com/mdlog/zama-dapp-tutorial) on Sepolia testnet!

**Repository**: [https://github.com/mdlog/zama-dapp-tutorial](https://github.com/mdlog/zama-dapp-tutorial)

**Note**: You'll need:
- MetaMask wallet
- Sepolia testnet configured
- Testnet tokens (get them from the [faucet](https://sepoliafaucet.com/))

## 🎯 Real-World Applications

This simple counter demonstrates concepts used in:

- **Confidential Voting**: Private votes, public results
- **Private Auctions**: Hidden bids, public winner
- **Confidential Surveys**: Private responses, public statistics
- **Private Financial Data**: Hidden transactions, public totals
- **Confidential Machine Learning**: Private data, public models
- **Random Number Generation**: Secure random values for gaming and lotteries
- **Threshold-based Systems**: Private comparisons for access control and decision making

## 🔧 Configuration

### Environment Variables

```bash
# .env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.public.blastapi.io

# FHEVM Contract Addresses (Sepolia)
FHEVM_EXECUTOR_CONTRACT=0x848B0066793BcC60346Da1F49049357399B8D595
ACL_CONTRACT=0x687820221192C5B662b25367F70076A37bc79b6c
KMS_VERIFIER_CONTRACT=0x1364cBBf2cDF5032C47d8226a6f6FBD2AFCDacAC
INPUT_VERIFIER_CONTRACT=0xbc91f3daD1A5F19F8390c400196e58073B6a0BC4
DECRYPTION_ORACLE_CONTRACT=0xa02Cda4Ca3a71D7C46997716F4283aa851C28812
DECRYPTION_ADDRESS=0xb6E160B1ff80D67Bfe90A85eE06Ce0A2613607D1
INPUT_VERIFICATION_ADDRESS=0x7048C39f048125eDa9d678AEbaDfB22F7900a29F

# Relayer URL
RELAYER_URL=https://relayer.testnet.zama.cloud
```

### Network Configuration

The project is configured for:
- **Sepolia Testnet**: Chain ID 11155111
- **RPC URL**: https://eth-sepolia.public.blastapi.io
- **Block Explorer**: https://sepolia.etherscan.io

## 🚀 Next Steps

After completing this tutorial, explore:

### Beginner Projects

1. **Confidential Voting System**
   - Multiple candidates
   - Private votes
   - Public results

2. **Private Number Guessing Game**
   - Secret number stored encrypted
   - Players guess without revealing attempts
   - Winner announced publicly

3. **Confidential Survey**
   - Private responses
   - Public statistics
   - Multiple question types

### Intermediate Projects

1. **Private Auction System**
   - Encrypted bids
   - Public winner announcement
   - Time-based bidding

2. **Confidential Token Transfer**
   - Private amounts
   - Public balances
   - Multiple participants

3. **Private Data Aggregation**
   - Multiple data sources
   - Encrypted computation
   - Public insights

### Advanced Projects

1. **Confidential Machine Learning**
   - Private training data
   - Encrypted model training
   - Public model deployment

2. **Private Financial Instruments**
   - Confidential transactions
   - Public market data
   - Complex financial logic

3. **Confidential Identity Verification**
   - Private credentials
   - Public verification
   - Zero-knowledge proofs

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/mdlog/zama-dapp-tutorial.git
cd zama-dapp-tutorial

# Install dependencies
npm install
cd frontend && npm install && cd ..

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and test
npm test
cd frontend && npm test && cd ..

# Submit a pull request
```

## 📞 Support

### Getting Help

1. **Check Documentation:**
   - This comprehensive README.md
   - [FHEVM Documentation](https://docs.zama.ai/protocol/solidity-guides/smart-contract/configure/contract_addresses)

2. **Common Resources:**
   - [Sepolia Faucet](https://sepoliafaucet.com/)
   - [MetaMask Support](https://metamask.io/support/)
   - [Etherscan Sepolia](https://sepolia.etherscan.io/)

3. **Community:**
   - [Zama Discord](https://discord.gg/zama)
   - [GitHub Issues](https://github.com/mdlog/zama-dapp-tutorial/issues)

### Reporting Issues

When reporting issues, include:
- Browser and version
- MetaMask version
- Network (Sepolia)
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama Team** for building FHEVM and the Zama Protocol
- **Sepolia Team** for providing the testnet infrastructure
- **Community** for feedback and contributions


## 🎉 Conclusion

**🎉 Congratulations!** You've successfully built your first confidential dApp using FHEVM. You now understand the fundamentals of Fully Homomorphic Encryption on the blockchain and are ready to explore more advanced use cases.

**Remember:** This is just the beginning. The possibilities with FHEVM are endless, and you're now equipped with the knowledge to build the next generation of privacy-preserving applications!

**🎉 Ready to build the future of confidential computing?** Start with this tutorial and join the FHEVM revolution!

[![Star this repo](https://img.shields.io/github/stars/mdlog/zama-dapp-tutorial?style=social)](https://github.com/mdlog/zama-dapp-tutorial)
[![Follow on Twitter](https://img.shields.io/twitter/follow/zama_fhe?style=social)](https://twitter.com/zama_fhe)

---

*Creating the most beginner-friendly "Hello FHEVM" tutorial*
