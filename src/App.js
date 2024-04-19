// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FixturesMenu from './components/Fixture/FixturesMenu';
import PlayersMenu from './components/Players/PlayersMenu';
import TeamsMenu from './components/Teams/TeamsMenu';
import EventDetails from './components/Fixture/EventDetails';
import Formations from './components/Fixture/Formations';
import Substitutes from './components/Fixture/Substitutes';
import Statistics from './components/Fixture/Statistics';

const App = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <Router>
            <Routes>
                {/*<Route path="/" element={<Home />} />*/}
                <Route path="/" element={<FixturesMenu setSelectedEvent={setSelectedEvent} />} />
                {selectedEvent && <Route path={`/${selectedEvent.event_key}`} element={<EventDetails selectedEvent={selectedEvent} />} />}
                {selectedEvent && <Route path={`/${selectedEvent.event_key}`} element={<Formations selectedEvent={selectedEvent} />} />}
                {selectedEvent && <Route path={`/${selectedEvent.event_key}`} element={<Statistics selectedEvent={selectedEvent} />} />}
                {selectedEvent && <Route path={`/${selectedEvent.event_key}`} element={<Substitutes selectedEvent={selectedEvent} />} />}
                {/*<Route path="/buscar-jugadores" element={<PlayersMenu />} />*/}
                {/*<Route path="/buscar-equipos" element={<TeamsMenu />} />*/}
            </Routes>
        </Router>
    );
};

export default App;
