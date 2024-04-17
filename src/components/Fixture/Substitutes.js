import React, { useState, useEffect } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate} from 'react-router-dom';
import '../Menu.css';
import './Fixture.css'
import './Substitutes.css'

const Substitutes = ({ selectedEvent }) => {

    const {event_stadium, event_referee, coaches, substitutes, event_key, goalscorers, event_away_formation, event_home_formation, home_scorer, away_scorer, time, event_home_team, event_away_team, home_team_logo, event_penalty_result, event_ft_result, event_final_result, away_team_logo} = selectedEvent;
    const localSubstitutes = selectedEvent.lineups.home_team.substitutes;
    const awaySubstitutes = selectedEvent.lineups.away_team.substitutes;
    const localDT = selectedEvent.lineups.home_team.coaches[0].coache;
    const awayDT = selectedEvent.lineups.away_team.coaches[0].coache;    

    const leftColumn = localSubstitutes;
    const rightColumn = awaySubstitutes;
    
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
                                <span className="jersey-number">{substitute.player_number}</span> {substitute.player}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="substitutes-column-away">
                    <ul className="substitutes-list-away">
                        {awaySubstitutes.map((substitute, index) => (
                            <li key={index}>
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
    
