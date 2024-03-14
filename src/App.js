// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FixturesMenu from './components/Fixture/FixturesMenu';
import PlayersMenu from './components/Players/PlayersMenu';
import TeamsMenu from './components/Teams/TeamsMenu';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buscar-partidos" element={<FixturesMenu/>} />
                <Route path="/buscar-jugadores" element={<PlayersMenu />} />
                <Route path="/buscar-equipos" element={<TeamsMenu />} />
            </Routes>
        </Router>
    );
};

export default App;
