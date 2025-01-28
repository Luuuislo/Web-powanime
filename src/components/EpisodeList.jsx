import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Episodes.css';
import playIcon from '../assets/play-background.png';  // Asegúrate de importar el icono

const EpisodesList = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // Función para obtener los episodios más recientes (limitados a 10)
    const fetchEpisodes = async () => {
      const response = await fetch('http://localhost:3000/api/episodes/latest?limit=20');
      const data = await response.json();
      setEpisodes(data);
    };

    fetchEpisodes();
  }, []);

  // Función para verificar si el episodio ha sido visto
  const isEpisodeWatched = (episodeId) => {
    const watchedEpisodes = JSON.parse(localStorage.getItem('watchedEpisodes')) || [];
    return watchedEpisodes.includes(episodeId);
  };

  // Función para marcar el episodio como visto
  const markEpisodeAsWatched = (episodeId) => {
    const watchedEpisodes = JSON.parse(localStorage.getItem('watchedEpisodes')) || [];
    if (!watchedEpisodes.includes(episodeId)) {
      watchedEpisodes.push(episodeId);
      localStorage.setItem('watchedEpisodes', JSON.stringify(watchedEpisodes));
    }
  };

  return (
    <div className='container'>
      <h1 className='h1-episodelist'>Últimos Capitulos en Emision ⚡</h1>
      <div className="episodes-list">
        <div className="episode-cards">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className={`episode-card ${isEpisodeWatched(episode.id) ? 'watched' : ''}`}
            >
              <Link
                to={`/episode/${episode.id}`}
                className="episode-link"
                onClick={() => markEpisodeAsWatched(episode.id)} // Marcar como visto al hacer clic
              >
                <div className="episode-image-container">
                  <div className="episode-image-wrapper">
                    <img
                      src={episode.image_episode}
                      alt={episode.episode_title}
                      className="episode-image"
                    />
                    <span className="episode-number">▷ {episode.views}</span>
                    <img src={playIcon} alt="Play Icon" className="play-icon" />
                  </div>
                </div>
              </Link>
              <p>{episode.episode_title}</p>
              <h3>{episode.anime_title}</h3>
              
              {/* Mostrar "Visto" al lado del título si el episodio ha sido visto */}
              {isEpisodeWatched(episode.id) && <span className="watched-label"></span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EpisodesList;
