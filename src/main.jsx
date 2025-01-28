// Main.jsx

import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import  Catalogo  from "./pages/Catalogo.jsx";
import Calendario  from "./pages/Calendario.jsx";
import { Login } from "./pages/Login.jsx";
import { Header } from "./components/Header.jsx";
import EpisodePlayer from "./pages/EpisodePlayer.jsx";
import Register  from "./pages/Register.jsx";
import  Search  from "./pages/Search.jsx";
import AnimeDetails from "./pages/AnimeDetails.jsx";
import EpisodesList from "./components/EpisodeList.jsx";
import AnimesList from "./components/AnimeList.jsx";
import Perfil from "./pages/Perfil.jsx";



const root = createRoot(document.getElementById("root")).render(
  
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<EpisodesList/>}></Route>
        <Route path="/episode/:episodeId" element={<EpisodePlayer/>} />
        <Route path="/" element={<AnimesList />} />
        <Route path="/anime/:animeId" element={<AnimeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil/>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/calendario" element={<Calendario/>}></Route>
      </Routes>
      
    </Router>
  
);
