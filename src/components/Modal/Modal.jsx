import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (e) => {
    // Close only if the click is on the backdrop itself, not on modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Modal size classes for Bootstrap
  const modalSizeClass = {
    sm: 'modal-sm',
    md: '', // Default Bootstrap modal size
    lg: 'modal-lg',
    xl: 'modal-xl',
  }[size];

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className={`modal-dialog modal-dialog-centered ${modalSizeClass}`} role="document">
        <div className="modal-content">
          <div className="modal-header">
            {title && <h5 className="modal-title" id="modalTitle">{title}</h5>}
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {/* Footer can be added here if needed, or handled by children */}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

export default Modal;
