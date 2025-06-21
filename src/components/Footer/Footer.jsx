import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4 mb-md-0"> {}
            <h5>Atención al Cliente</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Contacto</a></li>
              <li><a href="#" className="text-white text-decoration-none">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-white text-decoration-none">Envíos</a></li>
              <li><a href="#" className="text-white text-decoration-none">Devoluciones</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4 mb-md-0">
            <h5>Información</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Sobre Nosotros</a></li>
              <li><a href="#" className="text-white text-decoration-none">Tiendas</a></li>
              <li><a href="#" className="text-white text-decoration-none">Trabaja con Nosotros</a></li>
              <li><a href="#" className="text-white text-decoration-none">Términos y Condiciones</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4 mb-md-0">
            <h5>Síguenos</h5>
            <a href="#" className="text-white me-3"><FontAwesomeIcon icon={faFacebookF} size="lg" /></a>
            <a href="#" className="text-white me-3"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
            <a href="#" className="text-white me-3"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
            <a href="#" className="text-white"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
          </div>
          <div className="col-md-3 mb-4 mb-md-0">
            <h5>Suscríbete al Newsletter</h5>
            <form>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Tu email" aria-label="Tu email" aria-describedby="button-addon2" />
                <button className="btn btn-secondary" type="button" id="button-addon2">Suscribir</button>
              </div>
            </form>
          </div>
        </div>
        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}/> {}
        <div className="text-center">
          <small>&copy; <span id="currentYear">{currentYear}</span> LEON S.A. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
