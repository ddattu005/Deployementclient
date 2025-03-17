const API_URL = "http://localhost:5000";

// Fetch all stocks
export const getStocks = async () => {
  const response = await fetch(`${API_URL}/stocks`);
  return response.json();
};

// Fetch user details
export const getUser = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  return response.json();
};

// Signup user
export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};
