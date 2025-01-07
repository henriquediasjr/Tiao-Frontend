import React from 'react';
import tiaoCarreiroImg from '../assets/images/tiao-carreiro-pardinho.png';


const Header = () => (
    <header>
        <img src={tiaoCarreiroImg} alt="Tião Carreiro" className="artist-img" />
        <h1>Top 5 Músicas Mais Tocadas</h1>
        <h2>Tião Carreiro & Pardinho</h2>
    </header>
);

export default Header;
