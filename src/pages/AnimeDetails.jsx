import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/AnimeDetails.css";

// Función para convertir el título en un slug amigable para URL
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const AnimeDetails = () => {
  const { animeId } = useParams();
  const [anime, setAnime] = useState(null);
  const [groupedEpisodes, setGroupedEpisodes] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [liked, setLiked] = useState(false);
  const [viewIncremented, setViewIncremented] = useState(false); // Nuevo estado
  const incrementedRef = useRef(false); // Reemplazar estado con useRef para evitar múltiples actualizaciones

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/animes/${animeId}`
        );
        const data = await response.json();
        setAnime(data);

        const episodes = data.episodes;
        const groups = [];
        for (let i = 0; i < episodes.length; i += 50) {
          groups.push(episodes.slice(i, i + 50));
        }
        setGroupedEpisodes(groups);

        const likedAnimes =
          JSON.parse(localStorage.getItem("likedAnimes")) || [];
        if (likedAnimes.includes(animeId)) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Error al cargar los detalles del anime:", error);
      }
    };

    const incrementViews = async () => {
      if (incrementedRef.current) return; // Evitar múltiples incrementos
      try {
        await fetch(`http://localhost:3000/anime/view`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ animeId }),
        });
        incrementedRef.current = true; // Marcar que la vista ha sido incrementada
      } catch (error) {
        console.error("Error al incrementar las vistas del anime:", error);
      }
    };

    fetchAnimeDetails();
    incrementViews(); // Llamar a la API para incrementar las vistas
  }, [animeId]);

  // Resto del código permanece igual

  const handleLike = async () => {
    const likedAnimes = JSON.parse(localStorage.getItem("likedAnimes")) || [];
    if (likedAnimes.includes(animeId)) {
      return;
    }

    const updatedAnime = { ...anime };
    updatedAnime.anime.likes += 1;

    likedAnimes.push(animeId);
    localStorage.setItem("likedAnimes", JSON.stringify(likedAnimes));

    setLiked(true);
    setAnime(updatedAnime);

    try {
      await fetch(`http://localhost:3000/api/animes/${animeId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: updatedAnime.anime.likes }),
      });
    } catch (error) {
      console.error(
        "Error al actualizar los likes en la base de datos:",
        error
      );
    }
  };

  const isEpisodeWatched = (episodeId) => {
    const watchedEpisodes =
      JSON.parse(localStorage.getItem("watchedEpisodes")) || [];
    return watchedEpisodes.includes(episodeId);
  };

  const handleEpisodeLike = (episodeId) => {
    const likedEpisodes =
      JSON.parse(localStorage.getItem("likedEpisodes")) || {};
    if (likedEpisodes[episodeId]) {
      return;
    }

    likedEpisodes[episodeId] = true;
    localStorage.setItem("likedEpisodes", JSON.stringify(likedEpisodes));
  };

  const markEpisodeAsWatched = (episodeId) => {
    const watchedEpisodes =
      JSON.parse(localStorage.getItem("watchedEpisodes")) || [];
    if (!watchedEpisodes.includes(episodeId)) {
      watchedEpisodes.push(episodeId);
      localStorage.setItem("watchedEpisodes", JSON.stringify(watchedEpisodes));
    }
  };

  if (!anime) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="anime-details">
      <div className="anime-header">
        <div className="socail-contain">
          <img
            className="anime-image"
            src={anime.anime.image}
            alt={anime.anime.title}
          />
          <button
            className={`anime-like-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
            disabled={liked}
          >
            {liked ? "¡Te gusta!" : "Dar Like"}
          </button>
          <div className="anime-likes-views">
            <p>
              <strong>Likes:</strong> {anime.anime.likes}
            </p>
            <p>
              <strong>Vistas:</strong> {anime.anime.views}
            </p>
          </div>
        </div>

        <div className="anime-info">
          <h1 className="anime-title">{anime.anime.title}</h1>
          <p
            className={`anime-synopsis ${showFullSynopsis ? "show-full" : ""}`}
          >
            {showFullSynopsis
              ? anime.anime.synopsis
              : `${anime.anime.synopsis.split("\n")[0]}...`}
          </p>
          {!showFullSynopsis && (
            <p
              className="show-more"
              onClick={() => setShowFullSynopsis(!showFullSynopsis)}
            >
              Ver más detalles...
            </p>
          )}
          <div className="anime-meta">
            <p>
              <strong>Emitido:</strong> {anime.anime.emitido}
            </p>
            <p>
              <strong>Tipo:</strong> {anime.anime.tipo}
            </p>
            <p>
              <strong>Estado:</strong> {anime.anime.estado}
            </p>
            <p>
              <strong>Géneros:</strong> {anime.anime.genres}
            </p>
          </div>
        </div>
      </div>

      <h2>Episodios</h2>
      <div className="episode-groups">
        {groupedEpisodes.map((_, index) => (
          <button
            key={index}
            className={`group-button ${index === currentGroup ? "active" : ""}`}
            onClick={() => setCurrentGroup(index)}
          >
            {`${index * 50 + 1}-${Math.min(
              (index + 1) * 50,
              anime.episodes.length
            )}`}
          </button>
        ))}
      </div>

      <div className="episode-scroll">
        {groupedEpisodes[currentGroup]?.map((episode) => (
          <div
            key={episode.id}
            className={`episode-item ${
              isEpisodeWatched(episode.id) ? "watched" : ""
            }`}
          >
            <Link
              className="episode-link"
              to={`/episode/${episode.id}`}
              onClick={() => {
                markEpisodeAsWatched(episode.id);
                handleEpisodeLike(episode.id);
              }}
            >
              {episode.episode_title}
              {isEpisodeWatched(episode.id) && (
                <span className="watched-label"> -Visto👁️‍🗨️</span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeDetails;
