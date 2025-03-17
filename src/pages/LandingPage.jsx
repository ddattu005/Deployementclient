import { Link } from 'react-router-dom';
import { FaChartLine } from 'react-icons/fa';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <nav className="landing-nav">
          <div className="nav-left">
            <Link to="/" className="brand">
              <FaChartLine className="brand-icon" />
              <span>StockSim</span>
            </Link>
          </div>
          <div className="nav-right">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-button">Sign Up</Link>
          </div>
        </nav>

        <main className="landing-content">
          <h1>Stock Market Simulator</h1>
          <p className="subtitle">Practice real-time trading with virtual money</p>
          <div className="features">
            <div className="feature">
              <h3>Real-Time Data</h3>
              <p>Access live market data and practice trading in real-time conditions</p>
            </div>
            <div className="feature">
              <h3>Risk-Free Learning</h3>
              <p>Start with virtual $100,000 and learn without risking real money</p>
            </div>
            <div className="feature">
              <h3>Portfolio Tracking</h3>
              <p>Monitor your investments and track your performance over time</p>
            </div>
          </div>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-primary">Get Started</Link>
            <Link to="/dashboard" className="cta-secondary">View Dashboard</Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage; 