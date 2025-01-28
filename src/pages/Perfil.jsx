import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Perfil.css';

const Perfil = () => {
  const [favorites, setFavorites] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [animeInput, setAnimeInput] = useState('');
  const navigate = useNavigate();

  const addFavorite = () => {
    if (animeInput.trim() !== '') {
      setFavorites([...favorites, animeInput]);
      setAnimeInput('');
    }
  };

  const addToWatch = () => {
    if (animeInput.trim() !== '') {
      setToWatch([...toWatch, animeInput]);
      setAnimeInput('');
    }
  };

  const removeAnime = (list, setList, anime) => {
    setList(list.filter((item) => item !== anime));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <div className="perfil-image-container">
          <img
            className="perfil-image"
            src="https://via.placeholder.com/150" // Cambia este enlace por una foto real del perfil
            alt="Foto de perfil"
          />
        </div>
        <h1 className="perfil-username">Nombre de Usuario</h1>
      </div>

      <div className="anime-input">
        <input
          type="text"
          placeholder="Añadir anime..."
          value={animeInput}
          onChange={(e) => setAnimeInput(e.target.value)}
        />
        <button onClick={addFavorite} className="add-button">
          Añadir a Favoritos
        </button>
        <button onClick={addToWatch} className="add-button">
          Añadir a Por Ver
        </button>
      </div>

      <div className="anime-lists">
        <div className="anime-list">
          <h2 className="list-title">Animes Favoritos</h2>
          <ul>
            {favorites.map((anime, index) => (
              <li key={index}>
                {anime}
                <button
                  className="remove-button"
                  onClick={() => removeAnime(favorites, setFavorites, anime)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="anime-list">
          <h2 className="list-title">Animes Por Ver</h2>
          <ul>
            {toWatch.map((anime, index) => (
              <li key={index}>
                {anime}
                <button
                  className="remove-button"
                  onClick={() => removeAnime(toWatch, setToWatch, anime)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Perfil;
