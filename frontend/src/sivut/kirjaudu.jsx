import { useState } from 'react';
import './kirjaudu.css';
import { Link } from 'react-router-dom';

export default function Kirjaudu({ setKirjautunut }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);


        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";
            const response = await fetch(`${apiUrl}/api/kirjaudu`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                if (setKirjautunut) setKirjautunut(true);
                window.location.href = '/yhteenveto';
            } else {
                setMessage('Väärä käyttäjätunnus tai salasana');
                setIsError(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Tapahtui virhe. Yritä uudestaan.');
            setIsError(true);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="login-container">
                <h1>Opiskelijan Budjettilaskuri</h1>
                <div className="login-card">
                    <h2>Kirjaudu</h2>

                    {message && (
                        <div className={`message ${isError ? 'error' : ''}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Käyttäjätunnus</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Salasana</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">
                            Kirjaudu
                        </button>
                    </form>

                    <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                        Puuttuuko käyttäjätunnus? <Link to="/rekisteroidy">Rekisteröidy</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}