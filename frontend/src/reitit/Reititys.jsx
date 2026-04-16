import { Routes, Route } from 'react-router-dom'; //Sivunavigointi

import yhteenveto from '../sivut/yhteenveto';
import tapahtumat from '../sivut/tapahtumat';
import lisaaTapahtuma from '../sivut/lisaaTapahtuma';
import toistuvat from '../sivut/toistuvat';

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