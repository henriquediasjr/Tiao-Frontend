import React, { useState } from 'react';

const SugerirMusica = () => {
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = e.target.elements.url.value;

        try {
            const response = await fetch('http://localhost:8000/api/sugerir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });
            const data = await response.json();
            setMessage({ text: data.message, type: data.success ? 'success' : 'error' });
        } catch (error) {
            setMessage({ text: 'Erro ao enviar o link', type: 'error' });
        }
    };

    return (
        <div className="submit-form">
            <h3>Sugerir Nova Música</h3>
            {message && <div className={`message ${message.type}`}>{message.text}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="url" name="url" placeholder="Cole aqui o link do YouTube" required />
                    <button type="submit" className="submit-button">Enviar Link</button>
                </div>
            </form>
        </div>
    );
};

export default SugerirMusica;
