// helper.js

import { DATE_FORMAT, TIME_FORMAT, EMAIL_REGEX, PASSWORD_REGEX } from './constants';
import dayjs from 'dayjs';

// Function to format date
export const formatDate = (date) => {
    return dayjs(date).format(DATE_FORMAT);
};

// Function to format time
export const formatTime = (time) => {
    return dayjs(time).format(TIME_FORMAT);
};

// Function to format numbers with commas (e.g., 1,000,000)
export const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Function to validate email
export const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
};

// Function to validate password
export const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
};

// Function to calculate the total value of tokenized assets
export const calculateTotalTokenizedValue = (assets) => {
    return assets.reduce((total, asset) => total + asset.value, 0);
};

// Function to calculate the total grain reserve
export const calculateTotalGrainReserve = (reserves) => {
    return reserves.reduce((total, reserve) => total + reserve.amount, 0);
};

// Function to get the initials from a user's name
export const getUserInitials = (name) => {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0].toUpperCase()).join('');
    return initials.length > 2 ? initials.slice(0, 2) : initials;
};

// Function to truncate a string with ellipsis if it exceeds a certain length
export const truncateString = (string, maxLength) => {
    if (string.length <= maxLength) return string;
    return `${string.substring(0, maxLength)}...`;
};

// Function to convert Unix timestamp to a human-readable format
export const convertUnixTimestamp = (timestamp) => {
    return dayjs.unix(timestamp).format(`${DATE_FORMAT} ${TIME_FORMAT}`);
};

// Function to check if an object is empty
export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
};

// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};
