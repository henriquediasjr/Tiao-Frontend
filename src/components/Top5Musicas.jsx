import React, { useEffect, useState } from 'react';

const Top5Musicas = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchTop5 = async () => {
            const response = await fetch('http://localhost:8001/api/top5');
            const data = await response.json();
            setSongs(data);
        };

        fetchTop5();
    }, []);

    return (
        <div>
            <h3 className="section-title">Ranking Atual</h3>
            {songs.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🎵</div>
                    <div className="empty-state-text">Nenhuma música cadastrada ainda</div>
                    <div className="empty-state-subtext">Seja o primeiro a sugerir uma música usando o formulário acima!</div>
                </div>
            ) : (
                songs.map((song, index) => (
                    <a
                        key={song.youtube_id}
                        href={`https://www.youtube.com/watch?v=${song.youtube_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="music-card-link"
                    >
                        <div className="music-card">
                            <div className="rank">{index + 1}</div>
                            <div className="music-info">
                                <div className="music-title">{song.titulo}</div>
                                <div className="views">{song.visualizacoes} visualizações</div>
                            </div>
                            <img src={song.thumb} alt={`Thumbnail ${song.titulo}`} className="thumbnail" />
                        </div>
                    </a>
                ))
            )}
        </div>
    );
};

export default Top5Musicas;
