import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal'; // Assuming Modal is in ../Modal/Modal.jsx
import './ConfirmationModal.css'; // Optional: for specific styling

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar Acción',
  message = '¿Estás seguro de que deseas continuar?',
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
  isLoading = false,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="confirmation-modal-content">
        <p>{message}</p>
        {/* Optional: Add an alert here for critical actions */}
        {/* <div className="alert alert-warning" role="alert">Esta acción no se puede deshacer.</div> */}
      </div>
      <div className="confirmation-modal-actions d-flex justify-content-end gap-2 mt-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelButtonText}
        </button>
        <button
          type="button"
          className="btn btn-danger" // Or btn-primary depending on action
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {' '}Procesando...
            </>
          ) : (
            confirmButtonText
          )}
        </button>
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  isLoading: PropTypes.bool, // To disable buttons during async operation
};

export default ConfirmationModal;
