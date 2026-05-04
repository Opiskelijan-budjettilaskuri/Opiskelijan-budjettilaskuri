import { Routes, Route } from 'react-router-dom'; //Sivunavigointi

import Yhteenveto from '../sivut/yhteenveto';
import Tapahtumat from '../sivut/tapahtumat';
import LisaaTapahtuma from '../sivut/lisaaTapahtuma';
import Toistuvat from '../sivut/toistuvat';
import Kirjaudu from '../sivut/kirjaudu';
import Rekisteroidy from '../sivut/rekisteroidy';

export default function Reititys() {
    return (
        <Routes>
            <Route path="/" element={<Kirjaudu />} />
            <Route path="/kirjaudu" element={<Kirjaudu />} />
            <Route path="/rekisteroidy" element={<Rekisteroidy />} />
            <Route path="/tapahtumat" element={<Tapahtumat />} />
            <Route path="/lisaa-tapahtuma" element={<LisaaTapahtuma />} />
            <Route path="/toistuvat" element={<Toistuvat />} />
            <Route path="/yhteenveto" element={<Yhteenveto />} />
        </Routes>
    );
}