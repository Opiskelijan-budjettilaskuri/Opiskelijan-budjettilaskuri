import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { Navigaatio } from "./komponentit/Navigaatio";
import Reititys from "./reitit/Reititys";
import "./App.css";

export default function App() {
  const [kirjautunut, setKirjautunut] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

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