// Correct the axiosClient configuration by removing the duplicate Content-Type header
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  baseURL: "https://api-shop-l5ir.onrender.com/api",
});

axiosClient.interceptors.request.use(async (config) => {
  const access_token = await AsyncStorage.getItem("__token");
  console.log(access_token);
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  } else {
    console.log('JWT token is not available');
  }
  // Set the Content-Type header to "application/json" only
  config.headers["Content-Type"] = "application/json";
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosClient;