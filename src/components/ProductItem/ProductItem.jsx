import React from 'react';
import PropTypes from 'prop-types';
import './ProductItem.css';


const formatPrice = (price) => {
  return `$${price ? price.toFixed(2) : 'N/A'}`;
}

function ProductItem({ product, addToCart }) {
  if (!product) {
    return null; 
  }

  return (
    <div className="card product-item h-100">
      <img src={product.imageUrl || 'https://placehold.co/300x200/EFEFEF/AAAAAA?text=Product'} className="card-img-top" alt={product.name || 'Product Image'} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name || 'Product Name'}</h5>
        <p className="card-text flex-grow-1">{product.description || 'Product description.'}</p>
        <p className="card-text fw-bold">{formatPrice(product.price)}</p>
        <button onClick={() => addToCart(product)} className="btn btn-primary mt-auto">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductItem;
