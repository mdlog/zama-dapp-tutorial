const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ConfidentialCounter Integration Tests", function () {
    let confidentialCounter;
    let owner;
    let user1;
    let user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        const ConfidentialCounter = await ethers.getContractFactory("ConfidentialCounter");
        confidentialCounter = await ConfidentialCounter.deploy();
        await confidentialCounter.waitForDeployment();
    });

    describe("Contract Initialization", function () {
        it("Should initialize with correct default values", async function () {
            expect(await confidentialCounter.owner()).to.equal(owner.address);
            expect(await confidentialCounter.getPublicTotal()).to.equal(0);
        });

        it("Should have correct contract address", async function () {
            const contractAddress = await confidentialCounter.getAddress();
            expect(contractAddress).to.be.properAddress;
        });
    });

    describe("Access Control", function () {
        it("Should allow owner to reset counter", async function () {
            await expect(confidentialCounter.resetCounter())
                .to.emit(confidentialCounter, "CounterReset")
                .withArgs(owner.address);
        });

        it("Should not allow non-owner to reset counter", async function () {
            await expect(
                confidentialCounter.connect(user1).resetCounter()
            ).to.be.revertedWith("Only the owner can call this function");
        });

        it("Should not allow non-owner to reset counter from different account", async function () {
            await expect(
                confidentialCounter.connect(user2).resetCounter()
            ).to.be.revertedWith("Only the owner can call this function");
        });
    });

    describe("Contract State Management", function () {
        it("Should maintain state after reset", async function () {
            await confidentialCounter.resetCounter();
            expect(await confidentialCounter.getPublicTotal()).to.equal(0);
            expect(await confidentialCounter.owner()).to.equal(owner.address);
        });

        it("Should allow multiple resets", async function () {
            await confidentialCounter.resetCounter();
            await confidentialCounter.resetCounter();
            expect(await confidentialCounter.getPublicTotal()).to.equal(0);
        });
    });

    describe("Event Emissions", function () {
        it("Should emit CounterReset event with correct parameters", async function () {
            const tx = await confidentialCounter.resetCounter();
            const receipt = await tx.wait();

            const event = receipt.logs.find(log => {
                try {
                    const parsed = confidentialCounter.interface.parseLog(log);
                    return parsed.name === 'CounterReset';
                } catch (e) {
                    return false;
                }
            });

            expect(event).to.not.be.undefined;
        });
    });

    describe("Gas Usage", function () {
        it("Should use reasonable gas for reset operation", async function () {
            const tx = await confidentialCounter.resetCounter();
            const receipt = await tx.wait();

            // Gas usage should be reasonable (less than 100k gas)
            expect(receipt.gasUsed).to.be.lessThan(100000);
        });
    });

    describe("Contract Interface", function () {
        it("Should have all required functions", async function () {
            // Check that all required functions exist
            expect(typeof confidentialCounter.addToCounter).to.equal('function');
            expect(typeof confidentialCounter.getPublicTotal).to.equal('function');
            expect(typeof confidentialCounter.resetCounter).to.equal('function');
            expect(typeof confidentialCounter.owner).to.equal('function');
        });

        it("Should return correct data types", async function () {
            const total = await confidentialCounter.getPublicTotal();
            const ownerAddress = await confidentialCounter.owner();

            expect(typeof total).to.equal('bigint');
            expect(ownerAddress).to.be.properAddress;
        });
    });
});
