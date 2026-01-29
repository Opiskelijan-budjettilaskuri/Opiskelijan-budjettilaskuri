import { Routes, Route } from 'react-router-dom';
import Yhteenveto from '...sivut/Yhteenveto';
import Tapahtumat from '...sivut/Tapahtumat';
import LisaaTapahtuma from '../sivut/LisaaTapahtuma';

export default function Reititys() {
    return (
        <Routes>
            <Route path="/" element={<Yhteenveto />} />
            <Route path="/tapahtumat" element={<Tapahtumat />} />
            <Route path="/lisaa-tapahtuma" element={<LisaaTapahtuma />} />
        </Routes>
    );
}