import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingCart, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'; // Removed faUser
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './NavigationBar.css';

function NavigationBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top main-nav">
      <div className="container-fluid px-md-5">
        <Link className="navbar-brand" to="/">
          <img src="https://static.vecteezy.com/system/resources/previews/016/277/954/large_2x/lion-logo-vector.jpg" alt="Leon Logo" style={{ height: '100px' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/new">Nuevos</Link> {/* Assuming /new, /women etc. are or will be valid routes */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/women">Mujeres</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/men">Hombres</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kids">Niños</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sports">Deportes</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
            <li className="nav-item me-3">
              <a className="nav-link" href="#"><FontAwesomeIcon icon={faSearch} /></a> {/* Search can remain an anchor or be a button opening a modal */}
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="#"><FontAwesomeIcon icon={faHeart} /></a> {/* Wishlist can be a Link if it's a page */}
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={handleLogout} title="Logout">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login" title="Login">
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
