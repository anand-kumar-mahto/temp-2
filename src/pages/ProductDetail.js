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

export default function ProductDetail() {
  const { store_id, product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`/stores/${store_id}/products/${product_id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load product');
        setLoading(false);
      });
  }, [store_id, product_id]);

  return (
    <div>
      <button style={buttonStyle} onClick={() => navigate(`/stores/${store_id}/products`)}>&larr; Back to Products</button>
      {loading ? (
        <div style={cardStyle}>Loading product...</div>
      ) : error ? (
        <div style={{ ...cardStyle, color: '#f33' }}>{error}</div>
      ) : product ? (
        <div style={cardStyle}>
          <h2 style={{ color: '#fff', marginBottom: 16 }}>{product.name}</h2>
          <div style={labelStyle}>Type: <span style={{ color: '#fff' }}>{product.product_type}</span></div>
          <div style={labelStyle}>Brand: <span style={{ color: '#fff' }}>{product.brand}</span></div>
          <div style={labelStyle}>Base Price: <span style={{ color: '#fff' }}>{product.base_price}</span></div>
          <div style={labelStyle}>Stock Quantity: <span style={{ color: '#fff' }}>{product.stock_quantity}</span></div>
          <div style={labelStyle}>Created At: <span style={{ color: '#fff' }}>{product.created_at ? new Date(product.created_at).toLocaleString() : '-'}</span></div>
        </div>
      ) : null}
    </div>
  );
} 