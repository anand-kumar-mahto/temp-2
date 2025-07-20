import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const cardStyle = {
  background: '#181818',
  border: '1px solid #222',
  borderRadius: 8,
  padding: '1.5rem',
  margin: '1rem 0',
  color: '#fff',
};
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: 24,
};
const thtdStyle = {
  border: '1px solid #222',
  padding: '0.75rem',
  textAlign: 'left',
  background: '#181818',
  color: '#fff',
};
const buttonStyle = {
  background: '#111',
  color: '#fff',
  border: '1px solid #444',
  borderRadius: 2,
  padding: '0.5rem 1.5rem',
  fontWeight: 600,
  margin: '1rem 0',
  cursor: 'pointer',
};
const linkStyle = {
  color: '#fff',
  textDecoration: 'underline',
  fontWeight: 500,
};

export default function Invoices() {
  const { store_id } = useParams();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvoices = () => {
    setLoading(true);
    axios.get(`/stores/${store_id}/invoices`)
      .then(res => {
        setInvoices(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load invoices');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInvoices();
  }, [store_id]);

  return (
    <div>
      <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}`)}>&larr; Back to Store</button>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>Invoices</h2>
      <button style={buttonStyle} onClick={() => {}} disabled>
        Add Invoice (Coming Soon)
      </button>
      {loading ? (
        <div style={cardStyle}>Loading invoices...</div>
      ) : error ? (
        <div style={{ ...cardStyle, color: '#f33' }}>{error}</div>
      ) : invoices.length === 0 ? (
        <div style={cardStyle}>No invoices found.</div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thtdStyle}>Customer</th>
              <th style={thtdStyle}>Status</th>
              <th style={thtdStyle}>Total</th>
              <th style={thtdStyle}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv._id}>
                <td style={thtdStyle}>
                  <Link to={`/stores/${store_id}/invoices/${inv._id}`} style={linkStyle}>{inv.customer_name || '-'}</Link>
                </td>
                <td style={thtdStyle}>{inv.status}</td>
                <td style={thtdStyle}>{inv.total_amount || inv.total || '-'}</td>
                <td style={thtdStyle}>{inv.created_at ? new Date(inv.created_at).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 