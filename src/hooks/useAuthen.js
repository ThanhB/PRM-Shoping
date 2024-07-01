import { create } from "zustand";
import { getInfoUser } from "../api/authen.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../routes/navigationService.js'; // Adjust the path as necessary

const useAuth = create((set) => ({
  infoUser: {},
  fetchUserInfo: async () => {
    try {
      const res = await getInfoUser();
      if (res && res.status === 200) {
        set({ infoUser: res?.data.data || {} });
      }
    } catch (err) {
      console.log("Error fetching userInfo", err);
    }
  },
  isAuthenticated: !!AsyncStorage.getItem("__token"),
  login: () => {
    set({ isAuthenticated: true });
  },
  logout: async () => {
    await AsyncStorage.removeItem("__token"); // Use AsyncStorage for token removal
    set({ isAuthenticated: false });
    navigate('Login'); // Use the navigate function from the navigation service
  },
}));

export default useAuth;