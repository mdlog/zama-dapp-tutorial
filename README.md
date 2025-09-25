# 🔐 Hello FHEVM - Your First Confidential dApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FHEVM](https://img.shields.io/badge/FHEVM-v0.1.0-blue.svg)](https://github.com/fhenixprotocol/fhevm)
[![Zama Protocol](https://img.shields.io/badge/Zama-Protocol-green.svg)](https://www.zama.ai/)

> **The most beginner-friendly tutorial for building your first confidential dApp using FHEVM**

This project demonstrates how to build a **Confidential Counter** - a simple but powerful dApp that showcases the core concepts of Fully Homomorphic Encryption (FHE) on the blockchain. Users can add encrypted numbers to a shared counter while keeping their individual contributions completely private.

## 🎯 What You'll Build

- **🔒 Confidential Smart Contract**: Add encrypted numbers without revealing individual values
- **🌐 React Frontend**: Beautiful, user-friendly interface for interacting with encrypted data
- **⚡ Real-time Updates**: See your encrypted transactions update the public total instantly
- **🛡️ Privacy by Design**: Individual contributions remain private, only totals are public

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
    // Encrypted counter - individual values remain private
    euint32 private confidentialCounter;
    
    // Public total - only the sum is revealed
    uint32 public publicTotal;
    
    // Add encrypted number to counter
    function addToCounter(inEuint32 calldata encryptedValue) external;
    
    // Get current public total
    function getPublicTotal() external view returns (uint32);
    
    // Reset counter (owner only)
    function resetCounter() external;
}
```

### Frontend Features

- **🔗 Wallet Connection**: Seamless MetaMask integration
- **🎨 Beautiful UI**: Modern, responsive design
- **📱 Mobile Friendly**: Works on all devices
- **🔄 Real-time Updates**: Live transaction status and updates
- **🔍 Transaction Explorer**: Direct links to blockchain explorer

## 🧪 Testing

### Test Scenarios

1. **Basic Functionality**
   - Connect wallet
   - Add encrypted numbers
   - Verify public total updates

2. **Privacy Verification**
   - Check blockchain explorer
   - Confirm encrypted inputs
   - Verify private individual values

3. **Multiple Users**
   - Test with different accounts
   - Add various numbers
   - Observe privacy preservation

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
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

### Network Configuration

The project is configured for:
- **Sepolia Testnet**: Chain ID 11155111
- **RPC URL**: https://sepolia.infura.io/v3/YOUR_INFURA_KEY
- **Block Explorer**: https://sepolia.etherscan.io

## 🎯 Use Cases

This tutorial demonstrates concepts used in:

- **Confidential Voting**: Private votes, public results
- **Private Auctions**: Hidden bids, public winner
- **Confidential Surveys**: Private responses, public statistics
- **Private Financial Data**: Hidden transactions, public totals
- **Confidential Machine Learning**: Private data, public models

## 🚀 Next Steps

After completing this tutorial, explore:

1. **Confidential Voting System**
2. **Private Number Guessing Game**
3. **Confidential Survey Platform**
4. **Private Auction System**
5. **Confidential Token Transfer**

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

- **Documentation**: [FHEVM Docs](https://docs.zama.ai/fhevm)
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
