import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AnimeList.css';

const AnimeList = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    // Función para obtener los animes más recientes
    const fetchAnimes = async () => {
      const response = await fetch('http://localhost:3000/api/animes/latest');
      const data = await response.json();
      setAnimes(data);
    };

    fetchAnimes();
  }, []);

  return (
    <>
      <h1 className='h1-animelist'>Últimos Animes ✨</h1>
      <div className="contaier-series-2">
        <div className="anime-list-2">
          {animes.map((anime) => (
            <div key={anime.id} className="anime-card-2">
              <Link to={`/anime/${anime.id}`} className="btn">
                <img src={anime.image} alt={anime.title} />
                
              </Link>
             
              <h3>{anime.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimeList;
