import { Routes, Route } from 'react-router-dom'; //Sivunavigointi

import Yhteenveto from '../sivut/yhteenveto';
import Tapahtumat from '../sivut/tapahtumat';
import LisaaTapahtuma from '../sivut/lisaaTapahtuma';
import Toistuvat from '../sivut/toistuvat';

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