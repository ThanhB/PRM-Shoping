import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { navigateToAuth } from "../navigationRef";

const apiInstance = axios.create({
  baseURL: "https://api-shop-ic3t.onrender.com/api",
});

apiInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    if (err.response.status === 401) {
      await AsyncStorage.removeItem("token");
      navigateToAuth();
    }
    return Promise.reject(err);
  }
);

export default apiInstance;

