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

export default function Quotations() {
  const { store_id } = useParams();
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuotations = () => {
    setLoading(true);
    axios.get(`/stores/${store_id}/quotations`)
      .then(res => {
        setQuotations(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load quotations');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuotations();
  }, [store_id]);

  return (
    <div>
      <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}`)}>&larr; Back to Store</button>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>Quotations</h2>
      <button style={buttonStyle} onClick={() => {}} disabled>
        Add Quotation (Coming Soon)
      </button>
      {loading ? (
        <div style={cardStyle}>Loading quotations...</div>
      ) : error ? (
        <div style={{ ...cardStyle, color: '#f33' }}>{error}</div>
      ) : quotations.length === 0 ? (
        <div style={cardStyle}>No quotations found.</div>
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
            {quotations.map(q => (
              <tr key={q._id}>
                <td style={thtdStyle}>
                  <Link to={`/stores/${store_id}/quotations/${q._id}`} style={linkStyle}>{q.customer_name || '-'}</Link>
                </td>
                <td style={thtdStyle}>{q.status}</td>
                <td style={thtdStyle}>{q.total_amount || q.total || '-'}</td>
                <td style={thtdStyle}>{q.created_at ? new Date(q.created_at).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 