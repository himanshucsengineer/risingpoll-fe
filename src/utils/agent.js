import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_APP_URL;

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


const get = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
};

const post = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
};


const patch = async (url, data) => {
  try {
    const response = await apiClient.patch(url, data);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
};

const del = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
};

const agent = {
  get,
  post,
  patch,
  del
};

export default agent;
