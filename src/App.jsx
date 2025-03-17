import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import MarketNews from "./pages/MarketNews";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in (persistent login)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Handle login & logout functions
  const handleLogin = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <>
      {/* Only show Navbar on authenticated routes */}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />} />
          <Route path="/portfolio" element={isAuthenticated ? <Portfolio /> : <Login onLogin={handleLogin} />} />
          <Route path="/watchlist" element={isAuthenticated ? <Watchlist /> : <Login onLogin={handleLogin} />} />
          <Route path="/news" element={isAuthenticated ? <MarketNews /> : <Login onLogin={handleLogin} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      
      {/* Only show Footer on authenticated routes */}
      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
