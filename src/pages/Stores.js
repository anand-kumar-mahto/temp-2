import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

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

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchStores = () => {
    setLoading(true);
    axios.get('/stores')
      .then(res => {
        setStores(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load stores');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setFormError(null);
    try {
      await axios.post('/stores', { name, description });
      setShowForm(false);
      setName('');
      setDescription('');
      fetchStores();
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to create store');
    }
    setCreating(false);
  };

  return (
    <div>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>Stores</h2>
      <button style={buttonStyle} onClick={() => setShowForm(f => !f)}>
        {showForm ? 'Cancel' : 'Create Store'}
      </button>
      {showForm && (
        <form onSubmit={handleCreate} style={{ ...cardStyle, maxWidth: 400, margin: '1rem auto' }}>
          <h3 style={{ color: '#fff', marginBottom: 16 }}>Create Store</h3>
          {formError && <div style={{ color: '#f33', marginBottom: 12 }}>{formError}</div>}
          <label>Name</label>
          <input
            style={{ width: '100%', ...thtdStyle, marginBottom: 12 }}
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
          />
          <label>Description</label>
          <input
            style={{ width: '100%', ...thtdStyle, marginBottom: 12 }}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button style={buttonStyle} type="submit" disabled={creating}>
            {creating ? 'Creating...' : 'Create'}
          </button>
        </form>
      )}
      {loading ? (
        <div style={cardStyle}>Loading stores...</div>
      ) : error ? (
        <div style={{ ...cardStyle, color: '#f33' }}>{error}</div>
      ) : stores.length === 0 ? (
        <div style={cardStyle}>No stores found.</div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thtdStyle}>Name</th>
              <th style={thtdStyle}>Owner</th>
              <th style={thtdStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store._id}>
                <td style={thtdStyle}>
                  <Link to={`/stores/${store._id}`} style={linkStyle}>{store.name}</Link>
                </td>
                <td style={thtdStyle}>{store.owner_name}</td>
                <td style={thtdStyle}>{store.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 