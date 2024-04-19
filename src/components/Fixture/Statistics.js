import React from 'react';
import { GoArrowLeft } from "react-icons/go";
import { Link } from 'react-router-dom';
import '../Menu.css';
import './Fixture.css';
import './Statistics.css'; // Importa el archivo CSS para estadísticas

const Statistics = ({ selectedEvent }) => {
    const { statistics, home_team_logo, away_team_logo } = selectedEvent;

    const getStatisticByType = (type) => {
        const stat = statistics.find(statistic => statistic.type === type);
        return stat ? stat : { home: "0", away: "0" };
    };

    // Función para calcular la precisión de los pases
const calculatePassAccuracy = () => {
    const passesTotalHome = getStatisticByType('Passes Total').home;
    const passesTotalAway = getStatisticByType('Passes Total').away;
    const passesAccurateHome = getStatisticByType('Passes Accurate').home;
    const passesAccurateAway = getStatisticByType('Passes Accurate').away;

    const passAccuracyHome = (passesAccurateHome * 100) / passesTotalHome;
    const passAccuracyAway = (passesAccurateAway * 100) / passesTotalAway;

    return {
        home: passAccuracyHome.toFixed(0), 
        away: passAccuracyAway.toFixed(0)
    };
};

    return (
        <div>
        <div className='stats-modal'>
            <div className="stats-title">
                <img src={home_team_logo} className="team-logo" style={{ marginRight: 'auto' }} />
                <span style={{ margin: '0 20px'}}>Estadísticas del equipo</span>
                <img src={away_team_logo} className="team-logo" style={{ marginLeft: 'auto' }} />
            </div>
            <div className="stats-row">
                <td>{getStatisticByType('Shots Total').home}</td>
                <td>Remates</td>
                <td>{getStatisticByType('Shots Total').away}</td>
            </div>
            <div className="stats-row">
                <td>{getStatisticByType('Shots On Goal').home}</td>
                <td>Remates al arco</td>
                <td>{getStatisticByType('Shots On Goal').away}</td>
            </div>
            <div className="stats-row">
                <td>{getStatisticByType('Ball Possession').home}</td>
                <td>Posesión</td>
                <td>{getStatisticByType('Ball Possession').away}</td>
            </div>
            <div className="stats-row">
                <td>{getStatisticByType('Passes Total').home}</td>
                <td>Pases</td>
                <td>{getStatisticByType('Passes Total').away}</td>
            </div>
            <div className="stats-row">
                <td>{calculatePassAccuracy().home}%</td>
                <td>Precisión de los pases</td>
                <td>{calculatePassAccuracy().away}%</td>
            </div>
            <div className="stats-row">
                <td>{getStatisticByType('Fouls').home}</td>
                <td>Faltas</td>
                <td>{getStatisticByType('Fouls').away}</td>
            </div>
            <div className="stats-row">
                <td>{getStatisticByType('Yellow Cards').home}</td>
                <td>Tarjetas amarillas</td>
                <td>{getStatisticByType('Yellow Cards').away}</td>
            </div>
            <div className="stats-row">
                <td>{getStatisticByType('Red Cards').home}</td>
                <td>Tarjetas rojas</td>
                <td>{getStatisticByType('Red Cards').away}</td>
            </div>
            <div className="stats-row">
                <td>{getStatisticByType('Offside').home}</td>
                <td>Posición adelantada</td>
                <td>{getStatisticByType('Offside').away}</td>
            </div>
            <div className="stats-row">
                <td>{getStatisticByType('Corners').home}</td>
                <td>Tiros de esquina</td>
                <td>{getStatisticByType('Corners').away}</td>
            </div>
        </div>
            <footer className='footers'> 
                <div className="div-final-stats"></div> 
            </footer>
        </div>
    );
};

export default Statistics;
