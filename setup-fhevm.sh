#!/bin/bash

# Hello FHEVM Tutorial - Real FHEVM Setup Script
# This script sets up the environment for real FHEVM development

echo "🔐 Hello FHEVM - Real FHEVM Setup"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install FHEVM dependencies
echo "🔐 Installing FHEVM dependencies..."
npm install fhevm @zama-fhe/relayer-sdk

# Install frontend dependencies
echo "🌐 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Environment Variables for Hello FHEVM Tutorial

# Private key for deployment (NEVER commit this to version control!)
PRIVATE_KEY=your_private_key_here

# RPC URLs
SEPOLIA_RPC_URL=https://eth-sepolia.public.blastapi.io
FHENIX_RPC_URL=https://api.testnet.fhenix.zone:7747

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

# FHEVM Configuration
FHEVM_CHAIN_ID=11155111
FHEVM_NETWORK_NAME=sepolia
EOF
    echo "⚠️  Please edit .env file and add your private key!"
else
    echo "✅ .env file already exists"
fi

# Compile contracts
echo "🔨 Compiling smart contracts..."
npx hardhat compile

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📋 Next Steps:"
echo "1. Edit .env file and add your private key"
echo "2. Get Sepolia testnet tokens from: https://sepoliafaucet.com/"
echo "3. Deploy educational version: npm run deploy -- --network sepolia"
echo "4. Deploy real FHEVM version: npm run deploy-real -- --network sepolia"
echo "5. Start frontend: cd frontend && npm start"
echo ""
echo "🔗 Useful Links:"
echo "- Sepolia Faucet: https://sepoliafaucet.com/"
echo "- FHEVM Documentation: https://docs.zama.ai/protocol/solidity-guides/smart-contract/configure/contract_addresses"
echo "- Zama Community: https://discord.gg/zama"
echo ""
echo "🚀 Ready to build with real FHEVM!"
