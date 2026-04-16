import { Routes, Route } from 'react-router-dom'; //Sivunavigointi

import Yhteenveto from '../sivut/Yhteenveto';
import Tapahtumat from '../sivut/Tapahtumat';
import LisaaTapahtuma from '../sivut/LisaaTapahtuma';
import Toistuvat from '../sivut/Toistuvat';

// Valitaan näytettävä sivu URL:n perusteella
export default function Reititys() {
    return (
        <Routes>
            <Route path="/" element={<Yhteenveto />} />
            <Route path="/tapahtumat" element={<Tapahtumat />} />
            <Route path="/lisaa-tapahtuma" element={<LisaaTapahtuma />} />
            <Route path="/toistuvat" element={<Toistuvat />} />
        </Routes>
    );
}