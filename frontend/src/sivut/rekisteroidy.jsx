import { useState } from "react";
import { Link } from "react-router-dom";
import "./rekisteroidy.css";

export default function Rekisteroidy() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetch("/tallennakayttaja", {
                method: "POST",
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                setMessage("Rekisteröityminen onnistui! Voit nyt kirjautua sisään.");
                setIsSuccess(true);
                setIsError(false);
                setUsername("");
                setEmail("");
                setPassword("");
                window.location.href = '/kirjaudu';
            } else {
                setMessage("Rekisteröityminen epäonnistui. Yritä uudestaan.");
                setIsError(true);
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Tapahtui virhe. Yritä uudestaan.");
            setIsError(true);
            setIsSuccess(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Rekisteröidy</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Käyttäjänimi</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="Valitse käyttäjänimi"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Sähköposti</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="esimerkki@posti.fi"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Salasana</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Luo vahva salasana"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">
                        Rekisteröidy
                    </button>
                </form>
                
                <p className="auth-footer">
                    Onko sinulla jo tili? <Link to="/kirjaudu">Kirjaudu</Link>
                </p>
            </div>
        </div>
    );
}
