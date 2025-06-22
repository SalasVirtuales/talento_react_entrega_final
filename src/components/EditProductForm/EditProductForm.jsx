import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ProductContext } from '../../contexts/ProductContext'; // Corrected path
import './EditProductForm.css'; // Optional: if you need specific styles

function EditProductForm({ product, onProductEdited, onCancel }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  const { editProduct, isLoading, error: apiError, successMessage, clearMessages } = useContext(ProductContext);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price !== undefined ? String(product.price) : '');
      setDescription(product.description || '');
      setCategory(product.category || '');
      setImageUrl(product.imageUrl || '');
      clearMessages(); // Clear any previous messages when form loads for a new product
    }
  }, [product, clearMessages]);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
    const priceFloat = parseFloat(price);
    if (isNaN(priceFloat) || priceFloat <= 0) newErrors.price = 'El precio debe ser un número mayor a 0.';
    if (description.trim().length < 10) newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
    if (!category.trim()) newErrors.category = 'La categoría es obligatoria.';
    // Optional: Validate imageUrl if needed
    // if (imageUrl.trim() && !/^https?:\/\/.+\..+/.test(imageUrl)) newErrors.imageUrl = 'URL de imagen no válida.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    if (!validateForm() || !product) {
      return;
    }

    const updatedProductData = {
      // id: product.id, // ID is used to find the product, not part of updatable data here
      name,
      price: parseFloat(price),
      description,
      category,
      imageUrl,
    };

    const result = await editProduct(product.id, updatedProductData);

    if (result) {
      if (onProductEdited) {
        onProductEdited(result); // Pass the updated product back
      }
      // Success message is handled by context and displayed below
      // Optionally, could close modal here if onProductEdited doesn't handle it
    }
    // Error message is handled by context and displayed below
  };

  if (!product) return null; // Should not happen if modal logic is correct

  return (
    <div className="edit-product-form-container"> {/* Apply general modal/form styling via CSS */}
      <h4 className="mb-3 text-center">Editar Producto</h4>
      {apiError && <div className="alert alert-danger mt-2" role="alert">{apiError}</div>}
      {successMessage && <div className="alert alert-success mt-2" role="alert">{successMessage}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor={`editProductName-${product.id}`} className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id={`editProductName-${product.id}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor={`editProductPrice-${product.id}`} className="form-label">Precio</label>
          <input
            type="number"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            id={`editProductPrice-${product.id}`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={isLoading}
            min="0.01"
            step="0.01"
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor={`editProductDescription-${product.id}`} className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id={`editProductDescription-${product.id}`}
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor={`editProductCategory-${product.id}`} className="form-label">Categoría</label>
          <input
            type="text"
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            id={`editProductCategory-${product.id}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isLoading}
          />
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor={`editProductImageUrl-${product.id}`} className="form-label">URL de la Imagen</label>
          <input
            type="url"
            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
            id={`editProductImageUrl-${product.id}`}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={isLoading}
          />
          {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl}</div>}
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isLoading}>
                Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
                <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {' '}Actualizando...
                </>
            ) : (
                'Guardar Cambios'
            )}
            </button>
        </div>
      </form>
    </div>
  );
}

EditProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  onProductEdited: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditProductForm;
