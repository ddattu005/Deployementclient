import axios from "axios";

const API_URL = "https://www.alphavantage.co/query";
const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

// Fetch real-time stock price
export const fetchStockPrice = async (symbol) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    return response.data["Global Quote"];
  } catch (error) {
    console.error("Error fetching stock price:", error);
    throw error;
  }
};

// Fetch historical stock data for charts
export const fetchStockHistory = async (symbol) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    return response.data["Time Series (Daily)"];
  } catch (error) {
    console.error("Error fetching stock history:", error);
    throw error;
  }
};
