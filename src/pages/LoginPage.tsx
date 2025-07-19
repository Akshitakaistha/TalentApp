/**
 * Function is used to create the login page. It consists of :
 * - Username
 * - Password
 * - Submit button
 * - Back to the home button : It will navigate to Home page 
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login , user } = useAuth();
  const navigate = useNavigate();

  /**
   * Function will navigate to dashboard if credentials are corrects otherwise show invalid crdentials.
   */
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');
  //   const success = await login(username, password);
  //   if (success) {
  //     // Redirect based on user role
  //     const userRole = localStorage.getItem('userRole');
  //     if (userRole === 'superadmin') {
  //       navigate('/dashboard');
  //     } else {
  //       console.log(user);
  //       navigate(`/individual-admin/dashboard/${user?.id}`);
  //     }
  //   } else {
  //     setError('Invalid credentials. Please try again.');
  //   }
  //   setLoading(false);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    const success = await login(username, password);
  
    if (success) {
      const userRole = localStorage.getItem('userRole');
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  
      if (userRole === 'superadmin') {
        navigate('/dashboard');
      } else {
        navigate(`/individual-admin/dashboard/${parsedUser?.id}`);
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  
    setLoading(false);
  };

  function loginForm(){
    return (
      <form className="login-form mb-3" onSubmit={handleSubmit} noValidate>
          <label htmlFor="username" className="visually-hidden">
            Email address
          </label>
          <div className="input-group">
            <User className="input-icon" aria-hidden="true" />
            <input
              id="username"
              name="username"
              type="email"
              autoComplete="username"
              required
              placeholder="Email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              aria-describedby="username-error"
              aria-invalid={!!error}
            />
          </div>
          <label htmlFor="password" className="visually-hidden">
            Password
          </label>
          <div className="input-group">
            <Lock className="input-icon" aria-hidden="true" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              aria-describedby="password-error"
              aria-invalid={!!error}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-btn"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && (
            <div className="login-error" role="alert" id="login-error">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="login-button"
            aria-live="polite"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card" role="main" aria-label="Login form">
        <div className="login-graphic" aria-hidden="true">
          <svg
            width="80"
            height="80"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="login-svg"
          >
            <circle cx="32" cy="32" r="30" stroke="#4F46E5" strokeWidth="4" />
            <path
              d="M20 44L32 32L44 44"
              stroke="#4F46E5"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 32L32 20"
              stroke="#4F46E5"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your Talent App account</p>
        {loginForm()}
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/')}
          aria-label="Back to Home"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
