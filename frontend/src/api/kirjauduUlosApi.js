const API_BASE = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export const kirjauduUlos = async () => {
    try {
        const res = await fetch(`${API_BASE}/api/ulosKirjautuminen`, {
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/kirjaudu";
        }
    } catch (error) {
        console.error("Kirjaudu ulos -virhe:", error);
    }  
};