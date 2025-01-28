import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Search.css';

const Search = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:3000/api/animes/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setAnimes(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al obtener los resultados:', error);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="reslt-search-1">
      <h1 className="h1-result">Resultados de búsqueda para "{query}"</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="anime-results">
          {animes.length > 0 ? (
            animes.map((anime) => (
              <div key={anime.id} className="anime-item">
               <Link to={`/anime/${anime.id}`} className="btn"><img 
                  src={anime.image} 
                  alt={anime.title} 
                  className="anime-image" 
                /></Link>
                
                <h3>{anime.title}</h3>
                <p>{anime.tipo}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron resultados</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
