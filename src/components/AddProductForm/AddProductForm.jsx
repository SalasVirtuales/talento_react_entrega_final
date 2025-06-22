import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ProductContext } from '../../contexts/ProductContext';
import './AddProductForm.css';

function AddProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  const { addProduct, isLoading, error: apiError, successMessage, clearMessages } = useContext(ProductContext);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
    // Price must be a positive number.
    const priceFloat = parseFloat(price);
    if (isNaN(priceFloat) || priceFloat <= 0) newErrors.price = 'El precio debe ser un número mayor a 0.';
    if (description.trim().length < 10) newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
    if (!category.trim()) newErrors.category = 'La categoría es obligatoria.';
    // Image URL can be optional. If required, add validation:
    // if (!imageUrl.trim()) newErrors.imageUrl = 'La URL de la imagen es obligatoria.';
    // else if (!/^https?:\/\/.+\..+/.test(imageUrl)) newErrors.imageUrl = 'URL de imagen no válida.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    if (!validateForm()) {
      return;
    }

    const newProductData = {
      name,
      price: parseFloat(price),
      description,
      category,
      imageUrl: imageUrl || 'https://via.placeholder.com/150', // Default image if none provided
    };

    const addedProduct = await addProduct(newProductData);

    if (addedProduct) {
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setImageUrl('');
      setErrors({});
      if (onProductAdded) {
        onProductAdded();
      }
    }
  };

  return (
    <div className="add-product-form-container card p-4 mb-4">
      <h3 className="mb-3 text-center">Agregar Nuevo Producto</h3>
      {apiError && <div className="alert alert-danger mt-3" role="alert">{apiError}</div>}
      {successMessage && <div className="alert alert-success mt-3" role="alert">{successMessage}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            aria-describedby="nameHelp"
          />
          {errors.name && <div id="nameHelp" className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Precio</label>
          <input
            type="number"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            id="productPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={isLoading}
            min="0.01"
            step="0.01"
            aria-describedby="priceHelp"
          />
          {errors.price && <div id="priceHelp" className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="productDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            aria-describedby="descriptionHelp"
          ></textarea>
          {errors.description && <div id="descriptionHelp" className="invalid-feedback">{errors.description}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">Categoría</label>
          <input
            type="text"
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            id="productCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isLoading}
            aria-describedby="categoryHelp"
          />
          {errors.category && <div id="categoryHelp" className="invalid-feedback">{errors.category}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="productImageUrl" className="form-label">URL de la Imagen</label>
          <input
            type="url"
            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
            id="productImageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={isLoading}
            aria-describedby="imageUrlHelp"
          />
           {errors.imageUrl && <div id="imageUrlHelp" className="invalid-feedback">{errors.imageUrl}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {' '}Agregando...
            </>
          ) : (
            'Agregar Producto'
          )}
        </button>
      </form>
    </div>
  );
}

AddProductForm.propTypes = {
  onProductAdded: PropTypes.func,
};

export default AddProductForm;
