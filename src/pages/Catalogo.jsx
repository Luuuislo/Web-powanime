import React, { useState, useEffect } from "react";
import "../styles/Catalogo.css";
import { Link } from "react-router-dom";

const Catalogo = () => {
  const [catalogo, setCatalogo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(
    Number(localStorage.getItem("currentPage")) || 1
  );
  const [resultsPerPage] = useState(20);
  const [filter, setFilter] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    const fetchCatalogo = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/catalogo");
        if (!response.ok) {
          throw new Error("Error al obtener los datos del catálogo");
        }
        const data = await response.json();
        setCatalogo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogo();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  // Filtrar datos
  const filteredCatalogo = catalogo
    .filter((anime) =>
      filter ? anime.title.toLowerCase().includes(filter.toLowerCase()) : true
    )
    .filter((anime) =>
      selectedYear !== "all"
        ? new Date(anime.emitido).getFullYear().toString() === selectedYear
        : true
    )
    .filter((anime) =>
      selectedType !== "all" ? anime.tipo === selectedType : true
    )
    .filter((anime) =>
      selectedStatus !== "all" ? anime.estado === selectedStatus : true
    );

  const indexOfLastAnime = page * resultsPerPage;
  const indexOfFirstAnime = indexOfLastAnime - resultsPerPage;
  const currentAnimes = filteredCatalogo.slice(indexOfFirstAnime, indexOfLastAnime);

  const totalPages = Math.ceil(filteredCatalogo.length / resultsPerPage);

  const paginationRange = () => {
    const range = [];
    const maxPagesToShow = 5;
    let start = Math.max(page - 2, 1);
    let end = Math.min(page + 2, totalPages);

    if (start > 1) range.push(1);
    if (start > 2) range.push("...");

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < totalPages - 1) range.push("...");
    if (end < totalPages) range.push(totalPages);

    return range;
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-catalago">
      <h1>Catálogo de Animes</h1>

      {/* Filtros */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filtrar por título..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">Todos los años</option>
          {[...new Set(catalogo.map((anime) =>
            new Date(anime.emitido).getFullYear().toString()
          ))].map((year) => (
            <option key={`year-${year}`} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">Todos los tipos</option>
          {[...new Set(catalogo.map((anime) => anime.tipo))].map((type) => (
            <option key={`type-${type}`} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">Todos los estados</option>
          {[...new Set(catalogo.map((anime) => anime.estado))].map((status) => (
            <option key={`status-${status}`} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Catálogo */}
      <div className="catalogo">
        {currentAnimes.map((anime) => (
          <div key={`anime-${anime.id}`} className="anime-card">
            <Link to={`/anime/${anime.id}`} className="btn">
              <img src={anime.image} alt={anime.title} />
            </Link>
            <h3>{anime.title}</h3>
            <p>
              <strong>Géneros:</strong> {anime.genres}
            </p>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="pagination">
        <ul className="pagination-list">
          <li className={page === 1 ? "disabled" : ""}>
            <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>«</button>
          </li>
          {paginationRange().map((number, index) =>
            number === "..." ? (
              <li key={`ellipsis-${index}`}>
                <span>…</span>
              </li>
            ) : (
              <li key={`page-${number}`} className={page === number ? "active" : ""}>
                <button onClick={() => setPage(number)}>{number}</button>
              </li>
            )
          )}
          <li className={page === totalPages ? "disabled" : ""}>
            <button onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}>»</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Catalogo
