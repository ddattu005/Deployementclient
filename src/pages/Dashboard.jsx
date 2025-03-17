import { useState } from 'react';
import { FaWallet, FaChartLine, FaExchangeAlt, FaSearch } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [balance, setBalance] = useState(100000); // Starting with $100,000
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 172.62, change: +1.25 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 147.68, change: -0.45 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 417.15, change: +2.30 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 174.42, change: +0.78 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 175.34, change: -1.15 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const portfolioStats = {
    totalValue: balance + 25000, // Example: balance + investments
    todayChange: +1250.50,
    totalInvestments: 25000,
    profitLoss: +3500
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setQuantity(1);
  };

  const handleTrade = (type) => {
    const total = selectedStock.price * quantity;
    if (type === 'buy' && total <= balance) {
      setBalance(prev => prev - total);
      setStocks(prev => prev.map(s => 
        s.symbol === selectedStock.symbol 
        ? {...s, owned: (s.owned || 0) + quantity}
        : s
      ));
    } else if (type === 'sell') {
      setBalance(prev => prev + total);
    }
    setSelectedStock(null);
  };

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      {/* Portfolio Summary Cards */}
      <div className="portfolio-cards">
        <div className="portfolio-card">
          <div className="card-icon">
            <FaWallet />
          </div>
          <div className="card-content">
            <h3>Total Portfolio Value</h3>
            <div className="value">${portfolioStats.totalValue.toLocaleString()}</div>
            <div className={`change ${portfolioStats.todayChange >= 0 ? 'positive' : 'negative'}`}>
              {portfolioStats.todayChange >= 0 ? '+' : '-'}
              ${Math.abs(portfolioStats.todayChange).toLocaleString()} Today
            </div>
          </div>
        </div>

        <div className="portfolio-card">
          <div className="card-icon">
            <FaChartLine />
          </div>
          <div className="card-content">
            <h3>Total Investments</h3>
            <div className="value">${portfolioStats.totalInvestments.toLocaleString()}</div>
            <div className={`change ${portfolioStats.profitLoss >= 0 ? 'positive' : 'negative'}`}>
              {portfolioStats.profitLoss >= 0 ? '+' : '-'}
              ${Math.abs(portfolioStats.profitLoss).toLocaleString()} P/L
            </div>
          </div>
        </div>

        <div className="portfolio-card">
          <div className="card-icon">
            <FaExchangeAlt />
          </div>
          <div className="card-content">
            <h3>Available Balance</h3>
            <div className="value">${balance.toLocaleString()}</div>
            <div className="subtitle">Available for Trading</div>
          </div>
        </div>
      </div>

      {/* Available Stocks Section */}
      <div className="stocks-container">
        <div className="section-header">
          <h2>Available Stocks</h2>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="stock-list">
          <div className="stock-list-header">
            <span>Symbol</span>
            <span>Name</span>
            <span>Price</span>
            <span>Change</span>
            <span>Action</span>
          </div>
          {filteredStocks.map(stock => (
            <div key={stock.symbol} className="stock-item">
              <span className="stock-symbol">{stock.symbol}</span>
              <span className="stock-name">{stock.name}</span>
              <span>${stock.price.toFixed(2)}</span>
              <span className={stock.change >= 0 ? 'positive' : 'negative'}>
                {stock.change >= 0 ? '+' : ''}{stock.change}%
              </span>
              <button 
                className="trade-button"
                onClick={() => handleStockSelect(stock)}
              >
                Trade
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trading Interface */}
      {selectedStock && (
        <div className="trading-interface">
          <h2>Trade {selectedStock.symbol}</h2>
          <div className="trade-info">
            <p>Current Price: ${selectedStock.price}</p>
            <div className="trade-controls">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              />
              <button 
                className="buy-button"
                onClick={() => handleTrade('buy')}
                disabled={selectedStock.price * quantity > balance}
              >
                Buy
              </button>
              <button 
                className="sell-button"
                onClick={() => handleTrade('sell')}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
