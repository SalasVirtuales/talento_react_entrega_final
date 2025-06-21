import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <header className="hero-section d-flex align-items-center justify-content-center justify-content-md-start text-white">
      <div className="container-fluid px-md-5">
        <div className="row">
          <div className="col-md-6 col-lg-5">
            <div className="hero-content p-4 p-md-0">
              <h1 className="display-3 fw-bold">Titulo Banner</h1>
              <p className="lead mb-4">Subtitulo Banner</p>
              <a href="#" className="btn btn-light btn-lg rounded-0 text-uppercase">OFERTAS</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
