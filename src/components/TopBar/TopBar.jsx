import React from 'react';
import './TopBar.css';

function TopBar() {
  return (
    <div className="top-bar bg-light py-1 text-center text-md-start">
      <div className="container-fluid px-md-5">
        <div className="row align-items-center">
          <div className="col-md-4 mb-1 mb-md-0">
            <small>Envío gratis</small>
          </div>
          <div className="col-md-4 mb-1 mb-md-0 text-md-center">
            <small>3 y 6 Cuotas Sin Interés</small>
          </div>
          <div className="col-md-4 text-md-end">
            <small className="me-3"><a href="#" className="text-dark text-decoration-none">Segui Tu Envio</a></small>
            <small className="me-3"><a href="#" className="text-dark text-decoration-none">Sucursales</a></small>
            <small><a href="#" className="text-dark text-decoration-none">Devoluciones</a></small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
