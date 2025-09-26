# 🔓 Panduan Decrypt Nomor Individual User

## 📋 Overview

Dokumen ini menjelaskan bagaimana mendecrypt nomor yang di-input oleh individu dalam sistem FHEVM. Dalam implementasi FHEVM yang sesungguhnya, hanya user yang memiliki akses ke private key yang bisa mendecrypt data mereka sendiri.

## 🔐 Konsep Decrypt Individual

### 1. **Privasi Data Individual**
- Setiap user memiliki kontribusi yang di-encrypt secara terpisah
- Hanya user yang memiliki private key yang bisa mendecrypt data mereka
- Data individual tetap private meskipun total sum menjadi public

### 2. **Selective Decryption**
- **Public Decryption**: Total sum di-decrypt untuk transparansi
- **Private Decryption**: Individual contributions hanya bisa di-decrypt oleh owner
- **Access Control**: Smart contract mengatur siapa yang bisa decrypt apa

## 🛠️ Implementasi Decrypt Individual

### **Smart Contract (FHEVM Asli)**

```solidity
contract RealFhevmCounter {
    // Mapping untuk menyimpan encrypted contributions per user
    mapping(address => euint32) private encryptedUserContributions;
    
    // Function untuk decrypt kontribusi individual user
    function decryptMyContribution() public view returns (uint32) {
        // Hanya user yang memiliki private key yang bisa decrypt
        euint32 myEncryptedContribution = encryptedUserContributions[msg.sender];
        return TFHE.decrypt(myEncryptedContribution);
    }
    
    // Function untuk decrypt kontribusi user lain (dengan permission)
    function decryptUserContribution(address user) public view returns (uint32) {
        require(hasDecryptPermission(msg.sender, user), "No permission to decrypt");
        euint32 encryptedContribution = encryptedUserContributions[user];
        return TFHE.decrypt(encryptedContribution);
    }
}
```

### **Frontend Implementation**

```javascript
// Fungsi untuk decrypt kontribusi individual user
const decryptIndividualContribution = async () => {
    try {
        // 1. Dapatkan alamat user yang sedang terhubung
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        
        // 2. Panggil smart contract untuk decrypt kontribusi user
        const encryptedContribution = await contract.getEncryptedUserContribution(userAddress);
        
        // 3. Decrypt menggunakan FHEVM
        const decryptedContribution = await fhevm.decrypt(encryptedContribution);
        
        // 4. Tampilkan hasil
        setUserContribution({
            address: userAddress,
            contribution: decryptedContribution
        });
        
    } catch (error) {
        console.error('Decryption failed:', error);
    }
};
```

## 🔄 Workflow Decrypt Individual

### **Step 1: User Input**
```
User memasukkan angka: 42
```

### **Step 2: Client-side Encryption**
```javascript
// Encrypt di frontend menggunakan FHEVM
const encryptedValue = await fhevm.encrypt(42);
const proof = await fhevm.generateProof(encryptedValue);
```

### **Step 3: Send to Smart Contract**
```javascript
// Kirim encrypted data ke smart contract
const tx = await contract.addToCounter(encryptedValue, proof);
await tx.wait();
```

### **Step 4: Smart Contract Processing**
```solidity
// Smart contract menyimpan encrypted contribution
encryptedUserContributions[msg.sender] = TFHE.add(
    encryptedUserContributions[msg.sender], 
    verifiedValue
);
```

### **Step 5: Individual Decryption**
```javascript
// User bisa decrypt kontribusi mereka sendiri
const myContribution = await contract.decryptMyContribution();
console.log('My contribution:', myContribution); // 42
```

## 🎯 Fitur Decrypt Individual di Aplikasi

### **1. Button "👤 Decrypt My Input"**
- Mendecrypt kontribusi individual user yang sedang terhubung
- Menampilkan alamat user dan total kontribusi mereka
- Hanya user yang memiliki private key yang bisa decrypt

