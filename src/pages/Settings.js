import React from 'react';
import { useAuth } from '../context/AuthContext';

const cardStyle = {
  background: '#181818',
  border: '1px solid #222',
  borderRadius: 8,
  padding: '2rem',
  color: '#fff',
  maxWidth: 400,
  margin: '2rem auto',
  textAlign: 'center',
};
const labelStyle = {
  color: '#bbb',
  fontSize: 14,
  marginTop: 12,
};

export default function Settings() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#fff', marginBottom: 24 }}>Profile</h2>
      <div style={labelStyle}>Name</div>
      <div style={{ color: '#fff', fontSize: 18, marginBottom: 12 }}>{user.name}</div>
      <div style={labelStyle}>Email</div>
      <div style={{ color: '#fff', fontSize: 18, marginBottom: 12 }}>{user.email}</div>
      <div style={labelStyle}>Role</div>
      <div style={{ color: '#fff', fontSize: 18, marginBottom: 12 }}>{user.is_store_owner ? 'Store Owner' : 'Employee/User'}</div>
    </div>
  );
} 