import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const cardStyle = {
  background: '#181818',
  border: '1px solid #222',
  borderRadius: 8,
  padding: '2rem',
  color: '#fff',
  maxWidth: 600,
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
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: 16,
};
const thtdStyle = {
  border: '1px solid #222',
  padding: '0.5rem',
  textAlign: 'left',
  background: '#181818',
  color: '#fff',
};

export default function InvoiceDetail() {
  const { store_id, invoice_id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`/stores/${store_id}/invoices`)
      .then(res => {
        const found = res.data.find(inv => inv._id === invoice_id);
        setInvoice(found || null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load invoice');
        setLoading(false);
      });
  }, [store_id, invoice_id]);

  return (
    <div>
      <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}/invoices`)}>&larr; Back to Invoices</button>
      {loading ? (
        <div style={cardStyle}>Loading invoice...</div>
      ) : error ? (
        <div style={{ ...cardStyle, color: '#f33' }}>{error}</div>
      ) : invoice ? (
        <div style={cardStyle}>
          <h2 style={{ color: '#fff', marginBottom: 16 }}>Invoice</h2>
          <div style={labelStyle}>Customer: <span style={{ color: '#fff' }}>{invoice.customer_name || '-'}</span></div>
          <div style={labelStyle}>Status: <span style={{ color: '#fff' }}>{invoice.status}</span></div>
          <div style={labelStyle}>Total: <span style={{ color: '#fff' }}>{invoice.total_amount || invoice.total || '-'}</span></div>
          <div style={labelStyle}>Created At: <span style={{ color: '#fff' }}>{invoice.created_at ? new Date(invoice.created_at).toLocaleString() : '-'}</span></div>
          <a
            href={`/store/${store_id}/invoices/${invoice_id}/pdf`}
            style={{ ...buttonStyle, display: 'inline-block', textDecoration: 'none', marginTop: 16 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
          {invoice.items && invoice.items.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ color: '#fff', marginBottom: 8 }}>Items</h3>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thtdStyle}>Product</th>
                    <th style={thtdStyle}>Qty</th>
                    <th style={thtdStyle}>Price</th>
                    <th style={thtdStyle}>GST %</th>
                    <th style={thtdStyle}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td style={thtdStyle}>{item.product_id || '-'}</td>
                      <td style={thtdStyle}>{item.quantity}</td>
                      <td style={thtdStyle}>{item.price}</td>
                      <td style={thtdStyle}>{item.gst_percent}</td>
                      <td style={thtdStyle}>{item.quantity && item.price ? (item.quantity * item.price).toFixed(2) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div style={cardStyle}>Invoice not found.</div>
      )}
    </div>
  );
} 