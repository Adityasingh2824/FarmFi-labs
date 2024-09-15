import { AptosClient, AptosAccount, HexString, BCS } from 'aptos';

const NODE_URL = 'https://fullnode.devnet.aptoslabs.com'; // Replace with your Aptos node URL
const aptosClient = new AptosClient(NODE_URL);

// Initialize your contract address and module name
const CONTRACT_ADDRESS = '0x...'; // Replace with your contract address
const MODULE_NAME = 'FarmFiModule'; // Replace with your module name

// Function to get tokenized assets on the blockchain
export const getTokenizedAssetsOnChain = async () => {
    try {
        const resources = await aptosClient.getAccountResources(CONTRACT_ADDRESS);
        const tokenizedAssetsResource = resources.find(resource => resource.type === `${CONTRACT_ADDRESS}::${MODULE_NAME}::TokenizedAssets`);
        return tokenizedAssetsResource.data;
    } catch (error) {
        console.error('Error fetching tokenized assets on-chain:', error);
        throw error;
    }
};

// Function to get grain reserves on the blockchain
export const getGrainReservesOnChain = async () => {
    try {
        const resources = await aptosClient.getAccountResources(CONTRACT_ADDRESS);
        const grainReservesResource = resources.find(resource => resource.type === `${CONTRACT_ADDRESS}::${MODULE_NAME}::GrainReserves`);
        return grainReservesResource.data;
    } catch (error) {
        console.error('Error fetching grain reserves on-chain:', error);
        throw error;
    }
};

// Function to submit a tokenization transaction
export const submitTokenizationTransaction = async (account, tokenizationData) => {
    try {
        // Create the transaction payload
        const payload = {
            type: 'entry_function_payload',
            function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::create_tokenization`,
            type_arguments: [],
            arguments: [tokenizationData],
        };

        // Create a transaction request
        const txnRequest = await aptosClient.generateTransaction(account.address(), payload);
        const signedTxn = await aptosClient.signTransaction(account, txnRequest);
        const transactionResult = await aptosClient.submitTransaction(signedTxn);
        await aptosClient.waitForTransaction(transactionResult.hash);
        return transactionResult;
    } catch (error) {
        console.error('Error submitting tokenization transaction:', error);
        throw error;
    }
};

// Function to create a new Aptos account (register a new user)
export const createAptosAccount = async () => {
    try {
        const account = new AptosAccount();
        console.log('New Aptos Account Created:', account);
        return account;
    } catch (error) {
        console.error('Error creating Aptos account:', error);
        throw error;
    }
};

// Function to get recent transactions for an account
export const getRecentTransactions = async (accountAddress) => {
    try {
        const transactions = await aptosClient.getAccountTransactions(accountAddress);
        return transactions;
    } catch (error) {
        console.error(`Error fetching transactions for account ${accountAddress}:`, error);
        throw error;
    }
};
