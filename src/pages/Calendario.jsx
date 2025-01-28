import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Calendario.css';

const Calendario = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        
        const {data} = await axios.get('https://api.jikan.moe/v4/seasons/now?sfw');
        setAnimes(data.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos.');
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="calendario-container">
      <h1>En Emision</h1>
      <div className="anime-grid">
        {animes.map((anime) => (
          <div key={anime.mal_id} className="anime-card">
           
          <Link to={`/anime/${anime.id}`}>
          <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="anime-image"
            />
          </Link>
         
            <h3 className="anime-title">{anime.title}</h3>
            <p className="anime-date">Estreno: {anime.aired.from ? new Date(anime.aired.from).toLocaleDateString() : 'Fecha no disponible'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendario;
