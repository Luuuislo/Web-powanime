import React from 'react';
import '../styles/Footer.css';
import logo2 from '../assets/logo2.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
      <img className='logo-footer' src= {logo2} alt="logo2-powanime" />
        <p className="footer-text">
           <strong>PowAnime</strong> no aloja ni almacena ningún contenido de video en sus servidores. Todos los videos y contenido relacionado son proporcionados por servicios externos <br /> y otros proveedores de contenido.
          Todos los derechos reservados <strong>© 2024 PowAnime</strong>
           </p>
      </div>
    </footer>
  );
};

export default Footer;
