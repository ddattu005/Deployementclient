import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL (Replace with a real stock data provider later)
const API_URL = "http://localhost:5000/stocks";

// **Fetch stock prices**
export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await fetch(API_URL);
  return response.json();
});

// **Buy a stock**
export const buyStock = createAsyncThunk("stocks/buyStock", async (stockData) => {
  const response = await fetch(`${API_URL}/${stockData.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stockData),
  });
  return response.json();
});

// **Sell a stock**
export const sellStock = createAsyncThunk("stocks/sellStock", async (stockId) => {
  await fetch(`${API_URL}/${stockId}`, { method: "DELETE" });
  return stockId;
});

// **Stock Slice**
const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    stocks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.stocks = action.payload;
      })
      .addCase(buyStock.fulfilled, (state, action) => {
        state.stocks.push(action.payload);
      })
      .addCase(sellStock.fulfilled, (state, action) => {
        state.stocks = state.stocks.filter(stock => stock.id !== action.payload);
      });
  },
});

export default stockSlice.reducer;
