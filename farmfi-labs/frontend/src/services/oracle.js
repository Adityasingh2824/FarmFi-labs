import { AptosClient } from 'aptos';
import axios from 'axios';

const NODE_URL = 'https://fullnode.devnet.aptoslabs.com'; // Replace with your Aptos node URL
const aptosClient = new AptosClient(NODE_URL);

// Oracle URL and Contract Info
const ORACLE_API_URL = 'https://api.example-oracle.com/data'; // Replace with your actual oracle API URL
const CONTRACT_ADDRESS = '0x...'; // Replace with your contract address
const MODULE_NAME = 'OracleModule'; // Replace with your module name

// Function to fetch data from an off-chain oracle
export const fetchOracleData = async () => {
    try {
        const response = await axios.get(ORACLE_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from oracle:', error);
        throw error;
    }
};

// Function to submit oracle data to the blockchain
export const submitOracleDataToChain = async (account, oracleData) => {
    try {
        // Create the transaction payload
        const payload = {
            type: 'entry_function_payload',
            function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::update_oracle_data`,
            type_arguments: [],
            arguments: [oracleData],
        };

        // Create a transaction request
        const txnRequest = await aptosClient.generateTransaction(account.address(), payload);
        const signedTxn = await aptosClient.signTransaction(account, txnRequest);
        const transactionResult = await aptosClient.submitTransaction(signedTxn);
        await aptosClient.waitForTransaction(transactionResult.hash);
        return transactionResult;
    } catch (error) {
        console.error('Error submitting oracle data to blockchain:', error);
        throw error;
    }
};

// Function to get the latest oracle data on-chain
export const getOracleDataOnChain = async () => {
    try {
        const resources = await aptosClient.getAccountResources(CONTRACT_ADDRESS);
        const oracleResource = resources.find(resource => resource.type === `${CONTRACT_ADDRESS}::${MODULE_NAME}::OracleData`);
        return oracleResource.data;
    } catch (error) {
        console.error('Error fetching oracle data on-chain:', error);
        throw error;
    }
};
