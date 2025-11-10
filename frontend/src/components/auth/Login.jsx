import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import '../../style/auth.scss';


function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successPopupMessage, setSuccessPopupMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    if (location.state?.message) {
      setSuccessPopupMessage(location.state.message);
      navigate('.', { replace: true, state: {} });
    }
  }, [location, navigate]);

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const onSubmit = async e => {
  e.preventDefault();
  setError('');
  setSuccessPopupMessage('');
  setIsLoading(true);

  try {
    const res = await fetch('http://localhost:4001/api/auth/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || 'Login failed. Please check your credentials.');
    }

    if (!data.user || !data.user.accountType) {
      throw new Error('Invalid response from server. Please try again.');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.user.accountType);
    localStorage.setItem('user', JSON.stringify(data.user)); 

    
      const target =
      data.user.accountType === 
        'owner'? '/owner-dashboard':
        data.user.accountType === 'tenant'? 
        '/tenant-dashboard': '/signup';
   window.location.href = target;

  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
  <div className="auth-bg">                     {/* ← THIS WAS MISSING */}
    <div className="auth-card">
      <h2 className="auth-title">Welcome</h2>   {/* ← optional, but matches CSS */}
      <p className="auth-subtitle">Sign in to your account to continue</p>

      {successPopupMessage && <p className="success-message">✓ {successPopupMessage}</p>}
      {error && <p className="error-message">✗ {error}</p>}

      <form onSubmit={onSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="lena.coren02@example.net"
              value={email}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="form-options">
          <div className="checkbox-group">
            <input type="checkbox" id="remember-me" className="custom-checkbox" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Link to="#" className="forgot-link" onClick={e => e.preventDefault()}>
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? <div className="loader"></div> : 'Sign in'}
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  </div>
);
}

export default Login;