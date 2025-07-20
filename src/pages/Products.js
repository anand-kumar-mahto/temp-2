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

export default function Products() {
  const { store_id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', product_type: '', brand: '', base_price: '', stock_quantity: '' });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    axios.get(`/stores/${store_id}/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load products');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [store_id]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setFormError(null);
    try {
      await axios.post(`/stores/${store_id}/products`, {
        ...form,
        base_price: form.base_price ? parseFloat(form.base_price) : undefined,
        stock_quantity: form.stock_quantity ? parseInt(form.stock_quantity) : undefined,
      });
      setShowForm(false);
      setForm({ name: '', product_type: '', brand: '', base_price: '', stock_quantity: '' });
      fetchProducts();
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to create product');
    }
    setCreating(false);
  };

  return (
    <div>
      <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}`)}>&larr; Back to Store</button>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>Products</h2>
      <button style={buttonStyle} onClick={() => setShowForm(f => !f)}>
        {showForm ? 'Cancel' : 'Add Product'}
      </button>
      {showForm && (
        <form onSubmit={handleCreate} style={{ ...cardStyle, maxWidth: 400, margin: '1rem auto' }}>
          <h3 style={{ color: '#fff', marginBottom: 16 }}>Add Product</h3>
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
            value={form.product_type}
            onChange={e => setForm(f => ({ ...f, product_type: e.target.value }))}
            required
          />
          <label>Brand</label>
          <input
            style={{ width: '100%', ...thtdStyle, marginBottom: 12 }}
            value={form.brand}
            onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
          />
          <label>Base Price</label>
          <input
            style={{ width: '100%', ...thtdStyle, marginBottom: 12 }}
            value={form.base_price}
            onChange={e => setForm(f => ({ ...f, base_price: e.target.value }))}
            type="number"
            min="0"
            step="0.01"
          />
          <label>Stock Quantity</label>
          <input
            style={{ width: '100%', ...thtdStyle, marginBottom: 12 }}
            value={form.stock_quantity}
            onChange={e => setForm(f => ({ ...f, stock_quantity: e.target.value }))}
            type="number"
            min="0"
          />
          <button style={buttonStyle} type="submit" disabled={creating}>
            {creating ? 'Adding...' : 'Add'}
          </button>
        </form>
      )}
      {loading ? (
        <div style={cardStyle}>Loading products...</div>
      ) : error ? (
        <div style={{ ...cardStyle, color: '#f33' }}>{error}</div>
      ) : products.length === 0 ? (
        <div style={cardStyle}>No products found.</div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thtdStyle}>Name</th>
              <th style={thtdStyle}>Type</th>
              <th style={thtdStyle}>Brand</th>
              <th style={thtdStyle}>Base Price</th>
              <th style={thtdStyle}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td style={thtdStyle}>
                  <Link to={`/stores/${store_id}/products/${product._id}`} style={linkStyle}>{product.name}</Link>
                </td>
                <td style={thtdStyle}>{product.product_type}</td>
                <td style={thtdStyle}>{product.brand}</td>
                <td style={thtdStyle}>{product.base_price}</td>
                <td style={thtdStyle}>{product.stock_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 