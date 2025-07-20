import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navStyle = {
  background: '#111',
  borderBottom: '1px solid #222',
  padding: '1rem 0',
  marginBottom: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const navLinks = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};
const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 500,
};
const userInfoStyle = {
  color: '#bbb',
  marginRight: 16,
  fontSize: 14,
};
const logoutBtnStyle = {
  background: '#222',
  color: '#fff',
  border: '1px solid #444',
  borderRadius: 2,
  padding: '0.4rem 1rem',
  cursor: 'pointer',
  marginLeft: 8,
};

export default function Navbar() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      <div style={navLinks}>
        <Link to="/" style={navLinkStyle}>Dashboard</Link>
        {token && <>
          <Link to="/stores" style={navLinkStyle}>Stores</Link>
          <Link to="/customers" style={navLinkStyle}>Customers</Link>
          <Link to="/products" style={navLinkStyle}>Products</Link>
          <Link to="/quotations" style={navLinkStyle}>Quotations</Link>
          <Link to="/invoices" style={navLinkStyle}>Invoices</Link>
          <Link to="/settings" style={navLinkStyle}>Settings</Link>
        </>}
      </div>
      <div style={navLinks}>
        {token ? (
          <>
            <span style={userInfoStyle}>{user?.name || user?.email}</span>
            <button style={logoutBtnStyle} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={navLinkStyle}>Login</Link>
            <Link to="/register" style={navLinkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
} 