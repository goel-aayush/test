import axios from 'axios';

let rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://digmaniparamedical-backend.vercel.app/api/v1';
if (rawApiUrl.endsWith('/')) {
  rawApiUrl = rawApiUrl.slice(0, -1);
}
if (!rawApiUrl.endsWith('/api/v1')) {
  rawApiUrl = `${rawApiUrl}/api/v1`;
}
const API_BASE_URL = rawApiUrl;


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('arpi_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error.response && error.response.status === 401) {
      localStorage.removeItem('arpi_token');
      localStorage.removeItem('arpi_user');
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
