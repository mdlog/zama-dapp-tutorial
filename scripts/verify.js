const { run } = require("hardhat");

async function main() {
    console.log("🔍 Verifying ConfidentialCounter contract...");

    try {
        // Verify the contract on Fhenix testnet
        await run("verify:verify", {
            address: process.env.CONTRACT_ADDRESS,
            constructorArguments: [],
        });

        console.log("✅ Contract verified successfully!");
        console.log(`📋 Contract address: ${process.env.CONTRACT_ADDRESS}`);
        console.log(`🔗 View on explorer: https://testnet.fhenix.zone/address/${process.env.CONTRACT_ADDRESS}`);

    } catch (error) {
        if (error.message.includes("Already Verified")) {
            console.log("✅ Contract is already verified!");
        } else {
            console.error("❌ Verification failed:", error.message);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Verification script failed:", error);
        process.exit(1);
    });
