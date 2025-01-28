
import AnimesList from "../components/AnimeList";
import { Anuncios } from "../components/Anuncios";

import Banner from "../components/Banner";
import EpisodeList from "../components/EpisodeList";

import Footer from "../components/Footer";
import "../styles/Home.css";



export const Home = () => {
  return (
    <>
      <div>
        <Banner/> 
      </div>
      <div>
        <Anuncios/> 
      </div>
      <div>
        
        <EpisodeList/> 
       <AnimesList/> 
      </div>
     <div>
     <Footer/>
     </div>
    </>
  );
};
