import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ecommerce-assignment-2-n6id.onrender.com/api'
});

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;
