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

export default function Customers() {
  const { store_id } = useParams();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: '', whatsapp: '', email: '', address: '' });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchCustomers = () => {
    setLoading(true);
    axios.get(`/stores/${store_id}/customers`)
      .then(res => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load customers');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, [store_id]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setFormError(null);
    try {
      await axios.post(`/stores/${store_id}/customers`, form);
      setShowForm(false);
      setForm({ name: '', type: '', whatsapp: '', email: '', address: '' });
      fetchCustomers();
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to create customer');
    }
    setCreating(false);
  };

  return (
    <div>
      <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}`)}>&larr; Back to Store</button>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>Customers</h2>
      <button style={buttonStyle} onClick={() => setShowForm(f => !f)}>
        {showForm ? 'Cancel' : 'Add Customer'}
      </button>
      {showForm && (
        <form onSubmit={handleCreate} style={{ ...cardStyle, maxWidth: 400, margin: '1rem auto' }}>
          <h3 style={{ color: '#fff', marginBottom: 16 }}>Add Customer</h3>
          {formError && <div style={{ color: '#f33', marginBottom: 12 }}>{formError}</div>}
          <label>Name</label>
          <input
            style={{ width: '100%', ...thtdStyle, marginBottom: 12 }}
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            autoFocus
          />
          <label>Type</label>
          <input
            style={{ width: '100%', ...thtdStyle, marginBottom: 12 }}
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            required
          />
          <label>WhatsApp</label>
          <input
            style={{ width: '100%', ...thtdStyle, marginBottom: 12 }}
            value={form.whatsapp}
            onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
            required
          />
          <label>Email</label>
          <input
            style={{ width: '100%', ...thtdStyle, marginBottom: 12 }}
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            type="email"
          />
          <label>Address</label>
          <input
            style={{ width: '100%', ...thtdStyle, marginBottom: 12 }}
            value={form.address}
            onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
            required
          />
          <button style={buttonStyle} type="submit" disabled={creating}>
            {creating ? 'Adding...' : 'Add'}
          </button>
        </form>
      )}
      {loading ? (
        <div style={cardStyle}>Loading customers...</div>
      ) : error ? (
        <div style={{ ...cardStyle, color: '#f33' }}>{error}</div>
      ) : customers.length === 0 ? (
        <div style={cardStyle}>No customers found.</div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thtdStyle}>Name</th>
              <th style={thtdStyle}>Type</th>
              <th style={thtdStyle}>WhatsApp</th>
              <th style={thtdStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer._id}>
                <td style={thtdStyle}>
                  <Link to={`/stores/${store_id}/customers/${customer._id}`} style={linkStyle}>{customer.name}</Link>
                </td>
                <td style={thtdStyle}>{customer.type}</td>
                <td style={thtdStyle}>{customer.whatsapp}</td>
                <td style={thtdStyle}>{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 