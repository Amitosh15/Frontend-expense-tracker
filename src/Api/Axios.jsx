import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-expense-tracker-c0m2.onrender.com//api/v1",
});

// Request interceptor to add the token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const addIncome = (formData) => API.post("/add-income", formData);
export const getIncome = () => API.get("/get-income");
export const deleteIncome = (id) => API.delete(`/delete-income/${id}`);
export const addExpenses = (formData) => API.post("/add-expenses", formData);
export const getExpenses = () => API.get("/get-expenses");
export const deleteExpenses = (id) => API.delete(`/delete-expense/${id}`);
export const registerUser = (signupInfo) => API.post("/signup", signupInfo);
export const loginUser = (loginInfo) => API.post("/login", loginInfo);

export default API;
