// axios (centralized HTTP)
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// attach token from localStorage automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// A rejected token (expired, or signed with another secret) would otherwise
// leave the app looking logged in while every protected call fails.
// Clear it and send the user to log in, then back to where they were.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const sentToken = Boolean(err.config?.headers?.Authorization);
    if (err.response?.status === 401 && sentToken) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      const here = window.location.pathname + window.location.search;
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign(`/login?redirect=${encodeURIComponent(here)}`);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
