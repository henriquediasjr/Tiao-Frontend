import React from 'react';
import './styles.css';
import Header from './components/Header';
import Top5Musicas from './components/Top5Musicas';
import SugerirMusica from './components/SugerirMusica';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <SugerirMusica />
        <Top5Musicas />
      </div>
    </>
  );
}

export default App;
