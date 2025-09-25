#!/bin/bash

# Hello FHEVM Tutorial Setup Script
# This script sets up the development environment for the Hello FHEVM tutorial

echo "🚀 Setting up Hello FHEVM Tutorial..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "⚠️  Please edit .env file and add your private key and RPC URL"
else
    echo "✅ .env file already exists"
fi

# Compile smart contracts
echo "🔨 Compiling smart contracts..."
npx hardhat compile

if [ $? -ne 0 ]; then
    echo "❌ Failed to compile smart contracts"
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file and add your private key"
echo "2. Get testnet tokens from: https://sepoliafaucet.com/"
echo "3. Deploy the contract: npx hardhat run scripts/deploy.js --network sepolia"
echo "4. Start the frontend: cd frontend && npm start"
echo ""
echo "📚 Read the tutorial: TUTORIAL.md"
echo "📖 Read the README: README.md"
echo ""
echo "🔗 Useful links:"
echo "   - Sepolia Testnet: https://sepolia.etherscan.io/"
echo "   - Faucet: https://sepoliafaucet.com/"
echo "   - FHEVM Docs: https://docs.zama.ai/fhevm"
echo "   - Zama Community: https://discord.gg/zama"
echo ""
echo "Happy coding! 🚀"
