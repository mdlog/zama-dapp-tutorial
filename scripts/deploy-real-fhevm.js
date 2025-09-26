const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 Deploying Real FHEVM Counter Contract...");

    // Get the contract factory
    const RealFhevmCounter = await ethers.getContractFactory("RealFhevmCounter");

    // Deploy the contract
    console.log("📝 Deploying contract...");
    const realFhevmCounter = await RealFhevmCounter.deploy();

    // Wait for deployment to complete
    await realFhevmCounter.waitForDeployment();

    const contractAddress = await realFhevmCounter.getAddress();

    console.log("✅ Real FHEVM Counter deployed successfully!");
    console.log("📍 Contract Address:", contractAddress);
    console.log("🌐 Network:", network.name);
    console.log("⛽ Gas Used:", (await realFhevmCounter.deploymentTransaction().wait()).gasUsed.toString());

    // Save contract info to frontend
    const contractInfo = {
        address: contractAddress,
        network: network.name,
        chainId: network.config.chainId,
        deployedAt: new Date().toISOString(),
        contractName: "RealFhevmCounter",
        features: [
            "Real encrypted data types (euint32, ebool)",
            "FHE operations (TFHE.add, TFHE.gt, TFHE.max, TFHE.randEuint32)",
            "Encrypted inputs with proofs",
            "Selective decryption",
            "Advanced FHE operations (arithmetic, conditional)",
            "Privacy-preserving computation"
        ]
    };

    // Write to frontend contract info file
    const fs = require('fs');
    const path = require('path');

    const frontendPath = path.join(__dirname, '../frontend/src/contract-info.json');
    fs.writeFileSync(frontendPath, JSON.stringify(contractInfo, null, 2));

    console.log("💾 Contract info saved to frontend/src/contract-info.json");

    // Verify contract on Etherscan (if on mainnet/testnet)
    if (network.name !== "hardhat" && network.name !== "localhost") {
        console.log("🔍 Verifying contract on Etherscan...");
        try {
            await hre.run("verify:verify", {
                address: contractAddress,
                constructorArguments: [],
            });
            console.log("✅ Contract verified on Etherscan!");
        } catch (error) {
            console.log("⚠️ Contract verification failed:", error.message);
        }
    }

    console.log("\n🎉 Deployment Complete!");
    console.log("📋 Next Steps:");
    console.log("1. Update the contract address in RealFhevmCounter.js");
    console.log("2. Start the frontend: cd frontend && npm start");
    console.log("3. Connect your wallet to Sepolia testnet");
    console.log("4. Test the real FHEVM functionality!");

    console.log("\n🔗 Useful Links:");
    if (network.name === "sepolia") {
        console.log(`📊 Etherscan: https://sepolia.etherscan.io/address/${contractAddress}`);
    }

    return contractAddress;
}

// Handle errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
