import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigaatio } from "./komponentit/Navigaatio";
import Reititys from "./reitit/Reititys";
import "./App.css";

export default function App() {
  const [kirjautunut, setKirjautunut] = useState(false);

  useEffect(() => {
    const checkKirjautuminen = localStorage.getItem("isLoggedIn") === "true";
    setKirjautunut(checkKirjautuminen);
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        {kirjautunut && <Navigaatio setKirjautunut={setKirjautunut} />}
        <main className="container">
          <Reititys setKirjautunut={setKirjautunut} />
        </main>
      </div>
    </BrowserRouter>
  );
}