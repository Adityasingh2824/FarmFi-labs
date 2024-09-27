// constants.js

// API Endpoints
export const API_BASE_URL = 'https://api.farmfilabs.com'; // Replace with your actual API base URL
export const ORACLE_API_URL = 'https://api.example-oracle.com/data'; // Replace with your actual oracle API URL

// Aptos Blockchain
export const APTOS_NODE_URL = 'https://fullnode.devnet.aptoslabs.com'; // Replace with your Aptos node URL
export const CONTRACT_ADDRESS = '0x...'; // Replace with your smart contract address
export const MODULE_NAME = 'FarmFiModule'; // Replace with your smart contract module name

// Default Values
export const DEFAULT_TOKENIZED_ASSETS = [];
export const DEFAULT_GRAIN_RESERVES = [];
export const DEFAULT_RECENT_ACTIVITIES = [];

// UI Constants
export const SIDEBAR_WIDTH = 250; // Width of the sidebar in pixels
export const SIDEBAR_COLLAPSED_WIDTH = 60; // Collapsed width of the sidebar

// Date and Time Format
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm:ss';

// Error Messages
export const ERROR_FETCHING_DATA = 'An error occurred while fetching data. Please try again later.';
export const ERROR_SUBMITTING_DATA = 'An error occurred while submitting data. Please try again later.';

// Success Messages
export const SUCCESS_SUBMITTING_DATA = 'Data has been successfully submitted.';

// Regular Expressions
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number

// Color Constants
export const COLORS = {
    primaryGreen: '#033a1c',
    lightGreen: '#a1c045',
    darkGrey: '#333333',
    lightGrey: '#f4f4f4',
};

// Miscellaneous
export const TOKEN_NAME = 'GrainToken';
export const TOKEN_SYMBOL = 'GRN';
export const DEFAULT_CURRENCY = 'USD';
