import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

// Add interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  console.log(token)
  if (!token) {
    throw new Error('Authentication token not found. Please log in again.');
  }
  console.log(token)   
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  register: async (name:string,email: string, password: string) => {
    const response = await api.post('/register', {name,email, password });
    return response.data;

  },
  
  login: async (email: string, password: string) => {
    try{
    const response = await api.post('/user/login', { email, password });
    
    return response.data;
    }catch (e){
      console.log("error occured",e)
    }
  }
};

// Monitors API
export const monitorsApi = {
  getAll: async () => {
    const response = await api.get('/monitor');
    console.log(response.data)
    return response.data;
  },

  create: async (data: { url: string; notificationEmail: string; interval: number }) => {
    try{
    const response = await api.post('/monitors', data);
    console.log(response.data)
    return response.data;
    
    }catch(e){
      console.log("eror occured",e)
    }
  },

  getById: async (id: string) => {
    const response = await api.get(`/monitors/${id}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/monitors/${id}`);
    return response.data;
  },
};