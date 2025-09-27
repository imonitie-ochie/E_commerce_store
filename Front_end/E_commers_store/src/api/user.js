import axios from "axios";

//const User_api = "http://localhost:3008/user/";
const User_api = "https://ecommerce-zv1v.onrender.com/"; 

export const register = async (userData) => {
  try {
    const payload = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };
    console.log(payload);
    const response = await axios.post(`${User_api}register`, payload);
    return response.data; // { message, user, token }
    console.log(response.data);
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${User_api}login`, credentials);
    console.log(response.data);

    // Store auth data in localStorage
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
