import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

// Log final URL before sending
axiosInstance.interceptors.request.use(config => {
  const finalUrl = `${config.baseURL?.replace(/\/$/, '')}${config.url}`;
  console.log('Final request URL:', finalUrl);
  return config;
});

export default axiosInstance;
