import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaUser, FaSignOutAlt, FaBell, FaQuestionCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'AAPL stock is up by 5%', time: '2m ago' },
    { id: 2, text: 'Your buy order was executed', time: '5m ago' },
    { id: 3, text: 'Market is about to close', time: '15m ago' }
  ]);

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <FaChartLine className="logo-icon" />
          <span>StockSim</span>
        </Link>
      </div>

      {/* Middle Section */}
      <div className="nav-middle">
        <Link to="/dashboard" className="nav-link active">Dashboard</Link>
        <Link to="/portfolio" className="nav-link">Portfolio</Link>
        <Link to="/watchlist" className="nav-link">Watchlist</Link>
        <Link to="/news" className="nav-link">Market News</Link>
      </div>

      {/* Right Section */}
      <div className="nav-right">
        {/* Notifications */}
        <div className="notification-wrapper">
          <button 
            className="icon-button"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />
            <span className="notification-badge">3</span>
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <h3>Notifications</h3>
              {notifications.map(notification => (
                <div key={notification.id} className="notification-item">
                  <p>{notification.text}</p>
                  <span>{notification.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help */}
        <Link to="/help" className="icon-button">
          <FaQuestionCircle />
        </Link>

        {/* Profile */}
        <Link to="/profile" className="nav-link profile-link">
          <FaUser />
          <span>Profile</span>
        </Link>

        {/* Logout */}
        <button onClick={onLogout} className="logout-button">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
