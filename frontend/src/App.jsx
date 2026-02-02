import { BrowserRouter } from "react-router-dom"; //Reititys URL-osoitteella
import { Navigaatio } from "./komponentit/Navigaatio";
import Reititys from "./reitit/Reititys";

// Juuri komponentti
export default function App() {
  return (
    <BrowserRouter>
      <Navigaatio/>
      <main style={{ padding: 24 }}>
        <h1>Budjettilaskuri</h1>
        <Reititys/>
      </main>
    </BrowserRouter>
  );
}