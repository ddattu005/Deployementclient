const StockCard = ({ stock, onBuy, onSell }) => {
    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">{stock.name} ({stock.symbol})</h3>
        <p className="text-gray-400">Price: ${stock.price.toFixed(2)}</p>
        <p className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
          {stock.change >= 0 ? "▲" : "▼"} {stock.change.toFixed(2)}%
        </p>
        <div className="flex space-x-2 mt-2">
          <button onClick={() => onBuy(stock)} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
            Buy
          </button>
          <button onClick={() => onSell(stock)} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
            Sell
          </button>
        </div>
      </div>
    );
  };
  
  export default StockCard;
  