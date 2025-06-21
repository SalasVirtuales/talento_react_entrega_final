import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import HeroSection from './components/HeroSection/HeroSection';
import ProductListingPage from './components/ProductListingPage/ProductListingPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
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
      <HeroSection />
      <div className="container-fluid px-md-5 mt-4">
        <div className="row">
          <div className="col-lg-9">
            <ProductListingPage addToCart={addToCart} />
          </div>
          <div className="col-lg-3">
            <ShoppingCart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
