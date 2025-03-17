import { Link } from "react-router-dom";
import "./Home.css"; // Ensure you create this file

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Stock Market Simulator</h1>
      <p className="home-description">Practice real-time trading with virtual money.</p>
      <div className="home-buttons">
        <Link to="/signup" className="home-button signup">Get Started</Link>
        <Link to="/dashboard" className="home-button dashboard">View Dashboard</Link>
      </div>
    </div>
  );
};

export default Home;
