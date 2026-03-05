import { BrowserRouter } from "react-router-dom";
import { Navigaatio } from "./komponentit/Navigaatio";
import Reititys from "./reitit/Reititys";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigaatio />
        <main className="container">
          <Reititys />
        </main>
      </div>
    </BrowserRouter>
  );
}