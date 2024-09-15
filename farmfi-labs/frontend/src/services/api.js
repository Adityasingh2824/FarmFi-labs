import axios from 'axios';

const API_BASE_URL = 'https://api.farmfilabs.com'; // Replace with your actual API base URL

// Function to get tokenized assets
export const getTokenizedAssets = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tokenized-assets`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tokenized assets:', error);
        throw error;
    }
};

// Function to get grain reserves
export const getGrainReserves = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/grain-reserves`);
        return response.data;
    } catch (error) {
        console.error('Error fetching grain reserves:', error);
        throw error;
    }
};

// Function to get user profile data
export const getUserProfile = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user profile for user ID ${userId}:`, error);
        throw error;
    }
};

// Function to fetch recent activities
export const getRecentActivities = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recent-activities`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recent activities:', error);
        throw error;
    }
};

// Function to post new data to the server (e.g., new tokenization request)
export const createTokenizationRequest = async (tokenizationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tokenization`, tokenizationData);
        return response.data;
    } catch (error) {
        console.error('Error creating tokenization request:', error);
        throw error;
    }
};

// Function to authenticate user (login)
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
