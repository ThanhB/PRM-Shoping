import axiosClient from "../config/axiosClient";

const login = (membername, password) => {
  return axiosClient.post("/auth/login", { membername, password });
};

const register = (email, password) => {
  return axiosClient.post("/auth/register", { email, password });
};

const getUserInfo = () => {
  return axiosClient.get("/auth/me");
};

export { login, register, getUserInfo };
