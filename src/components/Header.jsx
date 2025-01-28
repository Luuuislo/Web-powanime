import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoHeader from '../assets/logo4.png';
import logoMenuMovil from '../assets/logo2.png';
import "../styles/Header.css";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <>
      {!isMobile ? (
        <header className="main-header">
          <div className="logo">
            <NavLink to='/'><img src={logoHeader} alt="PowAnime" /></NavLink>
          </div>
          <nav>
            <ul className="nav-links">
              <li className="list">
                <NavLink className="link" to="/">Inicio</NavLink>
              </li>
              <li className="list">
                <NavLink className="link" to="catalogo">Catálogo</NavLink>
              </li>
              <li className="list">
                <NavLink className="link" to="calendario">En Emision</NavLink>
              </li>
              <li>
                <form onSubmit={handleSearch}>
                  <input
                    className="main-buscador"
                    type="text"
                    placeholder="Buscar anime..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </li>
            </ul>
          </nav>
        </header>
      ) : (
        <div className="mobile-header">
          <div className="logo-movil">
            <NavLink to='/'><img src={logoHeader} alt="PowAnime Logo" /></NavLink>
          </div>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
          {menuOpen && (
            <div className="mobile-menu">
              <div>
                <NavLink to='/'><img src={logoMenuMovil} alt="logoMovil" /></NavLink>
              </div>
              <div className="close-btn" onClick={() => setMenuOpen(false)}>
                ✕
              </div>
              <ul className="nav-links">
                <h3>Menu</h3>
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Buscar anime..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <li className="list">
                  <NavLink className="link" to="/" onClick={() => setMenuOpen(false)}>
                    Inicio 
                  </NavLink>
                </li>
                <li className="list">
                  <NavLink className="link" to="catalogo" onClick={() => setMenuOpen(false)}>
                    Catálogo
                  </NavLink>
                </li>
                <li className="list">
                  <NavLink className="link" to="calendario" onClick={() => setMenuOpen(false)}>
                    Coming Soon
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};
