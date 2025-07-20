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

export default function Register() {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isStoreOwner, setIsStoreOwner] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await register(email, password, name, isStoreOwner);
    if (ok) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1000);
    }
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 24 }}>Register</h2>
      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={{ ...errorStyle, color: '#0f0', background: '#222' }}>Registration successful! Redirecting...</div>}
      <label>Name</label>
      <input
        style={inputStyle}
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        autoFocus
      />
      <label>Email</label>
      <input
        style={inputStyle}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        style={inputStyle}
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          checked={isStoreOwner}
          onChange={e => setIsStoreOwner(e.target.checked)}
          style={{ accentColor: '#fff', width: 16, height: 16 }}
        />
        Register as Store Owner
      </label>
      <button style={buttonStyle} type="submit" disabled={loading || success}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <div style={{ marginTop: 16, textAlign: 'center', color: '#bbb' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#fff', textDecoration: 'underline' }}>Login</Link>
      </div>
    </form>
  );
} 