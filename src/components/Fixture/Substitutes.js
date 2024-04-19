import React, { useState, useEffect } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate} from 'react-router-dom';
import ArrowUp from '../../assets/flecha-arriba.png'
import Ball from '../../assets/ball.png'
import '../Menu.css';
import './Fixture.css'
import './Substitutes.css'
import YellowCardImage from '../../assets/yellow-card.png'
import RedCardImage from '../../assets/red-card.png'

const Substitutes = ({ selectedEvent }) => {
    const {cards, card,event_stadium, event_referee, coaches, substitutes, event_key, goalscorers, event_away_formation, event_home_formation, home_scorer, away_scorer, time, event_home_team, event_away_team, home_team_logo, event_penalty_result, event_ft_result, event_final_result, away_team_logo} = selectedEvent;
    const localSubstitutes = selectedEvent.lineups.home_team.substitutes;
    const awaySubstitutes = selectedEvent.lineups.away_team.substitutes;

    const changes = selectedEvent.substitutes;

    const localDT = selectedEvent.lineups.home_team.coaches && selectedEvent.lineups.home_team.coaches.length > 0 ? selectedEvent.lineups.home_team.coaches[0].coache : '-';
    const awayDT = selectedEvent.lineups.away_team.coaches && selectedEvent.lineups.away_team.coaches.length > 0 ? selectedEvent.lineups.away_team.coaches[0].coache : '-';

    const leftColumn = localSubstitutes;
    const rightColumn = awaySubstitutes;
    
    // Función para verificar si un suplente es un goleador
    const isGoalScorer = (player) => {
        return goalscorers.some((goal) => {
            return (goal.home_scorer  && !goal.home_scorer.includes('(pen.)') && goal.home_scorer_id === player.player_key.toString()) ||
                   (goal.away_scorer &&  !goal.away_scorer.includes('(pen.)') && goal.away_scorer_id === player.player_key.toString())
        });
    };  

    const isYellowCard = (player) => {
        return selectedEvent.cards.some((card) => {
            return (card.card === "yellow card" && card.away_player_id === player.player_key.toString()) ||
            (card.card === "yellow card" && card.home_player_id === player.player_key.toString())
        });
    };
    
    // Función para verificar si un jugador recibió una tarjeta roja
    const isRedCard = (player) => {
        return selectedEvent.cards.some((card) => {
            return card.card === "red card" && card.away_player_id === player.player_key.toString() ||
            (card.card === "red card" && card.home_player_id === player.player_key.toString())
        });
    };

    return (
        <div>
            <div className="substitutes-modal">
                <div className="substitutes-title">
                    <img src={home_team_logo} className="team-logo" style={{ marginRight: 'auto' }} />
                    <span style={{ margin: '0 20px'}}>Suplentes</span>
                    <img src={away_team_logo} className="team-logo" style={{ marginLeft: 'auto' }} />
                </div>
                <div className="substitutes-columns">
                    <div className="substitutes-column-local">
                        <ul className="substitutes-list-local">
                        {localSubstitutes.map((substitute, index) => (
                            <li key={index}>
                                <span className="jersey-number">{substitute.player_number}</span>{substitute.player}
                                <span className="substitute-icons2-local">
                                    {changes.some(change => change.home_scorer && change.home_scorer.in_id === substitute.player_key) && 
                                        <img src={ArrowUp} className="arrow-icon-local" />}
                                </span>    
                                <span className='substitute-cards-icon-local'>
                                        {isYellowCard(substitute) && <img src={YellowCardImage} alt="yellow-card" className="card-icon-local" />}
                                        {isRedCard(substitute) && <img src={RedCardImage} alt="red-card" className="card-icon-local" />}
                                    </span>
                                <span className="substitute-icons-local">
                                {isGoalScorer(substitute) && ( 
                                    <img src={Ball} alt="soccer-ball-icon" className="soccer-ball-icon-sust-local" />
                                )}
                                </span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="substitutes-column-away">
                        <ul className="substitutes-list-away">
                            {awaySubstitutes.map((substitute, index) => (
                                <li key={index}>
                                    <span className="substitute-icons">
                                    {isGoalScorer(substitute) && ( 
                                        <img src={Ball} alt="soccer-ball-icon" className="soccer-ball-icon-sust-away" />
                                    )}
                                    </span>
                                    <span className='substitute-cards-icon'>
                                        {isYellowCard(substitute) && <img src={YellowCardImage} alt="yellow-card" className="card-icon" />}
                                        {isRedCard(substitute) && <img src={RedCardImage} alt="red-card" className="card-icon" />}
                                    </span>
                                    <span className="substitute-icons2">
                                    {changes.some(change => change.away_scorer && change.away_scorer.in_id === substitute.player_key) && 
                                        <img src={ArrowUp} className="arrow-icon-away" />}
                                    </span>
                                    {substitute.player} <span className="jersey-number">{substitute.player_number}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='dt-modal'>
                <div className='dt-title'>
                    Director técnico
                </div>
                <div className='dt-names'>
                    <span className='dt-name'>{localDT}</span>
                    <span className='dt-name'>{awayDT}</span>
                </div>
            </div>
            <div className='stadium-modal'>
                <div><b>Estadio: </b> {event_stadium}</div>
                <div><b>Árbitro: </b> {event_referee}</div>
            </div>
        </div>
    );
};

export default Substitutes;

    
