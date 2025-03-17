import axios from "axios";

const API_URL = "http://localhost:5000";

// Buy stock
export const buyStock = async (userId, stockSymbol, quantity, price) => {
  try {
    const userResponse = await axios.get(`${API_URL}/users/${userId}`);
    let user = userResponse.data;

    const totalCost = quantity * price;
    if (user.balance < totalCost) {
      throw new Error("Insufficient funds");
    }

    // Deduct balance and update portfolio
    user.balance -= totalCost;
    user.portfolio = [
      ...user.portfolio,
      { symbol: stockSymbol, quantity, price },
    ];

    await axios.put(`${API_URL}/users/${userId}`, user);
    return user;
  } catch (error) {
    console.error("Error buying stock:", error);
    throw error;
  }
};

// Sell stock
export const sellStock = async (userId, stockSymbol, quantity, price) => {
  try {
    const userResponse = await axios.get(`${API_URL}/users/${userId}`);
    let user = userResponse.data;

    // Check if user owns the stock
    const stockIndex = user.portfolio.findIndex(
      (stock) => stock.symbol === stockSymbol
    );
    if (stockIndex === -1 || user.portfolio[stockIndex].quantity < quantity) {
      throw new Error("Not enough stock to sell");
    }

    // Add balance and update portfolio
    user.balance += quantity * price;
    user.portfolio[stockIndex].quantity -= quantity;
    if (user.portfolio[stockIndex].quantity === 0) {
      user.portfolio.splice(stockIndex, 1);
    }

    await axios.put(`${API_URL}/users/${userId}`, user);
    return user;
  } catch (error) {
    console.error("Error selling stock:", error);
    throw error;
  }
};
