// services/api.ts

import axios from 'axios';
import type { ApiResponse, plan, Restaurant, summeryData } from '../types/types';
 
 import {mockSummery,mockRestaurants} from '../mock/mockData';
import type { Plan } from '../screens/plans/planType';
import {respPlanData} from "../screens/plans/mock";


const API_BASE_URL = 'https://byte-backend-r4tn.onrender.com/api';

 export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  // const response = await api.get('/super-admin/restaurants');
  // return response.data;
  return ({data:mockRestaurants , message:"success",success:true})
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

// summery 
export const summery= async():Promise<ApiResponse<summeryData>>=>{
    // const response=await api.get(`/super-admin/summery`);
  // return response.data;
  return mockSummery;
}


//crud of plans
export const createPlan= async(plan:plan):Promise<ApiResponse<plan>>=>{
  // const response=await api.post(`/super-admin/plans`,plan);
  // return response.data;
  return plan;
}

export const updatePlan= async(id:string|number,plan:plan):Promise<ApiResponse<Plan>>=>{
  // const response=await api.post(`/super-admin/plans/${id}`,plan);
  // return response.data;
    return plan;
}

export const allPlans= async():Promise<ApiResponse<Plan[]>>=>{
  // const response=await api.get(`/super-admin/plans`);
  // return response.data;
  return respPlanData;
}

export const deletePlan=async(id:string|number)=>{
  // const response = await api.delete(`/super-admin/${id}`);
  // return response.data;
    return respPlanData;

}

