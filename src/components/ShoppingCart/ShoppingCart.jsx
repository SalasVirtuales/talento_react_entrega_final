import React from 'react';
import PropTypes from 'prop-types';
import './ShoppingCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';


const formatPrice = (price) => {
  return `$${price ? price.toFixed(2) : '0.00'}`;
}

function ShoppingCart({ cartItems, removeFromCart, updateQuantity }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);

  const handleQuantityChange = (id, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    updateQuantity(id, newQuantity); // 
  };

  return (
    <div className="shopping-cart p-3 border rounded shadow-sm">
      <h4 className="mb-3">Carrito de Compras</h4>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="me-auto">
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">Precio: {formatPrice(item.price)} x {item.quantity}</small>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    title="Decrease quantity"
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                  >
                    <FontAwesomeIcon icon={faMinusSquare} />
                  </button>
                  <span className="me-2">{item.quantity}</span>
                  <button
                    title="Increase quantity"
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                  >
                    <FontAwesomeIcon icon={faPlusSquare} />
                  </button>
                  <button
                    title="Remove item"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>{formatPrice(total)}</strong>
            </li>
          </ul>
          <button className="btn btn-success w-100">Pagar</button>
        </>
      )}
    </div>
  );
}

ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default ShoppingCart;
