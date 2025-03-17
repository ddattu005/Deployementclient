import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaHistory, FaCog, FaChartLine } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - replace with actual user data from your auth system
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'March 15, 2024',
    totalTrades: 145,
    profitLoss: '+$12,450.75',
    accountBalance: '$107,753.23',
    preferences: {
      notifications: true,
      darkMode: true,
      twoFactorAuth: false
    }
  });

  const [formData, setFormData] = useState({ ...userData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  const tradingHistory = [
    { date: '2024-03-17', stock: 'AAPL', type: 'Buy', amount: '$1,720.50', quantity: 10 },
    { date: '2024-03-16', stock: 'GOOGL', type: 'Sell', amount: '$2,953.60', quantity: 20 },
    { date: '2024-03-15', stock: 'MSFT', type: 'Buy', amount: '$834.30', quantity: 2 }
  ];

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <FaUser className="avatar-icon" />
        </div>
        <div className="profile-info">
          <h1>{userData.name}</h1>
          <p>Member since {userData.joinDate}</p>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="profile-nav">
        <button 
          className={`nav-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          <FaUser /> Personal Info
        </button>
        <button 
          className={`nav-button ${activeTab === 'trading' ? 'active' : ''}`}
          onClick={() => setActiveTab('trading')}
        >
          <FaChartLine /> Trading Activity
        </button>
        <button 
          className={`nav-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <FaLock /> Security
        </button>
        <button 
          className={`nav-button ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          <FaCog /> Preferences
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {activeTab === 'personal' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              <button 
                className="edit-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="save-button" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="info-grid">
                <div className="info-item">
                  <FaUser className="info-icon" />
                  <div>
                    <h3>Name</h3>
                    <p>{userData.name}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <div>
                    <h3>Email</h3>
                    <p>{userData.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'trading' && (
          <div className="content-section">
            <h2>Trading Activity</h2>
            <div className="trading-stats">
              <div className="stat-card">
                <h3>Total Trades</h3>
                <p>{userData.totalTrades}</p>
              </div>
              <div className="stat-card">
                <h3>Profit/Loss</h3>
                <p className={userData.profitLoss.startsWith('+') ? 'positive' : 'negative'}>
                  {userData.profitLoss}
                </p>
              </div>
              <div className="stat-card">
                <h3>Account Balance</h3>
                <p>{userData.accountBalance}</p>
              </div>
            </div>
            
            <h3>Recent Trades</h3>
            <div className="trades-table">
              <div className="table-header">
                <span>Date</span>
                <span>Stock</span>
                <span>Type</span>
                <span>Amount</span>
                <span>Quantity</span>
              </div>
              {tradingHistory.map((trade, index) => (
                <div key={index} className="table-row">
                  <span>{trade.date}</span>
                  <span>{trade.stock}</span>
                  <span className={trade.type.toLowerCase()}>{trade.type}</span>
                  <span>{trade.amount}</span>
                  <span>{trade.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="content-section">
            <h2>Security Settings</h2>
            <div className="security-options">
              <div className="security-item">
                <div>
                  <h3>Change Password</h3>
                  <p>Update your password regularly to keep your account secure</p>
                </div>
                <button className="action-button">Change Password</button>
              </div>
              <div className="security-item">
                <div>
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <button className="action-button">
                  {userData.preferences.twoFactorAuth ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="content-section">
            <h2>Preferences</h2>
            <div className="preferences-list">
              <div className="preference-item">
                <div>
                  <h3>Notifications</h3>
                  <p>Receive alerts about your trades and market updates</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={userData.preferences.notifications}
                    onChange={() => {}}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="preference-item">
                <div>
                  <h3>Dark Mode</h3>
                  <p>Switch between light and dark theme</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={userData.preferences.darkMode}
                    onChange={() => {}}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
