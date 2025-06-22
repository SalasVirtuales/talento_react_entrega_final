import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Check for hardcoded credentials
    if (email === "Marcelo" && password === "admin") {
      login(); // Call the login function from AuthContext
      navigate(from, { replace: true }); // Redirect to the page the user was trying to access or home
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label> {/* Changed label from Email to Username */}
            <input
              type="text" // Changed type from email to text for username
              id="username" // Changed id
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your username" // Changed placeholder
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-control"
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="btn btn-primary login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
