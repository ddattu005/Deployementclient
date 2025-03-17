import axios from "axios";

const API_URL = "http://localhost:5000/users"; // JSON Server API

// Signup User
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(`${API_URL}?email=${email}&password=${password}`);
    if (response.data.length > 0) {
      localStorage.setItem("user", JSON.stringify(response.data[0]));
      return response.data[0];
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("user");
};
