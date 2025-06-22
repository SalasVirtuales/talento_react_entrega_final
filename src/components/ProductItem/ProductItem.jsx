import React, { useState, useContext } from 'react'; // Added useContext
import PropTypes from 'prop-types';
import './ProductItem.css';
import Modal from '../Modal/Modal';
import EditProductForm from '../EditProductForm/EditProductForm';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'; // Import ConfirmationModal
import { ProductContext } from '../../contexts/ProductContext'; // Import ProductContext

const formatPrice = (price) => {
  return `$${price !== undefined && price !== null ? Number(price).toFixed(2) : 'N/A'}`;
}

function ProductItem({ product, addToCart }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  const { deleteProduct, isLoading: isContextLoading, error: contextError, successMessage: contextSuccessMessage, clearMessages } = useContext(ProductContext);


  if (!product) {
    return null; 
  }

  const { id, name, description, price, imageUrl } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleOpenEditModal = () => {
    clearMessages(); // Clear any previous context messages
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    // Context messages for edit are handled by EditProductForm
  };

  const handleProductEdited = (/*updatedProduct*/) => {
    handleCloseEditModal();
    // Success message for edit is shown by EditProductForm from context
  };

  const handleOpenDeleteConfirmModal = () => {
    clearMessages(); // Clear previous messages before showing new modal
    setIsDeleteConfirmModalOpen(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    // clearMessages() is called by deleteProduct in context
    const success = await deleteProduct(id);
    if (success) {
      handleCloseDeleteConfirmModal();
      // Success message is shown by ProductContext (globally or on listing page)
    }
    // If not successful, error message is shown by ProductContext
    // Modal remains open if delete fails, allowing user to see contextError if displayed within modal, or retry.
    // Or, close it regardless: handleCloseDeleteConfirmModal();
  };

  // Display general context messages if needed (e.g., after delete success/failure)
  // This is optional here as messages are also shown by forms or listing page.
  // This could be useful if an action here directly triggers a context message not tied to a form.
  // useEffect(() => {
  //   if (contextSuccessMessage || contextError) {
  //     // Handle showing these messages, e.g., using a toast library
  //     // console.log("Context Message in ProductItem:", contextSuccessMessage || contextError);
  //     // clearMessages(); // Optionally clear them if handled locally
  //   }
  // }, [contextSuccessMessage, contextError, clearMessages]);


  return (
    <>
      <div className="card product-item h-100 shadow-sm">
        <img
          src={imageUrl || 'https://placehold.co/300x200/EFEFEF/AAAAAA?text=No+Image'}
          className="card-img-top product-image"
          alt={name || 'Product Image'}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name || 'Producto sin nombre'}</h5>
          <p className="card-text product-description flex-grow-1">{description || 'Sin descripción.'}</p>
          <p className="card-text text-primary fw-bold fs-5">{formatPrice(price)}</p>

          <button
            onClick={handleAddToCart}
            className="btn btn-success mt-auto mb-2"
            disabled={isContextLoading} // Disable if context is busy with another operation
          >
            Añadir al Carrito
          </button>

          <div className="product-actions mt-2 d-flex justify-content-between">
            <button
              onClick={handleOpenEditModal}
              className="btn btn-outline-primary btn-sm"
              disabled={isContextLoading}
            >
              Editar
            </button>
            <button
              onClick={handleOpenDeleteConfirmModal}
              className="btn btn-outline-danger btn-sm"
              disabled={isContextLoading}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <Modal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            title={`Editar: ${name || 'Producto'}`}
            size="lg"
        >
          <EditProductForm
            product={product}
            onProductEdited={handleProductEdited}
            onCancel={handleCloseEditModal}
            // isLoading prop for form can be passed from isContextLoading if needed
          />
        </Modal>
      )}

      {isDeleteConfirmModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteConfirmModalOpen}
          onClose={handleCloseDeleteConfirmModal}
          onConfirm={handleConfirmDelete}
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar el producto "${name || 'este producto'}"? Esta acción no se puede deshacer.`}
          confirmButtonText="Eliminar"
          isLoading={isContextLoading} // Pass context's loading state
        />
      )}
    </>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductItem;
