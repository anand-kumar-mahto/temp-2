import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const cardStyle = {
  background: '#181818',
  border: '1px solid #222',
  borderRadius: 8,
  padding: '1.5rem',
  margin: '1rem 0',
  color: '#fff',
  boxShadow: 'none',
};
const statStyle = {
  fontSize: 28,
  fontWeight: 700,
  color: '#fff',
};
const labelStyle = {
  color: '#bbb',
  fontSize: 14,
  marginBottom: 8,
};
const storeListStyle = {
  background: '#111',
  border: '1px solid #222',
  borderRadius: 8,
  padding: '1rem',
  marginTop: 24,
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/dashboard')
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load dashboard');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={cardStyle}>Loading dashboard...</div>;
  if (error) return <div style={{ ...cardStyle, color: '#f33' }}>{error}</div>;
  if (!stats) return null;

  return (
    <div>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>Dashboard</h2>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <div style={statStyle}>{stats.total_customers}</div>
          <div style={labelStyle}>Total Customers</div>
        </div>
        <div style={cardStyle}>
          <div style={statStyle}>{stats.total_quotations}</div>
          <div style={labelStyle}>Total Quotations</div>
        </div>
        <div style={cardStyle}>
          <div style={statStyle}>{stats.total_products}</div>
          <div style={labelStyle}>Total Products</div>
        </div>
      </div>
      {stats.stores && stats.stores.length > 0 && (
        <div style={storeListStyle}>
          <h3 style={{ color: '#fff', marginBottom: 16 }}>Your Stores</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {stats.stores.map(store => (
              <li key={store._id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #222' }}>
                <span style={{ color: '#fff', fontWeight: 500 }}>{store.name}</span>
                <span style={{ color: '#bbb', marginLeft: 12 }}>Owner: {store.owner_name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 