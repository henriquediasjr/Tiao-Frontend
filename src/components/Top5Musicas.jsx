import React, { useEffect, useState } from 'react';

const Top5Musicas = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTop5 = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:8000/api/top5');
                const result = await response.json();
                setSongs(result.data || []);
            } catch (error) {
                console.error('Failed to fetch top 5 songs:', error);
                setSongs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTop5();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h3 className="section-title">Ranking Atual</h3>
            {Array.isArray(songs) && songs.length > 0 ? (
                <ul>
                    {songs.map((song, index) => (
                        <li key={song.youtube_id} role="listitem">
                            <a
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
                                    <img
                                        src={song.thumb}
                                        alt={`Thumbnail ${song.titulo}`}
                                        className="thumbnail"
                                    />
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon">🎵</div>
                    <div className="empty-state-text">Nenhuma música cadastrada ainda</div>
                    <div className="empty-state-subtext">
                        Seja o primeiro a sugerir uma música usando o formulário acima!
                    </div>
                </div>
            )}
        </div>
    );
};

export default Top5Musicas;
