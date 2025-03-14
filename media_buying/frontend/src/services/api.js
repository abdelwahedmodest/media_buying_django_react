import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

export const fetchCampaigns = () => api.get('/campaigns/');
export const fetchKeywords = () => api.get('/keywords/');
export const fetchResults = () => api.get('/results/');
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export default api;