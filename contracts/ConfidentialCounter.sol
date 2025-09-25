// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@fhenixprotocol/fhevm/contracts/FHE.sol";
import "@fhenixprotocol/fhevm/contracts/access/Permissioned.sol";

/**
 * @title ConfidentialCounter
 * @dev A simple FHEVM dApp that demonstrates confidential computation
 * 
 * This contract allows users to:
 * 1. Add encrypted numbers to a confidential counter
 * 2. View the public total (but not individual contributions)
 * 3. Reset the counter (only by the owner)
 * 
 * This demonstrates the core FHEVM workflow:
 * Encryption → Computation → Decryption
 */
contract ConfidentialCounter is Permissioned {
    // The confidential counter that stores encrypted values
    euint32 private confidentialCounter;
    
    // Public total for transparency (but individual contributions remain private)
    uint32 public publicTotal;
    
    // Owner of the contract
    address public owner;
    
    // Events for transparency
    event CounterIncremented(address indexed user, uint32 publicTotal);
    event CounterReset(address indexed owner);
    
    constructor() {
        owner = msg.sender;
        // Initialize the confidential counter to 0
        confidentialCounter = FHE.asEuint32(0);
        publicTotal = 0;
    }
    
    /**
     * @dev Add an encrypted number to the confidential counter
     * @param encryptedValue The encrypted number to add
     */
    function addToCounter(inEuint32 calldata encryptedValue) public {
        // Add the encrypted value to our confidential counter
        confidentialCounter = confidentialCounter + encryptedValue;
        
        // Decrypt the result to update the public total
        // This is safe because we're only revealing the total, not individual contributions
        publicTotal = FHE.decrypt(confidentialCounter);
        
        emit CounterIncremented(msg.sender, publicTotal);
    }
    
    /**
     * @dev Get the current public total
     * @return The decrypted total of all contributions
     */
    function getPublicTotal() public view returns (uint32) {
        return publicTotal;
    }
    
    /**
     * @dev Reset the counter (only owner can do this)
     */
    function resetCounter() public onlyOwner {
        confidentialCounter = FHE.asEuint32(0);
        publicTotal = 0;
        emit CounterReset(msg.sender);
    }
    
    /**
     * @dev Get the encrypted counter value (for advanced use cases)
     * @return The encrypted counter value
     */
    function getEncryptedCounter() public view returns (euint32) {
        return confidentialCounter;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}
