import { useState } from 'react';
import { FaStar, FaBell, FaPlus, FaTrash } from 'react-icons/fa';
import './Watchlist.css';

const Watchlist = () => {
  // Mock watchlist data - replace with actual data from your backend
  const [watchlist, setWatchlist] = useState([
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 172.82,
      change: +3.45,
      alerts: [
        { type: 'above', price: 180.00, active: true },
        { type: 'below', price: 165.00, active: true }
      ]
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 878.35,
      change: +5.20,
      alerts: [
        { type: 'above', price: 900.00, active: true }
      ]
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 505.95,
      change: -1.25,
      alerts: [
        { type: 'below', price: 500.00, active: true }
      ]
    }
  ]);

  const [newSymbol, setNewSymbol] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleAddStock = (e) => {
    e.preventDefault();
    // In a real app, fetch stock data from API
    alert('In a real app, this would add ' + newSymbol + ' to your watchlist');
    setNewSymbol('');
  };

  const handleRemoveStock = (symbol) => {
    setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
  };

  const handleAddAlert = (stock) => {
    setSelectedStock(stock);
    setShowAlertModal(true);
  };

  return (
    <div className="watchlist-page">
      {/* Add Stock Form */}
      <div className="add-stock-section">
        <form onSubmit={handleAddStock} className="add-stock-form">
          <input
            type="text"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol (e.g., AAPL)"
            className="stock-input"
          />
          <button type="submit" className="add-button">
            <FaPlus /> Add to Watchlist
          </button>
        </form>
      </div>

      {/* Watchlist Table */}
      <div className="watchlist-section">
        <h2><FaStar className="section-icon" /> Your Watchlist</h2>
        <div className="watchlist-table">
          <div className="table-header">
            <span>Symbol</span>
            <span>Name</span>
            <span>Price</span>
            <span>Change</span>
            <span>Alerts</span>
            <span>Actions</span>
          </div>
          {watchlist.map((stock) => (
            <div key={stock.symbol} className="table-row">
              <span className="symbol">{stock.symbol}</span>
              <span>{stock.name}</span>
              <span>${stock.price.toFixed(2)}</span>
              <span className={stock.change >= 0 ? 'positive' : 'negative'}>
                {stock.change >= 0 ? '+' : ''}{stock.change}%
              </span>
              <span className="alerts-cell">
                {stock.alerts.map((alert, index) => (
                  <div key={index} className="alert-badge">
                    {alert.type === 'above' ? '↑' : '↓'} ${alert.price}
                  </div>
                ))}
              </span>
              <span className="actions-cell">
                <button 
                  className="action-button alert"
                  onClick={() => handleAddAlert(stock)}
                >
                  <FaBell />
                </button>
                <button 
                  className="action-button delete"
                  onClick={() => handleRemoveStock(stock.symbol)}
                >
                  <FaTrash />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Modal */}
      {showAlertModal && (
        <div className="modal-overlay">
          <div className="alert-modal">
            <h3>Set Price Alert for {selectedStock.symbol}</h3>
            <div className="alert-form">
              <div className="alert-type">
                <label>
                  <input type="radio" name="alertType" value="above" defaultChecked />
                  Alert when price goes above
                </label>
                <label>
                  <input type="radio" name="alertType" value="below" />
                  Alert when price goes below
                </label>
              </div>
              <input
                type="number"
                placeholder="Enter price"
                step="0.01"
                className="price-input"
              />
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setShowAlertModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="save-button"
                  onClick={() => {
                    // In a real app, save the alert
                    setShowAlertModal(false);
                  }}
                >
                  Save Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist; 