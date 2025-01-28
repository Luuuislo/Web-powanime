import React, { useState, useEffect } from "react";
import "../styles/Banner.css";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animeData = [
    {
      image:
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXp6Znd0dmd4d3Zya3d5N2luZHZ6eG9weDlraTUwOXloejRtcHBkYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HB4mzkUaYZqw31ZXwa/giphy.webp", // Sustituye por las imágenes reales
      title: "Dandadan",
      link: "http://localhost:5173/episode/5603",
    },
    {
      image:
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDNsbWlmY2VnYXYxeHZjdmNjMHk3cjR6a3JkZGg0eWFha3pzb242eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VEzYdo930nTiTuVeMU/giphy.webp", // Sustituye por las imágenes reales
      title: "Kimetsu no Yaiba",
      link: "http://localhost:5173/anime/502",
    },
    {
      image:
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGN6MXFxcTA5Y2p0MTBudzlvc2I4bmg2YmRhYmIzanVhdXFncG5tciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zwPRprvrP4Lm0/giphy.webp", // Sustituye por las imágenes reales
      title: "Shingeki no Kyojin",
      link: "http://localhost:5173/anime/732",
    },
    {
      image:
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmp1bGl2bW50eTk5ejNzZjl3NWF5NWgwc2Jwempuc3FzaDZ2Y3prNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UgV8Y7bDxsZDCP01eo/giphy.webp", // Sustituye por las imágenes reales
      title: "Jujutsu Kaisen",
      link: "http://localhost:5173/anime/469",
    },
    {
      image:
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3Q3ejZtaXRweHo5c3hkaXBhNHdoOGgzcW44anZjZmx0YXpocWxhcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KGd6ns7MR1gPCRT52z/giphy.gif", // Sustituye por las imágenes reales
      title: "One Piece",
      link: "http://localhost:5173/anime/13",
    },
    {
      image:
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTlsZDRucjk0a2xncm9zNGwydzh0eWtxNmgwNm5hZG40N240dWlzdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iD9C2y1prWE87WfXp5/giphy.webp", // Sustituye por las imágenes reales
      title: "Dragon Ball Super",
      link: "http://localhost:5173/anime/35",
    },
    {
      image:
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWF0MGx0cnE0anp5ZWgxNWNvcjBhOTlvbHowenB2bGVpNjh5endmciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ae8KCy7nwcb5u/giphy.webp", // Sustituye por las imágenes reales
      title: "Naruto Shippuden",
      link: "http://localhost:5173/anime/42",
    },
    {
      image:
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazVweGRnazhiYjB3dDdxOWw2Y2N1ODk3N2Q0YjZndWIxbGducWZsaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPic3FZRFu0gedy/giphy.webp", // Sustituye por las imágenes reales
      title: "Boku no Hero Academy",
      link: "http://localhost:5173/anime/665",
    },

    {
      image:
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm9qd3AwanFtem9zNmpjOHRkMGl3YW8zMGV4dGN0c2xzMW1sd3RwaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6Zt3NND1TdnIAfSM/giphy.webp", // Sustituye por las imágenes reales
      title: "One Punch Man",
      link: "http://localhost:5173/anime/682",
    },
    {
      image: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExem1hbnoybDJheGJyeWptMG9vanljcWljc2UyNGMycGxja3BtYTRrdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nvPNlAagUMWn6/giphy.webp", // Sustituye por las imágenes reales
      title: "Hunter x Hunter",
      link: "http://localhost:5173/anime/752",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animeData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [animeData.length]);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  const handlePrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + animeData.length) % animeData.length
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % animeData.length);
  };

  return (
    <div className="anime-carousel-container">
      <div className="anime-carousel">
        <div
          className="anime-slide"
          style={{
            backgroundImage: `url(${animeData[currentIndex].image})`,
            opacity: 0,
            animation: "fadeIn 1s forwards",
          }}
        >
          <div className="gradient-overlay"></div>
          <div className="carousel-text">
            <h3 className="anime-title">{animeData[currentIndex].title}</h3>
            <NavLink
              to={animeData[currentIndex].link}
              className="watch-now-btn"
            >
              Ver Ahora
            </NavLink>
          </div>
        </div>
      </div>

      <div className="carousel-controls">
        {animeData.map((_, index) => (
          <span
            key={index}
            className={`carousel-dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleSlideChange(index)}
          ></span>
        ))}
      </div>

      {/* Direccionales */}
      <button className="prev-btn" onClick={handlePrevSlide}>
        ❮
      </button>
      <button className="next-btn" onClick={handleNextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Banner;