### **2. Tampilan Hasil Decrypt**
- **Your Address**: Alamat wallet user
- **Your Total Contribution**: Total kontribusi yang sudah di-decrypt
- **Note**: Penjelasan tentang selective decryption

### **3. Keamanan**
- Hanya user yang memiliki private key yang bisa decrypt data mereka
- Data user lain tetap encrypted dan tidak bisa diakses
- Smart contract mengatur permission untuk decrypt

## 🔒 Keamanan dan Privasi

### **1. Access Control**
```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can decrypt");
    _;
}

function decryptUserData(address user) public onlyOwner view returns (uint32) {
    return TFHE.decrypt(encryptedUserContributions[user]);
}
```

### **2. Permission System**
```solidity
mapping(address => mapping(address => bool)) private decryptPermissions;

function grantDecryptPermission(address user) public {
    decryptPermissions[msg.sender][user] = true;
}

function hasDecryptPermission(address requester, address target) public view returns (bool) {
    return decryptPermissions[target][requester];
}
```

### **3. Encryption Keys**
- Setiap user memiliki encryption key yang unik
- Private key diperlukan untuk decrypt data
- Public key digunakan untuk encrypt data

## 🚀 Cara Menggunakan

### **1. Connect Wallet**
- Pastikan MetaMask terhubung ke Sepolia testnet
- Pastikan wallet memiliki private key yang valid

### **2. Add Contributions**
- Masukkan angka (1-1000) dan klik "Add Encrypted Number"
- Atau klik "Add Random Value" untuk nilai random

### **3. Decrypt Individual Contribution**
- Klik tombol "👤 Decrypt My Input"
- Lihat kontribusi individual Anda yang sudah di-decrypt
- Hanya Anda yang bisa melihat kontribusi Anda

### **4. View Results**
- **Individual Contribution**: Kontribusi Anda yang sudah di-decrypt
- **Public Total**: Total semua kontribusi (public)
- **Privacy**: Kontribusi user lain tetap encrypted

## 📊 Contoh Output

```
👤 Individual Contribution Decrypted

Your Address: 0x6BbB59c971826380e0DDa7BD527154AC337780e9
Your Total Contribution: 142

Note: In real FHEVM, individual contributions would remain encrypted 
and only you (the owner) could decrypt your own data. This is a 
demonstration of selective decryption.
```

## 🔍 Perbedaan dengan Decrypt Total

| Aspect | Individual Decrypt | Total Decrypt |
|--------|-------------------|---------------|
| **Access** | Hanya owner data | Public |
| **Privacy** | Private | Public |
| **Permission** | Required | Not required |
| **Use Case** | Personal tracking | Transparency |
| **Security** | High | Low |

## 🎓 Learning Points

1. **Selective Decryption**: Hanya decrypt data yang diperlukan
2. **Access Control**: Mengatur siapa yang bisa decrypt apa
3. **Privacy Preservation**: Data individual tetap private
4. **User Ownership**: User memiliki kontrol penuh atas data mereka
5. **Transparency**: Total sum tetap transparan untuk audit

## 🔧 Technical Implementation

### **FHEVM Functions**
```javascript
// Encrypt individual input
const encrypted = await fhevm.encrypt(userInput);

// Decrypt individual contribution
const decrypted = await fhevm.decrypt(encryptedContribution);

// Verify ownership
const isOwner = await fhevm.verifyOwnership(encryptedData, userAddress);
```

### **Smart Contract Functions**
```solidity
// Store encrypted contribution
function addToCounter(externalEuint32 encryptedValue, bytes calldata proof) public {
    euint32 value = TFHE.asEuint32(encryptedValue, proof);
    encryptedUserContributions[msg.sender] = TFHE.add(
        encryptedUserContributions[msg.sender], 
        value
    );
}

// Decrypt individual contribution
function decryptMyContribution() public view returns (uint32) {
    return TFHE.decrypt(encryptedUserContributions[msg.sender]);
}
```

Ini adalah implementasi lengkap untuk decrypt nomor individual yang di-input oleh user dalam sistem FHEVM!
