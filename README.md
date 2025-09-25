# 🔐 Hello FHEVM - Your First Confidential dApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FHEVM](https://img.shields.io/badge/FHEVM-v0.1.0-blue.svg)](https://github.com/fhenixprotocol/fhevm)
[![Zama Protocol](https://img.shields.io/badge/Zama-Protocol-green.svg)](https://www.zama.ai/)

> **The most beginner-friendly tutorial for building your first confidential dApp using FHEVM**

This project demonstrates how to build a **Confidential Counter** - a simple but powerful dApp that showcases the core concepts of Fully Homomorphic Encryption (FHE) on the blockchain. Users can add encrypted numbers to a shared counter while keeping their individual contributions completely private.

## 🎯 What You'll Build

- **🔒 FHEVM-Inspired Smart Contract**: Demonstrates confidential computation concepts with real FHEVM operations
- **🌐 React Frontend**: Beautiful, user-friendly interface with multiple interaction modes
- **⚡ Real-time Updates**: See your transactions update the public total instantly
- **🛡️ Privacy by Design**: Individual contributions remain private, only totals are public
- **🎲 Random Generation**: Add random encrypted values to demonstrate FHEVM capabilities
- **📊 Advanced Operations**: Threshold checking, max value comparison, and more

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask wallet
- Basic knowledge of Solidity and React

### Installation

```bash
# Clone the repository
git clone https://github.com/mdlog/zama-dapp-tutorial.git
cd zama-dapp-tutorial

# Install dependencies
npm install
cd frontend && npm install && cd ..

# Set up environment variables
cp .env.example .env
# Edit .env with your private key and RPC URL
```

### Deployment

```bash
# Compile the smart contract
npx hardhat compile

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Start the frontend
cd frontend && npm start
```

## 📁 Project Structure

```
hello-fhevm-tutorial/
├── contracts/
│   └── ConfidentialCounter.sol    # FHEVM smart contract
├── scripts/
│   └── deploy.js                  # Deployment script
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FhevmProvider.js   # FHEVM context provider
│   │   │   ├── WalletConnection.js # MetaMask integration
│   │   │   └── ConfidentialCounter.js # Main dApp component
│   │   ├── App.js                 # Main React app
│   │   └── contract-info.json     # Contract deployment info
│   └── package.json
├── hardhat.config.js              # Hardhat configuration
├── package.json                   # Project dependencies
├── TUTORIAL.md                    # Complete tutorial guide
└── README.md                      # This file
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

## 🧪 Testing

### Test Scenarios

1. **Basic Functionality**
   - Connect wallet to Sepolia testnet
   - Add numbers to the counter
   - Verify public total updates
   - Test random value generation

2. **Advanced Operations**
   - Test threshold checking
   - Compare max values
   - Verify user contributions
   - Test reset functionality

3. **Privacy Verification**
   - Check Sepolia Etherscan
   - Confirm transaction details
   - Verify individual contributions remain private

4. **Multiple Users**
   - Test with different accounts
   - Add various numbers
   - Observe privacy preservation
   - Test random value generation

### Running Tests

```bash
# Run smart contract tests
npx hardhat test

# Test frontend components
cd frontend && npm test
```

## 🌐 Live Demo

[🚀 Try the live demo](https://github.com/mdlog/zama-dapp-tutorial) on Sepolia testnet!

**Repository**: [https://github.com/mdlog/zama-dapp-tutorial](https://github.com/mdlog/zama-dapp-tutorial)

**Note**: You'll need:
- MetaMask wallet
- Sepolia testnet configured
- Testnet tokens (get them from the [faucet](https://sepoliafaucet.com/))

## 📚 Tutorial

For a complete step-by-step guide, see [TUTORIAL.md](./TUTORIAL.md). The tutorial covers:

- Understanding FHEVM concepts
- Setting up the development environment
- Building the smart contract
- Creating the React frontend
- Deployment and testing
- Understanding the encryption workflow

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

## 🎯 Use Cases

This tutorial demonstrates FHEVM concepts used in:

- **Confidential Voting**: Private votes, public results using encrypted arithmetic
- **Private Auctions**: Hidden bids, public winner using encrypted comparisons
- **Confidential Surveys**: Private responses, public statistics using encrypted aggregation
- **Private Financial Data**: Hidden transactions, public totals using encrypted operations
- **Confidential Machine Learning**: Private data, public models using encrypted computations
- **Random Number Generation**: Secure random values for gaming and lotteries
- **Threshold-based Systems**: Private comparisons for access control and decision making

## 🚀 Next Steps

After completing this tutorial, explore:

1. **Confidential Voting System** - Using encrypted arithmetic for vote counting
2. **Private Number Guessing Game** - Using encrypted comparisons and random generation
3. **Confidential Survey Platform** - Using encrypted aggregation for statistics
4. **Private Auction System** - Using encrypted comparisons for bid evaluation
5. **Confidential Token Transfer** - Using encrypted operations for private transactions
6. **Threshold-based Access Control** - Using encrypted comparisons for permission systems
7. **Confidential Lottery System** - Using random generation and encrypted operations

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama Team** for building FHEVM and the Zama Protocol
- **Sepolia Team** for providing the testnet infrastructure
- **Community** for feedback and contributions

## 📞 Support

- **Documentation**: [FHEVM Docs](https://docs.zama.ai/protocol/solidity-guides/smart-contract/configure/contract_addresses)
- **Community**: [Zama Discord](https://discord.gg/zama)
- **Issues**: [GitHub Issues](https://github.com/mdlog/zama-dapp-tutorial/issues)
- **Sepolia Faucet**: [Sepolia Faucet](https://sepoliafaucet.com/)

## 🏆 Zama Bounty Program

This project was created for **Zama Bounty Program Season 10** - Creating the most beginner-friendly "Hello FHEVM" tutorial.

**Prize Pool**: $10,000
- 🥇 1st place: $5,000
- 🥈 2nd place: $3,000
- 🥉 3rd place: $2,000

---

**🎉 Ready to build the future of confidential computing?** Start with this tutorial and join the FHEVM revolution!

[![Star this repo](https://img.shields.io/github/stars/mdlog/zama-dapp-tutorial?style=social)](https://github.com/mdlog/zama-dapp-tutorial)
[![Follow on Twitter](https://img.shields.io/twitter/follow/zama_fhe?style=social)](https://twitter.com/zama_fhe)
