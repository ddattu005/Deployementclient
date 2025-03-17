import { useState } from 'react';
import { FaChartLine, FaArrowUp, FaArrowDown, FaHistory } from 'react-icons/fa';
import './Portfolio.css';

const Portfolio = () => {
  // Mock portfolio data - replace with actual data from your backend
  const [portfolio] = useState({
    holdings: [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        shares: 15,
        avgPrice: 170.25,
        currentPrice: 172.62,
        value: 2589.30,
        change: +1.25,
        profitLoss: +35.55
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        shares: 10,
        avgPrice: 145.80,
        currentPrice: 147.68,
        value: 1476.80,
        change: -0.45,
        profitLoss: +18.80
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        shares: 20,
        avgPrice: 415.00,
        currentPrice: 417.15,
        value: 8343.00,
        change: +2.30,
        profitLoss: +43.00
      }
    ],
    performance: {
      totalValue: 12409.10,
      todayChange: +97.35,
      totalReturn: +1250.50,
      returnPercentage: +11.2
    }
  });

  const transactions = [
    { date: '2024-03-17', symbol: 'AAPL', type: 'Buy', price: 172.62, shares: 5, total: 863.10 },
    { date: '2024-03-16', symbol: 'GOOGL', type: 'Sell', price: 147.68, shares: 3, total: 443.04 },
    { date: '2024-03-15', symbol: 'MSFT', type: 'Buy', price: 417.15, shares: 10, total: 4171.50 }
  ];

  return (
    <div className="portfolio-page">
      {/* Portfolio Summary */}
      <div className="portfolio-summary">
        <div className="summary-card main">
          <div className="card-header">
            <FaChartLine className="card-icon" />
            <h2>Portfolio Value</h2>
          </div>
          <div className="card-content">
            <h3>${portfolio.performance.totalValue.toLocaleString()}</h3>
            <p className={portfolio.performance.todayChange >= 0 ? 'positive' : 'negative'}>
              {portfolio.performance.todayChange >= 0 ? '+' : ''}
              ${Math.abs(portfolio.performance.todayChange).toLocaleString()} Today
            </p>
          </div>
        </div>

        <div className="summary-card">
          <h2>Total Return</h2>
          <div className="card-content">
            <h3 className={portfolio.performance.totalReturn >= 0 ? 'positive' : 'negative'}>
              {portfolio.performance.totalReturn >= 0 ? '+' : ''}
              ${Math.abs(portfolio.performance.totalReturn).toLocaleString()}
            </h3>
            <p className={portfolio.performance.returnPercentage >= 0 ? 'positive' : 'negative'}>
              {portfolio.performance.returnPercentage >= 0 ? '+' : ''}
              {portfolio.performance.returnPercentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="portfolio-section">
        <h2>Your Holdings</h2>
        <div className="holdings-table">
          <div className="table-header">
            <span>Symbol</span>
            <span>Name</span>
            <span>Shares</span>
            <span>Avg Price</span>
            <span>Current Price</span>
            <span>Value</span>
            <span>Change</span>
            <span>P/L</span>
          </div>
          {portfolio.holdings.map((stock) => (
            <div key={stock.symbol} className="table-row">
              <span className="symbol">{stock.symbol}</span>
              <span>{stock.name}</span>
              <span>{stock.shares}</span>
              <span>${stock.avgPrice.toFixed(2)}</span>
              <span>${stock.currentPrice.toFixed(2)}</span>
              <span>${stock.value.toLocaleString()}</span>
              <span className={stock.change >= 0 ? 'positive' : 'negative'}>
                {stock.change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(stock.change)}%
              </span>
              <span className={stock.profitLoss >= 0 ? 'positive' : 'negative'}>
                {stock.profitLoss >= 0 ? '+' : '-'}${Math.abs(stock.profitLoss).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="portfolio-section">
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <FaHistory className="history-icon" />
        </div>
        <div className="transactions-table">
          <div className="table-header">
            <span>Date</span>
            <span>Symbol</span>
            <span>Type</span>
            <span>Price</span>
            <span>Shares</span>
            <span>Total</span>
          </div>
          {transactions.map((transaction, index) => (
            <div key={index} className="table-row">
              <span>{transaction.date}</span>
              <span className="symbol">{transaction.symbol}</span>
              <span className={transaction.type.toLowerCase()}>{transaction.type}</span>
              <span>${transaction.price.toFixed(2)}</span>
              <span>{transaction.shares}</span>
              <span>${transaction.total.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
