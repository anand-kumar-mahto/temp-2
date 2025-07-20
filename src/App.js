import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Stores from './pages/Stores';
import StoreDetail from './pages/StoreDetail';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Quotations from './pages/Quotations';
import QuotationDetail from './pages/QuotationDetail';
import Invoices from './pages/Invoices';
import InvoiceDetail from './pages/InvoiceDetail';
import Settings from './pages/Settings';

const Placeholder = ({ title }) => (
  <div style={{ color: '#fff', textAlign: 'center', fontSize: 32, marginTop: 40 }}>
    {title}
    <div style={{ fontSize: 16, color: '#bbb', marginTop: 16 }}>[Black & White UI Placeholder]</div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem', background: '#181818', borderRadius: 8, minHeight: '70vh', color: '#fff' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/stores" element={<ProtectedRoute><Stores /></ProtectedRoute>} />
            <Route path="/stores/:store_id" element={<ProtectedRoute><StoreDetail /></ProtectedRoute>} />
            <Route path="/stores/:store_id/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/stores/:store_id/customers/:customer_id" element={<ProtectedRoute><CustomerDetail /></ProtectedRoute>} />
            <Route path="/stores/:store_id/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/stores/:store_id/products/:product_id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="/stores/:store_id/quotations" element={<ProtectedRoute><Quotations /></ProtectedRoute>} />
            <Route path="/stores/:store_id/quotations/:quotation_id" element={<ProtectedRoute><QuotationDetail /></ProtectedRoute>} />
            <Route path="/stores/:store_id/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
            <Route path="/stores/:store_id/invoices/:invoice_id" element={<ProtectedRoute><InvoiceDetail /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute><Placeholder title="Customers" /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><Placeholder title="Products" /></ProtectedRoute>} />
            <Route path="/quotations" element={<ProtectedRoute><Placeholder title="Quotations" /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute><Placeholder title="Invoices" /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
