
# **FarmFi Labs**

### **Tokenization of Agricultural Commodities on Aptos Blockchain**

---

## **Table of Contents**
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Smart Contracts Overview](#smart-contracts-overview)
5. [System Architecture](#system-architecture)
6. [Frontend Setup](#frontend-setup)
7. [Backend & Smart Contract Setup](#backend--smart-contract-setup)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)

---

## **Project Overview**

**FarmFi Labs** is a decentralized platform built on the **Aptos blockchain** that allows farmers and traders to tokenize their agricultural commodities. It provides a secure, transparent marketplace where users can trade tokenized assets, participate in governance, and stake tokens for rewards. The platform utilizes **Move** smart contracts to ensure decentralized and efficient operations.

---

## **Key Features**

- **Tokenization of Agricultural Assets**: Allows farmers to tokenize their grain and agricultural products, making them tradable assets.
- **Staking Mechanism**: Users can stake their tokens to earn rewards and support the network.
- **Marketplace**: A decentralized marketplace where tokenized commodities can be traded.
- **Governance**: Token holders participate in decision-making by voting on governance proposals.
- **Decentralized Finance (DeFi)**: Features such as yield farming and lending for merchants and farmers.

---

## **Tech Stack**

### **Blockchain**
- **Aptos Blockchain**: The base blockchain for secure and scalable transactions.
- **Aptos Move**: The smart contract programming language used to build the platform.

### **Frontend**
- **React.js**: The JavaScript framework for building the user interface.
- **Aptos Wallet Adapter**: To integrate Aptos-based wallets like Petra and Martian.

### **Backend**
- **Node.js**: For backend operations and smart contract interactions.
- **Express.js**: To manage the API and server-side logic.

### **Storage**
- **IPFS**: Decentralized storage for storing commodity data and metadata.

---

## **Smart Contracts Overview**

The project uses various **Move** smart contracts on the **Aptos Blockchain** to handle key functionalities:

1. **Token Contract** (`token.move`):
   - Implements the logic for minting, transferring, and burning the platform’s tokens.
   - Interacts with the frontend for token-related actions like transfers and balances.

2. **Staking Contract** (`stake_tokens.move`):
   - Manages token staking, allowing users to stake their tokens for rewards.
   - Frontend interacts with the contract to display staking information and initiate staking/unstaking.

3. **Governance Contract** (`governance_proposal.move`):
   - Implements decentralized governance, allowing token holders to propose and vote on changes.
   - Interacts with the frontend for proposal creation and voting.

4. **Marketplace Contract** (`marketplace_trade.move`):
   - Facilitates the buying and selling of tokenized agricultural commodities.
   - Manages listings, offers, and trades on the platform.

5. **Initialization Contract** (`initialize.move`):
   - Initializes the token, staking, governance, and marketplace contracts when the system is deployed.

---

## **System Architecture**

### **Frontend**
The frontend is a React-based web application that connects to the **Aptos blockchain** via wallet adapters. It allows users to interact with tokenization, staking, governance, and marketplace functionalities in a user-friendly way.

### **Backend**
The backend, built with Node.js and Express.js, manages API calls, handles requests between the frontend and blockchain, and interacts with decentralized storage like **IPFS**.

### **Smart Contracts**
The smart contracts are deployed on the **Aptos Testnet** and manage the core functionalities of the platform, such as token transactions, staking, governance, and the marketplace.

---

## **Frontend Setup**

### **Prerequisites**
- **Node.js**: v16.0 or above
- **npm**: v7.0 or above
- **Aptos Wallet**: For connecting to the Aptos blockchain (Petra or Martian)

### **Steps to Run the Frontend Locally**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/farmfi-labs.git
   cd farmfi-labs
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file and add the following variables:
   ```
   REACT_APP_APTOS_NETWORK=testnet
   REACT_APP_APTOS_PRIVATE_KEY=<YOUR_TESTNET_PRIVATE_KEY>
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Access the Web Application**:
   Open your browser and go to `http://localhost:3000`.

---

## **Backend & Smart Contract Setup**

### **Prerequisites**
- **Aptos CLI**: Required to interact with the Aptos blockchain.
- **Move Framework**: For compiling and deploying smart contracts.

### **Steps to Deploy Smart Contracts on Aptos Testnet**

1. **Install Aptos CLI**:
   ```bash
   aptos init
   ```

2. **Compile and Deploy Contracts**:
   Navigate to the `contracts` directory and compile the contracts:
   ```bash
   aptos move compile
   aptos move publish --network testnet
   ```

3. **Set Up Backend**:
   - Add configuration details for blockchain interaction in the `backend/.env` file:
     ```
     APTOS_NETWORK=testnet
     APTOS_PRIVATE_KEY=<YOUR_PRIVATE_KEY>
     ```

4. **Run Backend**:
   ```bash
   npm run server
   ```

---

## **Testing**

### **Unit Testing for Smart Contracts**

Run tests for Move contracts:
```bash
aptos move test
```

### **Frontend Tests**

Run frontend tests with Jest:
```bash
npm run test
```

---

## **Deployment**

### **Smart Contracts Deployment**

The contracts are deployed on the **Aptos Testnet**. Follow the steps under "Backend & Smart Contract Setup" to deploy your contracts.

### **Frontend Deployment on Netlify**

You can deploy the frontend using Netlify or any other static site hosting platform:

1. **Install the Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy the Site**:
   ```bash
   netlify deploy
   ```

---

## **Contributing**

We welcome contributions from the community. Here’s how you can contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Make your changes and commit (`git commit -m 'Added feature xyz'`).
4. Push your branch (`git push origin feature-xyz`).
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## **Contact**

For inquiries and support, feel free to reach out:

- **Email**: support@farmfi-labs.com
- **Community Discord**: [FarmFi Labs](https://discord.gg/your-invite-link)

---

