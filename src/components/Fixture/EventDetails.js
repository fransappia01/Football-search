import React, { useState, useEffect } from 'react';
import { GoArrowLeft } from "react-icons/go";
import Logo from '../../assets/soccer-logo3.png';
import './Fixture.css';
import './Event.css'
import Formations from './Formations';
import Statistics from './Statistics'; // Importa el componente de estadísticas
import { useNavigate, Link } from 'react-router-dom';
import Substitutes from './Substitutes';

const EventDetails = ({ selectedEvent }) => {

    const [selectedButton, setSelectedButton] = useState(null); 
    const { event_status, event_key, goalscorers, event_away_formation, event_home_formation, home_scorer, away_scorer, time, event_home_team, event_away_team, home_team_logo, event_penalty_result, event_ft_result, event_final_result, away_team_logo} = selectedEvent;
    const navigate = useNavigate();
    
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        console.log(buttonName); // Puedes hacer aquí lo que necesites con el nombre del botón seleccionado
    };

    useEffect(() => {
        setSelectedButton("Alineaciones");
    }, []);

    return (
        <div className="fixture-container">
            <nav className="navbar2">         
                <Link to="/buscar-partidos" className='link'>
                    <GoArrowLeft className='back-arrow' />
                </Link>
                <div className="logo-container">
                    <img src={Logo} alt="logo" className="logo" style={{ width: 180, height: 100 }} />
                </div>
                <h1 className="title">Football Search</h1>
            </nav>

            <div className='fixture-item-event'>
                <div className='match-info-event'>
                    <div className= 'div1'> 
                        <img src={home_team_logo} className="team-logo-event" />
                        <span className= "match-team-name-event">{event_home_team}</span>
                    </div>
                    <div className= 'div2'> 
                        <span className="match-result-penalty-home-event">{event_penalty_result && event_penalty_result.split(' - ')[0]}</span>
                        <span className="match-result">
                                                {event_ft_result !== '' && event_status === "After ET" ? 
                                                    event_final_result :
                                                    event_ft_result !== '' ? 
                                                    event_ft_result :
                                                    event_final_result
                                                }
                                                </span>
                        <span className="match-result-penalty-away-event">{event_penalty_result && event_penalty_result.split(' - ')[1]}</span>
                    </div>
                    <div className= 'div3'>
                        <img src={away_team_logo} className="team-logo-event" />
                        <span className="match-team-name-event">{event_away_team}</span>                                           
                    </div>
                </div>
                <div className="goal-info">
                    {goalscorers && goalscorers.map((goal, goalIndex) => (
                        <div key={goalIndex} className="goal-details">
                            <div className={`home_scorer ${goal.home_scorer && goal.home_scorer.includes('(pen.)') ? 'penalty-goal' : ''}`}>
                                {goal.home_scorer && `${goal.home_scorer} (${goal.time}')`}
                            </div>
                            <div className={`away_scorer ${goal.away_scorer && goal.away_scorer.includes('(pen.)') ? 'penalty-goal' : ''}`}>
                                {goal.away_scorer && `${goal.away_scorer} (${goal.time}')`}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="modal-content-event">
                    <button className={`button-event ${selectedButton === 'Alineaciones' ? 'selected' : ''}`} onClick={() => handleButtonClick("Alineaciones")}>Alineaciones</button>
                    <button className={`button-event ${selectedButton === 'Estadísticas' ? 'selected' : ''}`} onClick={() => handleButtonClick("Estadísticas")}>Estadísticas</button>
                </div>
                {selectedButton === 'Alineaciones' && (
                    <>
                        <div className="home-team-formation">
                            <img src={home_team_logo} className="team-logo" />
                            <span className='home-team-name-formation'>{event_home_team}</span>
                            <span className='home-team-formation-number'>{event_home_formation}</span>
                        </div>
                        <div className="alineaciones-container">
                            <Formations selectedEvent={selectedEvent} />  {/* Renderizar la cancha de fútbol */}
                        </div>
                        <div className="away-team-formation">
                            <img src={away_team_logo} className="team-logo" />
                            <span className='away-team-name-formation'>{event_away_team}</span>
                            <span className='away-team-formation-number'>{event_away_formation}</span>
                        </div>
                        <div className="substitutes-teams">
                            <Substitutes selectedEvent={selectedEvent} />  
                        </div>
                    </>
                )}
                {selectedButton === 'Estadísticas' && (
                    <Statistics selectedEvent={selectedEvent} /> 
                )}
                <footer className='footers'> 
                    <div className="div-final"></div> 
                </footer>
            </div>
        </div>
    );
};

export default EventDetails;
