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

export default function CustomerDetail() {
  const { store_id, customer_id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`/stores/${store_id}/customers/${customer_id}`)
      .then(res => {
        setCustomer(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load customer');
        setLoading(false);
      });
  }, [store_id, customer_id]);

  return (
    <div>
      <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}/customers`)}>&larr; Back to Customers</button>
      {loading ? (
        <div style={cardStyle}>Loading customer...</div>
      ) : error ? (
        <div style={{ ...cardStyle, color: '#f33' }}>{error}</div>
      ) : customer ? (
        <div style={cardStyle}>
          <h2 style={{ color: '#fff', marginBottom: 16 }}>{customer.name}</h2>
          <div style={labelStyle}>Type: <span style={{ color: '#fff' }}>{customer.type}</span></div>
          <div style={labelStyle}>WhatsApp: <span style={{ color: '#fff' }}>{customer.whatsapp}</span></div>
          <div style={labelStyle}>Email: <span style={{ color: '#fff' }}>{customer.email || <span style={{ color: '#888' }}>-</span>}</span></div>
          <div style={labelStyle}>Address:</div>
          <div style={{ color: '#fff', marginBottom: 16 }}>{customer.address || <span style={{ color: '#888' }}>No address</span>}</div>
          <div style={labelStyle}>Created At: <span style={{ color: '#fff' }}>{customer.created_at ? new Date(customer.created_at).toLocaleString() : '-'}</span></div>
        </div>
      ) : null}
    </div>
  );
} 