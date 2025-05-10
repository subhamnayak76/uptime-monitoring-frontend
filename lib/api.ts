import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  withCredentials: true, 
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        
        const { data } = await axios.post('/refresh', {}, { withCredentials: true });
        
        localStorage.setItem('accessToken', data.accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
      
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Auth API
export const authApi = {
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/register', {name, email, password});
      // Store the token from the response
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },
  
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/user/login', { email, password });
      
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/logout'); // Backend will clear the refresh token cookie
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
};

// Monitors API
export const monitorsApi = {
  getAll: async () => {
    const response = await api.get('/monitor');
    
    return response.data;
  },

  create: async (data: { url: string; notificationEmail: string; interval: number }) => {
    try{
    const response = await api.post('/monitors', data);
    
    return response.data;
    
    }catch(e){
      console.log("error occured while creating ",e)
    }
  },

  getById: async (id: string) => {
    try {
    const response = await api.get(`/monitors/${id}`);
    return response.data;
    } catch(e) {
      console.log("error occured while fetching id",e)
    }
  },

  delete: async (id: string) => {
    try {
    const response = await api.delete(`/monitors/${id}`);
    return response.data;
    }catch(e){
      console.log('error occured while deleting',e)
    }
  },
};