import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HeroSection from './components/HeroSection/HeroSection';
import ProductListingPage from './components/ProductListingPage/ProductListingPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // Import ProtectedRoute
import LoginPage from './pages/LoginPage/LoginPage'; // Import the actual LoginPage
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <div className="container-fluid px-md-5 mt-4">
              {/* For now, ProductListingPage is directly here. We might move ShoppingCart to a sidebar within Layout later if needed */}
              <ProductListingPage addToCart={addToCart} />
            </div>
          </>
        } />

        {/* Actual Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Route for Shopping Cart */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={
            <div className="container-fluid px-md-5 mt-4">
              <ShoppingCart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            </div>
          } />
        </Route>

        {/* Fallback route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
