import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock backend API URL
const API_URL = "http://localhost:5000/users";

// Load user from localStorage (to persist login state)
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null,
  isAuthenticated: !!storedUser,
  loading: false,
  error: null,
};

// **Async Thunk - User Signup**
export const signupUser = createAsyncThunk("user/signupUser", async (userData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
});

// **Async Thunk - User Login**
export const loginUser = createAsyncThunk("user/loginUser", async ({ email, password }) => {
  const response = await fetch(`${API_URL}?email=${email}&password=${password}`);
  const users = await response.json();

  if (users.length === 0) throw new Error("Invalid email or password");

  localStorage.setItem("user", JSON.stringify(users[0]));
  return users[0];
});

// **Async Thunk - Logout**
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  localStorage.removeItem("user");
  return null;
});

// **User Slice**
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default userSlice.reducer;
