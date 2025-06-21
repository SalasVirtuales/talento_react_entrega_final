import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'; 
import './NavigationBar.css';

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top main-nav">
      <div className="container-fluid px-md-5">
        <a className="navbar-brand" href="#">
          <img src="https://static.vecteezy.com/system/resources/previews/016/277/954/large_2x/lion-logo-vector.jpg" alt="Leon Logo" style={{ height: '100px' }} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <a className="nav-link" href="#">Nuevos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Mujeres</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Hombres</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Niños</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Deportes</a>
            </li>           
          </ul>
          <ul className="navbar-nav ms-auto d-flex flex-row">
            <li className="nav-item me-3">
              <a className="nav-link" href="#"><FontAwesomeIcon icon={faSearch} /></a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="#"><FontAwesomeIcon icon={faHeart} /></a> {}
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="#"><FontAwesomeIcon icon={faShoppingCart} /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><FontAwesomeIcon icon={faUser} /></a> {}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
