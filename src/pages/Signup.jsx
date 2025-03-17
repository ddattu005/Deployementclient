import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import external CSS file

const Signup = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    accountType: "Investor",
  });

  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    navigate("/dashboard");
  };

  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>Sign Up</h2>
        
        {/* Step Progress Bar */}
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(step / 6) * 100}%` }}></div>
        </div>

        {/* Step 1: Username */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <button type="button" onClick={handleNext}>Next</button>
          </>
        )}

        {/* Step 2: Email */}
        {step === 2 && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <div className="buttons">
              <button type="button" onClick={handlePrev}>Back</button>
              <button type="button" onClick={handleNext}>Next</button>
            </div>
          </>
        )}

        {/* Step 3: Password */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <div className="buttons">
              <button type="button" onClick={handlePrev}>Back</button>
              <button type="button" onClick={handleNext}>Next</button>
            </div>
          </>
        )}

        {/* Step 4: Full Name & Phone Number */}
        {step === 4 && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
            <div className="buttons">
              <button type="button" onClick={handlePrev}>Back</button>
              <button type="button" onClick={handleNext}>Next</button>
            </div>
          </>
        )}

        {/* Step 5: Select Account Type */}
        {step === 5 && (
          <>
            <label>Select Account Type:</label>
            <select
              value={user.accountType}
              onChange={(e) => setUser({ ...user, accountType: e.target.value })}
            >
              <option value="Investor">Investor</option>
              <option value="Trader">Trader</option>
            </select>
            <div className="buttons">
              <button type="button" onClick={handlePrev}>Back</button>
              <button type="button" onClick={handleNext}>Next</button>
            </div>
          </>
        )}

        {/* Step 6: Review & Submit */}
        {step === 6 && (
          <>
            <h3>Review Your Details</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Account Type:</strong> {user.accountType}</p>
            <div className="buttons">
              <button type="button" onClick={handlePrev}>Back</button>
              <button type="submit" onClick={handleSubmit} className="submit-btn">Submit</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Signup;
