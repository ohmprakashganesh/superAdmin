// services/api.ts

import axios from 'axios';
import type { ApiResponse, Restaurant } from '../types/types';
 
 import { mockRestaurants } from '../mock/mockData';

const API_BASE_URL = 'https://byte-backend-r4tn.onrender.com/api';

 export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

 const mockData=mockRestaurants;
// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getRestaurants = async (): Promise<ApiResponse<Restaurant[]>> => {
  const response = await api.get('/super-admin/restaurants');
  return response.data;
};

export const getRestaurantById = async (id: string): Promise<ApiResponse<Restaurant>> => {
  const response = await api.get(`/super-admin/restaurants/${id}`);
  return response.data;
};

export const createRestaurant = async (restaurant: Restaurant): Promise<ApiResponse<Restaurant>> => {
  const response = await api.post('/super-admin/restaurants', restaurant);
  return response.data;
};

export const updateRestaurant = async (id: string, restaurant: Partial<Restaurant>): Promise<ApiResponse<Restaurant>> => {
  const response = await api.put(`/super-admin/restaurants/${id}`, restaurant);
  return response.data;
};

export const deleteRestaurant = async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete(`/super-admin/restaurants/${id}`);
  return response.data;
};