import React, { useContext, useState, useEffect } from 'react'; // Added useEffect
import PropTypes from 'prop-types';
import ProductItem from '../ProductItem/ProductItem';
import AddProductForm from '../AddProductForm/AddProductForm';
import { ProductContext } from '../../contexts/ProductContext';
import './ProductListingPage.css';

function ProductListingPage({ addToCart }) {
  const {
    products,
    isLoading: isContextLoading, // Renamed to avoid conflict if this component had its own isLoading
    error: contextError,
    successMessage: contextSuccessMessage,
    clearMessages
  } = useContext(ProductContext);

  const [showAddForm, setShowAddForm] = useState(false);
  const [pageMessage, setPageMessage] = useState(''); // For messages specific to this page actions

  useEffect(() => {
    // Display context success or error messages that are not handled by forms
    if (contextSuccessMessage) {
      setPageMessage({ type: 'success', text: contextSuccessMessage });
      // Context messages auto-clear, but if we want page message to clear too:
      const timer = setTimeout(() => setPageMessage(''), 3000);
      return () => clearTimeout(timer);
    }
    if (contextError) {
      // Errors from context might persist until a new action clears them.
      // We show them here if they are not shown by a specific form.
      setPageMessage({ type: 'danger', text: contextError });
      // Do not auto-clear errors here, let context manage or user action resolve.
    }
  }, [contextSuccessMessage, contextError]);


  const handleProductAdded = () => {
    // AddProductForm handles its own success message from context.
    // Optionally, close the form.
    // setShowAddForm(false);
    // The pageMessage will update if contextSuccessMessage is set by addProduct.
  };

  const handleToggleForm = () => {
    clearMessages(); // Clear any existing messages from context
    setPageMessage(''); // Clear page-specific messages
    setShowAddForm(!showAddForm);
  };

  // Display loading state from context (usually for initial product fetch)
  if (isContextLoading && products.length === 0 && !showAddForm) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  // Display error state from context if it's a fetch error and not showing form
  // Specific form errors are handled within those forms.
  if (contextError && !showAddForm && products.length === 0) { // Show general error if products can't load
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger" role="alert">
          Error al cargar productos: {contextError}
        </div>
      </div>
    );
  }

  // If no products and not loading/error, and not showing form
  if (!isContextLoading && products.length === 0 && !contextError && !showAddForm) {
    return (
      <div className="container my-5 text-center">
        <p>No se encontraron productos.</p>
        <button
          onClick={handleToggleForm}
          className="btn btn-primary mt-3"
        >
          Agregar Nuevo Producto
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5 product-listing-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Nuestros Productos</h2>
        <button
          onClick={handleToggleForm}
          className={`btn ${showAddForm ? 'btn-outline-secondary' : 'btn-primary'}`}
          disabled={isContextLoading && showAddForm} // Disable if form is open and context is busy
        >
          {showAddForm ? 'Cancelar y Ocultar Formulario' : 'Agregar Nuevo Producto'}
        </button>
      </div>

      {/* Display page-level messages (e.g., after successful delete not tied to a form) */}
      {pageMessage && (
        <div className={`alert alert-${pageMessage.type} alert-dismissible fade show`} role="alert">
          {pageMessage.text}
          <button type="button" className="btn-close" onClick={() => setPageMessage('')} aria-label="Close"></button>
        </div>
      )}


      {showAddForm && (
        <div className="mb-4">
          <AddProductForm onProductAdded={handleProductAdded} />
          {/* AddProductForm will display its own success/error from context during add operation */}
        </div>
      )}

      {products.length > 0 ? (
        <div className="row">
          {products.map(product => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <ProductItem product={product} addToCart={addToCart} />
            </div>
          ))}
        </div>
      ) : (
         !showAddForm && <p className="text-center">No hay productos para mostrar en este momento.</p>
        // If form is shown, this message is redundant or potentially confusing.
      )}
    </div>
  );
}

ProductListingPage.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default ProductListingPage;
