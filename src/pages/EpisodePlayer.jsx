import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styles/EpisodePlayer.css";

const EpisodePlayer = () => {
  const { episodeId } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [anime, setAnime] = useState(null);
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [watchedEpisodes, setWatchedEpisodes] = useState(() => {
    const savedWatched = localStorage.getItem("watchedEpisodes");
    return savedWatched ? JSON.parse(savedWatched) : [];
  });
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const savedLike = localStorage.getItem(`likedEpisode-${episodeId}`);
    if (savedLike === "true") {
      setLiked(true);
    }
  }, [episodeId]);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      const episodeResponse = await fetch(
        `http://localhost:3000/api/episodes/${episodeId}`
      );
      const episodeData = await episodeResponse.json();
      setEpisode(episodeData);

      const animeResponse = await fetch(
        `http://localhost:3000/api/animes/${episodeData.anime_id}`
      );
      const animeData = await animeResponse.json();
      setAnime(animeData.anime);
      setAllEpisodes(animeData.episodes);

      // Incrementar vistas al cargar el episodio y también al anime
      await fetch("http://localhost:3000/episode/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          episodeId: episodeId,
        }),
      });

      // Incrementar vistas del anime
      await fetch("http://localhost:3000/anime/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          animeId: episodeData.anime_id,
        }),
      });
    };

    fetchEpisodeDetails();
  }, [episodeId]);

  useEffect(() => {
    localStorage.setItem("watchedEpisodes", JSON.stringify(watchedEpisodes));
  }, [watchedEpisodes]);

  const getAdjacentEpisode = (direction) => {
    if (!episode || allEpisodes.length === 0) return null;

    const currentEpisodeIndex = allEpisodes.findIndex(
      (ep) => ep.episodeNumber === episode.episodeNumber
    );

    if (currentEpisodeIndex === -1) return null;

    let adjacentEpisodeIndex = null;

    if (direction === "next") {
      adjacentEpisodeIndex = currentEpisodeIndex + 1;
    } else if (direction === "prev") {
      adjacentEpisodeIndex = currentEpisodeIndex - 1;
    }

    if (adjacentEpisodeIndex >= 0 && adjacentEpisodeIndex < allEpisodes.length) {
      return allEpisodes[adjacentEpisodeIndex];
    }

    return null;
  };

  const handleMarkAsWatched = (episodeId) => {
    if (!watchedEpisodes.includes(episodeId)) {
      const updatedWatchedEpisodes = [...watchedEpisodes, episodeId];
      setWatchedEpisodes(updatedWatchedEpisodes);
    }
  };

  const handleNextEpisode = () => {
    const nextEpisode = getAdjacentEpisode("next");
    if (nextEpisode) {
      handleMarkAsWatched(episode.id);
      navigate(`/episode/${nextEpisode.id}`);
      window.location.reload(); // Recarga la página después de navegar
    }
  };

  const handleLike = async (episodeId, episodeTitle) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/episodes/${episodeId}-${encodeURIComponent(episodeTitle)}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo enviar el like");
      }

      const data = await response.json();
      setEpisode((prevEpisode) => ({
        ...prevEpisode,
        likes: data.likes,
      }));

      // Guardar el estado del like en localStorage
      localStorage.setItem(`likedEpisode-${episodeId}`, "true");
      setLiked(true);
    } catch (error) {
      console.error("Error al enviar el like:", error);
    }
  };

  if (!episode || !anime) {
    return <div>Cargando...</div>;
  }

  

  return (
    <div className="episode-player">
      <div className="player-container">
        <div className="video-section">
          <h2>{anime.title}</h2>
          <p>{episode.episode_title}</p>
          <iframe
            src={episode.iframeUrl}
            title={episode.episode_title}
            width="940"
            height="600px"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <button
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={() => handleLike(episode.id, episode.episode_title)}
            disabled={liked}
          >
            {liked ? "¡Te gusta!" : "Dar Like"}
          </button>
          <p> <strong>{episode.views}</strong> vistas </p>
          <p>  <strong>{episode.likes}</strong> Likes </p>

          <div className="navigation-buttons">
            <button
              className="nav-button prev-button"
              onClick={() => {
                const prevEpisode = getAdjacentEpisode("prev");
                if (prevEpisode) {
                  navigate(`/episode/${prevEpisode.id}`);
                  window.location.reload(); // Recarga la página después de navegar
                }
              }}
              disabled={episode.episodeNumber <= 1}
            >
              Anterior
            </button>
            <Link to={`/anime/${anime.id}`} className="nav-button list-button">
              Lista de Capitulos
            </Link>
            <button
              className="nav-button next-button"
              onClick={handleNextEpisode}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodePlayer;
