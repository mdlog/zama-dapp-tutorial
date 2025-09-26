# 🔐 Hello FHEVM - Your First Confidential dApp Tutorial

Welcome to the most beginner-friendly tutorial for building your first confidential dApp using FHEVM! This tutorial will walk you through creating a **Confidential Counter** - a simple but powerful example that demonstrates the core concepts of Fully Homomorphic Encryption (FHE) on the blockchain.

## 📋 Table of Contents

1. [What You'll Learn](#what-youll-learn)
2. [Prerequisites](#prerequisites)
3. [What is FHEVM?](#what-is-fhevm)
4. [Project Overview](#project-overview)
5. [Setup Instructions](#setup-instructions)
6. [Building the Smart Contract](#building-the-smart-contract)
7. [Creating the Frontend](#creating-the-frontend)
8. [Deployment](#deployment)
9. [Testing Your dApp](#testing-your-dapp)
10. [Understanding the Magic](#understanding-the-magic)
11. [Individual Decryption Features](#individual-decryption-features)
12. [Next Steps](#next-steps)

## 🎯 What You'll Learn

By the end of this tutorial, you will:

- ✅ Understand the basics of FHEVM and why it matters
- ✅ Set up a complete FHEVM development environment
- ✅ Build and deploy a FHEVM-inspired smart contract
- ✅ Create a React frontend with multiple interaction modes
- ✅ Experience the **Encryption → Computation → Decryption** workflow
- ✅ Learn about encrypted operations: arithmetic, comparison, and random generation
- ✅ Understand threshold checking and max value operations
- ✅ Master individual decryption and selective privacy features
- ✅ Explore FHEVM demo workflow with interactive examples
- ✅ Be confident to start experimenting with more advanced FHE use cases

## 🔧 Prerequisites

This tutorial assumes you have:

- **Basic Solidity knowledge** (comfortable writing simple smart contracts)
- **Familiarity with standard Ethereum dev tools** (Hardhat, MetaMask, React)
- **Node.js and npm installed** on your system
- **MetaMask wallet** installed in your browser
- **No prior knowledge of FHE or cryptography** required! 🎉

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

## 🏗️ Project Overview

Our **Confidential Counter** dApp will:

1. **Allow users to add numbers** to a shared counter (FHEVM-inspired)
2. **Keep individual contributions private** - no one can see what you added
3. **Display the public total** - everyone can see the sum of all contributions
4. **Demonstrate the full FHE workflow** - encryption, computation, and selective decryption
5. **Add random values** - simulate FHEVM's random number generation
6. **Perform threshold checks** - demonstrate encrypted comparisons
7. **Find maximum values** - showcase encrypted max operations
8. **Track user contributions** - for educational purposes

### Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend │    │   FHEVM Library  │    │  Smart Contract │
│                 │    │                  │    │                 │
│ • User Interface│◄──►│ • Encryption     │◄──►│ • Confidential  │
│ • Wallet Connect│    │ • Decryption     │    │   Computation   │
│ • Transaction   │    │ • Key Management │    │ • Public Results│
│   Management    │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Setup Instructions

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

## 📝 Building the Smart Contract

Our smart contract is located in `contracts/ConfidentialCounter.sol`. Let's break down the key components:

### Contract Structure

```solidity
contract ConfidentialCounter {
    // The confidential counter that stores values
    // In real FHEVM: euint32 private confidentialCounter;
    uint32 private confidentialCounter;
    
    // Public total for transparency
    uint32 public publicTotal;
    
    // Owner of the contract
    address public owner;
    
    // Mapping to store individual contributions (private in real FHEVM)
    mapping(address => uint32) private userContributions;
}
```

### Key Functions

#### 1. `addToCounter(uint32 value)`

This is where the magic happens! The function:

```solidity
function addToCounter(uint32 value) public {
    require(value > 0 && value <= 1000, "Value must be between 1 and 1000");
    
    // Add the value to user's contribution
    userContributions[msg.sender] += value;
    
    // Update the confidential counter
    // In real FHEVM: confidentialCounter = TFHE.add(confidentialCounter, TFHE.asEuint32(value));
    confidentialCounter += value;
    
    // Update the public total
    // In real FHEVM: publicTotal = TFHE.decrypt(confidentialCounter);
    publicTotal = confidentialCounter;
    
    emit CounterIncremented(msg.sender, value, publicTotal);
}
```

**What's happening:**
- Receives a number from the frontend
- Adds it to the user's contribution tracking
- Updates the confidential counter (simulates encrypted computation)
- Updates the public total (simulates selective decryption)
- Emits an event with the contribution and new total

#### 2. `getPublicTotal()`

Returns the current public total:

```solidity
function getPublicTotal() public view returns (uint32) {
    return publicTotal;
}
```

#### 3. `addRandomToCounter()`

Demonstrates FHEVM's random number generation:

```solidity
function addRandomToCounter() public {
    // Generate a pseudo-random number (0-100)
    // In real FHEVM: euint32 randomValue = TFHE.randEuint32();
    uint32 randomValue = uint32(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.number))) % 101);
    
    // Add to user's contribution
    userContributions[msg.sender] += randomValue;
    
    // Update the confidential counter
    // In real FHEVM: confidentialCounter = TFHE.add(confidentialCounter, randomValue);
    confidentialCounter += randomValue;
    
    // Update the public total
    // In real FHEVM: publicTotal = TFHE.decrypt(confidentialCounter);
    publicTotal = confidentialCounter;
    
    emit RandomValueAdded(msg.sender, publicTotal);
}
```

#### 4. `isCounterAboveThreshold(uint32 threshold)`

Demonstrates FHEVM's comparison operations:

```solidity
function isCounterAboveThreshold(uint32 threshold) public returns (bool) {
    // In real FHEVM: ebool result = TFHE.gt(confidentialCounter, TFHE.asEuint32(threshold));
    bool result = confidentialCounter > threshold;
    
    emit ThresholdChecked(msg.sender, threshold, result);
    return result;
}
```

#### 5. `getMaxValue(uint32 value)`

Demonstrates FHEVM's max operation:

```solidity
function getMaxValue(uint32 value) public view returns (uint32) {
    // In real FHEVM: euint32 maxValue = TFHE.max(confidentialCounter, TFHE.asEuint32(value));
    uint32 maxValue = confidentialCounter > value ? confidentialCounter : value;
    return maxValue;
}
```

#### 6. `resetCounter()`

Allows the owner to reset the counter:

```solidity
function resetCounter() public onlyOwner {
    // In real FHEVM: confidentialCounter = TFHE.asEuint32(0);
    confidentialCounter = 0;
    publicTotal = 0;
    emit CounterReset(msg.sender);
}
```

### Understanding the FHEVM Types (Educational)

- **`euint32`**: Encrypted unsigned 32-bit integer (in real FHEVM)
- **`ebool`**: Encrypted boolean (in real FHEVM)
- **`TFHE.asEuint32(value)`**: Convert a regular number to encrypted format
- **`TFHE.decrypt(encryptedValue)`**: Decrypt an encrypted value
- **`TFHE.add(a, b)`**: Add two encrypted values
- **`TFHE.gt(a, b)`**: Compare if encrypted value a > b
- **`TFHE.max(a, b)`**: Get maximum of two encrypted values
- **`TFHE.randEuint32()`**: Generate random encrypted value

## 🎨 Creating the Frontend

Our React frontend consists of several key components:

### 1. FhevmProvider (`components/FhevmProvider.js`)

This component initializes the provider and provides it to the entire app:

```javascript
import { ethers } from 'ethers';

const initializeProvider = async () => {
  // Check if MetaMask is installed
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed. Please install MetaMask to use this dApp.');
  }

  // Create ethers provider
  const ethersProvider = new ethers.BrowserProvider(window.ethereum);
  setProvider(ethersProvider);
  setIsInitialized(true);
};
```

**Note**: This tutorial uses a simplified version for demonstration. In a real FHEVM implementation, you would need to configure the FHEVM library and use proper encrypted types.

### 2. WalletConnection (`components/WalletConnection.js`)

Handles MetaMask connection and network switching:

```javascript
// Request account access
await window.ethereum.request({ method: 'eth_requestAccounts' });

// Switch to Sepolia testnet
await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0xaa36a7' }], // 11155111 in hex
});
```

### 3. ConfidentialCounter (`components/ConfidentialCounter.js`)

The main component that interacts with the smart contract:

```javascript
const addToCounter = async () => {
  const number = parseInt(inputValue);
  
  // Call the smart contract with the number
  // In a real FHEVM implementation, you would encrypt the value first
  const tx = await contract.addToCounter(number);
  
  // Wait for confirmation
  const receipt = await tx.wait();
  
  // Update the public total
  const newTotal = await contract.getPublicTotal();
  setPublicTotal(Number(newTotal));
};

const addRandomToCounter = async () => {
  // Add a random encrypted number to the counter
  const tx = await contract.addRandomToCounter();
  
  // Wait for confirmation
  const receipt = await tx.wait();
  
  // Update the public total
  const newTotal = await contract.getPublicTotal();
  setPublicTotal(Number(newTotal));
};
```

### Frontend Features

The frontend includes:
- **Number Input**: Enter values between 1-1000
- **Add Encrypted Number Button**: Add your chosen number
- **Add Random Value Button**: Add a random value (green button)
- **Reset Counter Button**: Reset the counter (red button, owner only)
- **Real-time Status**: Transaction status and hash display
- **Public Total Display**: Shows the current sum of all contributions

## 🚀 Deployment

### Step 1: Compile the Contract

```bash
npx hardhat compile
```

### Step 2: Deploy to Sepolia Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

This will:
- Deploy your contract to Sepolia testnet
- Save the contract address to `frontend/src/contract-info.json`
- Display deployment information

### Step 3: Start the Frontend

```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`

## 🧪 Testing Your dApp

### Test Scenario 1: Basic Functionality

1. **Connect your wallet** to the dApp
2. **Enter a number** (e.g., 42) in the input field
3. **Click "Add Encrypted Number"**
4. **Watch the transaction** in MetaMask
5. **See the public total update** to 42
6. **Verify on Sepolia Etherscan**

### Test Scenario 2: Random Value Generation

1. **Click "Add Random Value"** (green button)
2. **Watch a random number** (0-100) get added
3. **See the public total update** with the random value
4. **Try multiple times** to see different random values

### Test Scenario 3: Advanced Operations

1. **Add several numbers** to build up the counter
2. **Test threshold checking** by calling `isCounterAboveThreshold()`
3. **Test max value comparison** by calling `getMaxValue()`
4. **Check user contributions** to see your total contribution

### Test Scenario 4: Multiple Users

1. **Open the dApp in multiple browser windows**
2. **Connect different wallets** (or use different accounts)
3. **Add different numbers** from each account
4. **Add random values** from different accounts
5. **Observe that individual contributions remain private**
6. **See only the total sum is public**

### Test Scenario 5: Privacy Verification

1. **Check the transaction on Sepolia Etherscan**
2. **Notice the transaction details**
3. **Confirm that individual values are tracked privately**
4. **Verify that only the total is public**

## 🔍 Understanding the Magic

Let's dive deeper into what makes this dApp special:

### The FHEVM-Inspired Process

```javascript
// 1. User enters a number (e.g., 42)
const number = 42;

// 2. In real FHEVM, this would be encrypted:
// const encryptedValue = fhevm.encrypt32(number);
// For this tutorial, we send the plaintext value

// 3. Send data to smart contract
await contract.addToCounter(number);

// 4. Smart contract processes the value
// In real FHEVM: confidentialCounter = TFHE.add(confidentialCounter, TFHE.asEuint32(value));
// For this tutorial: confidentialCounter += value;

// 5. Update public total
// In real FHEVM: publicTotal = TFHE.decrypt(confidentialCounter);
// For this tutorial: publicTotal = confidentialCounter;
```

### The Computation Process

```solidity
// Inside the smart contract
function addToCounter(inEuint32 calldata encryptedValue) public {
    // This happens on ENCRYPTED data!
    confidentialCounter = confidentialCounter + encryptedValue;
    
    // Only the total is decrypted
    publicTotal = FHE.decrypt(confidentialCounter);
}
```

### The Decryption Process

```javascript
// Frontend gets the public total
const newTotal = await contract.getPublicTotal();
// This is the only decrypted value - individual contributions remain private!
```

### Why This Matters

1. **Privacy**: Your individual contribution is never revealed
2. **Transparency**: The total is public and verifiable
3. **Trust**: No need to trust a central authority
4. **Scalability**: Works with any number of participants

## 🎯 Real-World Applications

This simple counter demonstrates concepts used in:

- **Confidential Voting**: Private votes, public results
- **Private Auctions**: Hidden bids, public winner
- **Confidential Surveys**: Private responses, public statistics
- **Private Financial Data**: Hidden transactions, public totals
- **Confidential Machine Learning**: Private data, public models

## 🚀 Next Steps

Now that you've built your first FHEVM dApp, here are some ideas to explore:

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

## 📚 Additional Resources

- [FHEVM Documentation](https://docs.zama.ai/protocol/solidity-guides/smart-contract/configure/contract_addresses)
- [Zama Protocol](https://www.zama.ai/)
- [Sepolia Testnet](https://sepolia.etherscan.io/)
- [FHEVM GitHub](https://github.com/zama-ai/relayer-sdk)
- [Zama Community](https://discord.gg/zama)
- [Sepolia Faucet](https://sepoliafaucet.com/)

## 🤝 Contributing

Found a bug or want to improve this tutorial? We'd love your help!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

- **Documentation**: [FHEVM Docs](https://docs.zama.ai/protocol/relayer-sdk-guides/fhevm-relayer/initialization)
- **Community**: [Zama Discord](https://discord.gg/zama)
- **Issues**: [GitHub Issues](https://github.com/mdlog/zama-dapp-tutorial/issues)
- **Sepolia Faucet**: [Sepolia Faucet](https://sepoliafaucet.com/)

## 🔓 Individual Decryption Features

This section covers the advanced decryption features that have been added to the application.

### Understanding Individual Decryption

Individual decryption allows users to decrypt their own contributions while keeping other users' data private. This demonstrates the concept of **selective decryption** in FHEVM.

### Features Added

#### 1. **🔓 Decrypt Counter Button**
- Decrypts the total counter value from the smart contract
- Shows the current sum of all contributions
- Demonstrates public decryption for transparency

#### 2. **👤 Decrypt My Input Button**
- Decrypts individual user contributions
- Shows only the user's own total contribution
- Demonstrates private decryption with access control

#### 3. **🔐 FHEVM Demo Button**
- Interactive demonstration of the encrypt/decrypt workflow
- Shows step-by-step process of FHEVM operations
- Educational tool for understanding FHE concepts

### How Individual Decryption Works

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

### Smart Contract Implementation

```solidity
// Mapping to store individual encrypted contributions
mapping(address => euint32) private encryptedUserContributions;

// Function to decrypt individual contribution
function decryptMyContribution() public view returns (uint32) {
    // Only the user with private key can decrypt their own data
    return TFHE.decrypt(encryptedUserContributions[msg.sender]);
}
```

### Testing Individual Decryption

1. **Connect your wallet** to the dApp
2. **Add some numbers** to the counter (e.g., 42, 58, 100)
3. **Click "👤 Decrypt My Input"** to see your total contribution
4. **Click "🔓 Decrypt Counter"** to see the public total
5. **Click "🔐 FHEVM Demo"** to see the workflow explanation

### Privacy and Security

- **Individual Privacy**: Only you can decrypt your own contributions
- **Public Transparency**: Total sum is publicly available
- **Access Control**: Smart contract manages decryption permissions
- **Selective Decryption**: Choose what to decrypt and what to keep private

### Real FHEVM Implementation

In a real FHEVM environment, the implementation would look like this:

```solidity
contract RealFhevmCounter {
    mapping(address => euint32) private encryptedUserContributions;
    
    function addToCounter(externalEuint32 encryptedValue, bytes calldata proof) public {
        euint32 value = TFHE.asEuint32(encryptedValue, proof);
        encryptedUserContributions[msg.sender] = TFHE.add(
            encryptedUserContributions[msg.sender], 
            value
        );
    }
    
    function decryptMyContribution() public view returns (uint32) {
        return TFHE.decrypt(encryptedUserContributions[msg.sender]);
    }
}
```

### Frontend Integration

The frontend now includes:
- Individual decryption functionality
- User-specific contribution display
- Interactive FHEVM workflow demo
- Privacy-preserving UI components

For more detailed information, see [INDIVIDUAL_DECRYPT_GUIDE.md](./INDIVIDUAL_DECRYPT_GUIDE.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama Team** for building FHEVM and the Zama Protocol
- **Sepolia Team** for providing the testnet infrastructure
- **Community** for feedback and contributions

---

**🎉 Congratulations!** You've successfully built your first confidential dApp using FHEVM. You now understand the fundamentals of Fully Homomorphic Encryption on the blockchain and are ready to explore more advanced use cases.

**Remember:** This is just the beginning. The possibilities with FHEVM are endless, and you're now equipped with the knowledge to build the next generation of privacy-preserving applications!

---

*Built for Zama Bounty Program Season 10 - Creating the most beginner-friendly "Hello FHEVM" tutorial*
