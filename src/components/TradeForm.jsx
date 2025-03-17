import { useState } from "react";

const TradeForm = ({ stock, onTrade }) => {
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState("buy");

  const handleSubmit = (e) => {
    e.preventDefault();
    onTrade({ stock, quantity, type });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">Trade {stock.name}</h3>
      <label className="block mt-2">Quantity:</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full p-2 text-black rounded"
      />
      <label className="block mt-2">Trade Type:</label>
      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 text-black rounded">
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <button type="submit" className="bg-yellow-500 px-4 py-2 mt-4 rounded hover:bg-yellow-600 w-full">
        Confirm Trade
      </button>
    </form>
  );
};

export default TradeForm;
