import axios from 'axios';

export const registerUser = async (userData) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local/register`, userData);
};

export const loginUser = async (userData) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local`, userData);
};
