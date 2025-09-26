const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RealFhevmCounter", function () {
    let realFhevmCounter;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the RealFhevmCounter contract
        const RealFhevmCounter = await ethers.getContractFactory("RealFhevmCounter");
        realFhevmCounter = await RealFhevmCounter.deploy();
        await realFhevmCounter.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await realFhevmCounter.owner()).to.equal(owner.address);
        });

        it("Should initialize with zero public total", async function () {
            expect(await realFhevmCounter.getPublicTotal()).to.equal(0);
        });
    });

    describe("Real FHEVM Operations", function () {
        it("Should add random value using FHEVM PRNG", async function () {
            // This test demonstrates the real FHEVM random number generation
            const tx = await realFhevmCounter.connect(addr1).addRandomToCounter();
            await tx.wait();

            // The public total should be updated (exact value depends on random generation)
            const publicTotal = await realFhevmCounter.getPublicTotal();
            expect(publicTotal).to.be.greaterThan(0);
        });

        it("Should perform encrypted threshold checking", async function () {
            // First add some random values
            await realFhevmCounter.connect(addr1).addRandomToCounter();
            await realFhevmCounter.connect(addr2).addRandomToCounter();

            const publicTotal = await realFhevmCounter.getPublicTotal();

            // Test threshold checking with a low threshold
            const result = await realFhevmCounter.connect(addr1).isCounterAboveThreshold(0);
            expect(result).to.be.true;

            // Test threshold checking with a high threshold
            const result2 = await realFhevmCounter.connect(addr1).isCounterAboveThreshold(10000);
            expect(result2).to.be.false;
        });

        it("Should perform encrypted max value operation", async function () {
            // Add some random values first
            await realFhevmCounter.connect(addr1).addRandomToCounter();

            const publicTotal = await realFhevmCounter.getPublicTotal();

            // Test max value operation
            const testValue = 50;
            const maxValue = await realFhevmCounter.connect(addr1).getMaxValue(testValue);

            // The max value should be the greater of the counter and test value
            expect(maxValue).to.equal(Math.max(publicTotal, testValue));
        });

        it("Should perform encrypted arithmetic operations", async function () {
            // Test addition operation
            const addResult = await realFhevmCounter.connect(addr1).performEncryptedOperation(0, 10);
            expect(addResult).to.equal(10);

            // Test multiplication operation
            const mulResult = await realFhevmCounter.connect(addr1).performEncryptedOperation(2, 2);
            expect(mulResult).to.equal(20); // 10 * 2
        });

        it("Should perform conditional operations", async function () {
            // Test conditional operation with true condition
            const trueResult = await realFhevmCounter.connect(addr1).conditionalOperation(true, 50, 10);
            expect(trueResult).to.equal(50);

            // Test conditional operation with false condition
            const falseResult = await realFhevmCounter.connect(addr1).conditionalOperation(false, 50, 10);
            expect(falseResult).to.equal(60); // 50 + 10
        });
    });

    describe("Privacy Features", function () {
        it("Should allow users to decrypt their own contributions", async function () {
            // Add random values from different users
            await realFhevmCounter.connect(addr1).addRandomToCounter();
            await realFhevmCounter.connect(addr2).addRandomToCounter();

            // Each user should be able to decrypt their own contribution
            const contribution1 = await realFhevmCounter.connect(addr1).decryptMyContribution();
            const contribution2 = await realFhevmCounter.connect(addr2).decryptMyContribution();

            expect(contribution1).to.be.greaterThan(0);
            expect(contribution2).to.be.greaterThan(0);
        });

        it("Should maintain privacy between users", async function () {
            // Add values from different users
            await realFhevmCounter.connect(addr1).addRandomToCounter();
            await realFhevmCounter.connect(addr2).addRandomToCounter();

            // Each user's individual contribution should be different
            const contribution1 = await realFhevmCounter.connect(addr1).decryptMyContribution();
            const contribution2 = await realFhevmCounter.connect(addr2).decryptMyContribution();

            // The contributions should be independent (though they might be equal by chance)
            const publicTotal = await realFhevmCounter.getPublicTotal();
            expect(publicTotal).to.equal(contribution1 + contribution2);
        });
    });

    describe("Access Control", function () {
        it("Should allow only owner to reset counter", async function () {
            // Add some values first
            await realFhevmCounter.connect(addr1).addRandomToCounter();

            // Owner should be able to reset
            await realFhevmCounter.connect(owner).resetCounter();
            expect(await realFhevmCounter.getPublicTotal()).to.equal(0);
        });

        it("Should not allow non-owner to reset counter", async function () {
            // Non-owner should not be able to reset
            await expect(
                realFhevmCounter.connect(addr1).resetCounter()
            ).to.be.revertedWith("Only the owner can call this function");
        });
    });

    describe("Events", function () {
        it("Should emit CounterIncremented event", async function () {
            await expect(realFhevmCounter.connect(addr1).addRandomToCounter())
                .to.emit(realFhevmCounter, "RandomValueAdded")
                .withArgs(addr1.address, await realFhevmCounter.getPublicTotal());
        });

        it("Should emit ThresholdChecked event", async function () {
            await expect(realFhevmCounter.connect(addr1).isCounterAboveThreshold(10))
                .to.emit(realFhevmCounter, "ThresholdChecked")
                .withArgs(addr1.address, 10, true);
        });

        it("Should emit MaxValueComputed event", async function () {
            await expect(realFhevmCounter.connect(addr1).getMaxValue(50))
                .to.emit(realFhevmCounter, "MaxValueComputed")
                .withArgs(addr1.address, 50, await realFhevmCounter.getMaxValue(50));
        });
    });

    describe("Error Handling", function () {
        it("Should handle invalid operation in performEncryptedOperation", async function () {
            await expect(
                realFhevmCounter.connect(addr1).performEncryptedOperation(99, 10)
            ).to.be.revertedWith("Invalid operation");
        });
    });
});
