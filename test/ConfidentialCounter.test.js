const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ConfidentialCounter", function () {
    let confidentialCounter;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // Get signers
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the contract
        const ConfidentialCounter = await ethers.getContractFactory("ConfidentialCounter");
        confidentialCounter = await ConfidentialCounter.deploy();
        await confidentialCounter.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await confidentialCounter.owner()).to.equal(owner.address);
        });

        it("Should initialize with zero public total", async function () {
            expect(await confidentialCounter.getPublicTotal()).to.equal(0);
        });
    });

    describe("Access Control", function () {
        it("Should allow owner to reset counter", async function () {
            // First add some value (this would normally be encrypted in real usage)
            // For testing, we'll simulate the behavior

            await confidentialCounter.resetCounter();
            expect(await confidentialCounter.getPublicTotal()).to.equal(0);
        });

        it("Should not allow non-owner to reset counter", async function () {
            await expect(
                confidentialCounter.connect(addr1).resetCounter()
            ).to.be.revertedWith("Only the owner can call this function");
        });
    });

    describe("Events", function () {
        it("Should emit CounterReset event when owner resets", async function () {
            await expect(confidentialCounter.resetCounter())
                .to.emit(confidentialCounter, "CounterReset")
                .withArgs(owner.address);
        });
    });

    describe("Contract State", function () {
        it("Should maintain contract state correctly", async function () {
            // Test that the contract maintains its state
            expect(await confidentialCounter.owner()).to.equal(owner.address);
            expect(await confidentialCounter.getPublicTotal()).to.equal(0);
        });
    });
});
