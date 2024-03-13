import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde React Router
import './Card.css';

const Card = () => {
    return (
        <div className="card-container">
            <Link to="/buscar-jugadores" className="card">
                <h2>Buscar Jugadores</h2>
                <hr />
                <p><strong>Encontrá el JUGADOR que estás buscando a partir de su nombre.</strong></p>
                <p>(Recordá que mientras más completo el nombre, más precisa será la búsqueda)</p>
            </Link>
            <Link to="/buscar-equipos" className="card">
                <h2>Buscar Equipos</h2>
                <hr />
                <p><strong>Encontrá el EQUIPO que estás buscando a partir de su nombre.</strong></p>
                <p>(Recordá que mientras más completo el nombre, más precisa será la búsqueda)</p>
            </Link>
            <Link to="/buscar-partidos" className="card">
                <h2>Buscar Partidos</h2>
                <hr />
                <p><strong>Encontrá el PARTIDO que estás buscando a partir de su nombre.</strong></p>
                <p>(Recordá que mientras más completo el nombre, más precisa será la búsqueda)</p>
            </Link>
        </div>
    );
};

export default Card;
