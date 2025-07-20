import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const formStyle = {
  background: '#181818',
  padding: '2rem',
  borderRadius: 8,
  maxWidth: 400,
  margin: '2rem auto',
  color: '#fff',
  boxShadow: '0 0 0 1px #222',
};
const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  margin: '0.5rem 0',
  background: '#222',
  color: '#fff',
  border: '1px solid #444',
  borderRadius: 2,
};
const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  background: '#111',
  color: '#fff',
  border: '1px solid #444',
  borderRadius: 2,
  fontWeight: 600,
  marginTop: '1rem',
  cursor: 'pointer',
};
const errorStyle = {
  color: '#f33',
  background: '#222',
  padding: '0.5rem',
  borderRadius: 2,
  marginBottom: '1rem',
  textAlign: 'center',
};

export default function Login() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      setRedirecting(true);
      setTimeout(() => navigate('/'), 500);
    }
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 24 }}>Login</h2>
      {error && <div style={errorStyle}>{error}</div>}
      <label>Email</label>
      <input
        style={inputStyle}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        autoFocus
      />
      <label>Password</label>
      <input
        style={inputStyle}
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button style={buttonStyle} type="submit" disabled={loading || redirecting}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div style={{ marginTop: 16, textAlign: 'center', color: '#bbb' }}>
        Don&apos;t have an account?{' '}
        <Link to="/register" style={{ color: '#fff', textDecoration: 'underline' }}>Register</Link>
      </div>
    </form>
  );
} 