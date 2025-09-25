const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 Deploying ConfidentialCounter contract...");

    // Get the contract factory
    const ConfidentialCounter = await ethers.getContractFactory("ConfidentialCounter");

    // Deploy the contract
    const confidentialCounter = await ConfidentialCounter.deploy();

    // Wait for deployment to complete
    await confidentialCounter.waitForDeployment();

    const contractAddress = await confidentialCounter.getAddress();

    console.log("✅ ConfidentialCounter deployed to:", contractAddress);
    console.log("📋 Contract details:");
    console.log("   - Address:", contractAddress);
    console.log("   - Owner:", await confidentialCounter.owner());
    console.log("   - Initial Public Total:", await confidentialCounter.getPublicTotal());

    // Save deployment info for frontend
    const deploymentInfo = {
        contractAddress: contractAddress,
        network: "sepolia-testnet",
        deployedAt: new Date().toISOString(),
        owner: await confidentialCounter.owner()
    };

    const fs = require('fs');
    fs.writeFileSync(
        './frontend/src/contract-info.json',
        JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("💾 Contract info saved to frontend/src/contract-info.json");
    console.log("\n🎉 Deployment complete! You can now use the frontend to interact with your contract.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
