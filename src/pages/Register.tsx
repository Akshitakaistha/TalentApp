import React, { useState, ChangeEvent, FormEvent } from 'react';
import { User, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { username, email, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        phone,
        password
      });

      if (res.data.success) {
        setSuccess('Registered successfully. Wait for Super Admin approval.');
        setFormData({
          username: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const registerForm = () => (
    <form className="login-form mb-3" onSubmit={handleSubmit} noValidate>
      <div className="input-group">
        <User className="input-icon" />
        <input
          type="text"
          name="username"
          required
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          className="login-input"
        />
      </div>

      <div className="input-group">
        <User className="input-icon" />
        <input
          type="email"
          name="email"
          required
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
        />
      </div>

      <div className="input-group">
        <Phone className="input-icon" />
        <input
          type="tel"
          name="phone"
          required
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="login-input"
        />
      </div>

      <div className="input-group">
        <Lock className="input-icon" />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="toggle-password-btn"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="input-group">
        <Lock className="input-icon" />
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          required
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="login-input"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="toggle-password-btn"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <div className="login-error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="login-success" role="alert">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="login-button"
        aria-live="polite"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );

  return (
    <div className="login-container">
      <div className="login-card" role="main" aria-label="Register form">
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
        <h1 className="login-title">Create Account</h1>
        <p className="login-subtitle">Register to use the Talent App portal</p>
        {registerForm()}
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Register;
