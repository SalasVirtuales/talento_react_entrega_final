import React from 'react';
import PropTypes from 'prop-types'; 
import './ProductCard.css';

function ProductCard({ imageUrl, title, description, productUrl = "#" }) {
  return (
    <div className="card h-100"> {}
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body d-flex flex-column"> {}
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={productUrl} className="btn btn-dark mt-auto">Ver Detalles</a> {}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  productUrl: PropTypes.string
};

export default ProductCard;
