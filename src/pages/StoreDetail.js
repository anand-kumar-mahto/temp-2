import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const cardStyle = {
  background: '#181818',
  border: '1px solid #222',
  borderRadius: 8,
  padding: '2rem',
  color: '#fff',
  maxWidth: 500,
  margin: '2rem auto',
};
const buttonStyle = {
  background: '#111',
  color: '#fff',
  border: '1px solid #444',
  borderRadius: 2,
  padding: '0.5rem 1.5rem',
  fontWeight: 600,
  marginBottom: '1rem',
  cursor: 'pointer',
  marginRight: 8,
};
const labelStyle = {
  color: '#bbb',
  fontSize: 14,
  marginTop: 12,
};

export default function StoreDetail() {
  const { store_id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`/stores/${store_id}`)
      .then(res => {
        setStore(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load store');
        setLoading(false);
      });
  }, [store_id]);

  return (
    <div>
      <button style={buttonStyle} onClick={() => navigate('/stores')}>&larr; Back to Stores</button>
      {loading ? (
        <div style={cardStyle}>Loading store...</div>
      ) : error ? (
        <div style={{ ...cardStyle, color: '#f33' }}>{error}</div>
      ) : store ? (
        <div style={cardStyle}>
          <h2 style={{ color: '#fff', marginBottom: 16 }}>{store.name}</h2>
          <div style={labelStyle}>Owner: <span style={{ color: '#fff' }}>{store.owner_name}</span></div>
          <div style={labelStyle}>Description:</div>
          <div style={{ color: '#fff', marginBottom: 16 }}>{store.description || <span style={{ color: '#888' }}>No description</span>}</div>
          <div style={labelStyle}>Created At: <span style={{ color: '#fff' }}>{store.created_at ? new Date(store.created_at).toLocaleString() : '-'}</span></div>
          <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}/customers`)}>View Customers</button>
          <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}/products`)}>View Products</button>
          <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}/quotations`)}>View Quotations</button>
          <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}/invoices`)}>View Invoices</button>
        </div>
      ) : null}
    </div>
  );
} 