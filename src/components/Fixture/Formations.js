import React from 'react';
import { GoArrowLeft } from "react-icons/go";
import loadingImg from '../../loading.gif';
import Logo from '../../soccer-logo3.png';
import './Fixture.css';
import './Event.css'
import { useNavigate, Link } from 'react-router-dom';

const  Formations = ({ selectedEvent }) => {
    const localPlayers = selectedEvent.lineups.home_team.starting_lineups;
    const awayPlayers = selectedEvent.lineups.away_team.starting_lineups;

    const { event_key, goalscorers, event_away_formation, event_home_formation, home_scorer, away_scorer, time, event_home_team, event_away_team, home_team_logo, event_penalty_result, event_ft_result, event_final_result, away_team_logo} = selectedEvent;
    const navigate = useNavigate();

    // Lógica para renderizar los jugadores en cada fila de la cancha
    const renderPlayers = (players) => {
        players.sort((a, b) => a.player_position - b.player_position);  //Ordenar jugadores por numero de posicion
        console.log({localPlayers})

        return players.map((player, index) => (
            <div key={index} className="player-circle">
                <div className="player-number">{player.player_number}</div>
                <div className="player-name">{player.player}</div>
            </div>
        ));
    };

    const renderPlayersAway = (players) => {
        players.sort((a, b) => a.player_position - b.player_position); 
        players.reverse();  //Los da vuelta para mostrar al visitante
        console.log({localPlayers})

        return players.map((player, index) => (
            <div key={index} className="player-circle">
                <div className="player-number-away">{player.player_number}</div>
                <div className="player-name-away">{player.player}</div>
            </div>
        ));
    };

    // Código para renderizar la cancha de fútbol vacía en posición vertical y los jugadores
    return (
        <div className="football-field">
            <div className="goal-up"></div>
            <div className="penalty-box-up"></div>
            <div className='round-penalty-box-up'></div>
            <div className="penalty-spot"></div>
            <div className="halfway-line"></div>
            <div className='round-penalty-box-down'></div>
            <div className="penalty-box-down"></div>
            <div className="goal-down"></div>
            <div className="center-circle"></div>

            {/* Mitad superior de la cancha */}
            <div className="football-half-top">
                <div className="goalkeeper-row" style={{ height: event_home_formation.length === 5 ? '25%' : '20%' }}>
                    {renderPlayers(localPlayers.filter(player => player.player_position === 1))}
                </div>
                <div className="defender-row" style={{ height: event_home_formation.length === 5 ? '25%' : '20%' }}>
                    {event_home_formation.startsWith('4') ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 2 || player.player_position === 3 || player.player_position === 4 || player.player_position === 5)) :
                    event_home_formation.startsWith('3') ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 2 || player.player_position === 3 || player.player_position === 4)) :
                    event_home_formation.startsWith('5') ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 2 || player.player_position === 3 || player.player_position === 4 || player.player_position === 5 || player.player_position === 6)) :
                        null
                    }
                </div>
                {event_home_formation.length !== 5 && (
                <div className="five-line-position-row" style={{ height: '20%' }}>
                    {event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '4' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 5 || player.player_position === 6 || player.player_position === 7 || player.player_position === 8)) :
                    event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '3' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 5 || player.player_position === 6 || player.player_position === 7)) :
                    event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 5 || player.player_position === 6 )) :
                    event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 5)) :
                    event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '5' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                        null
                    }

                    {event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '4' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '3' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8)) :
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 6 || player.player_position === 7 )) :
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 6)) :

                    event_home_formation.startsWith('5') ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                        null
                    }
                </div>
                )}
                <div className="midfielder-row" style={{ height: event_home_formation.length === 5 ? '25%' : '20%', display: 'flex'  }}>
                    {event_home_formation.length === 5 && (
                        <>
                            {event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '3' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8)) :
                            event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '4' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                            event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '3' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                            event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '2' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 7 || player.player_position === 8)) :
                            event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '5' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 5 || player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                            null
                            }
                        </>
                    )}
                    {event_home_formation.length !== 5 && (
                        <>
                            {event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '1'  && event_home_formation.charAt(4) === '4' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 8 || player.player_position === 9 || player.player_position === 10 || player.player_position === 11)) :
                            event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '1'  && event_home_formation.charAt(4) === '3' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 8 || player.player_position === 9 || player.player_position === 10)) :
                            event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '1'  && event_home_formation.charAt(4) === '2' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 8 || player.player_position === 9)) :
                            event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '2'  && event_home_formation.charAt(4) === '2' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 9 || player.player_position === 10)) :
                            event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '2'  && event_home_formation.charAt(4) === '1' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 9)) :
                            event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '3'  && event_home_formation.charAt(4) === '1' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 10)) :

                            event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '1'  && event_home_formation.charAt(4) === '4' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 7 || player.player_position === 8 || player.player_position === 9 || player.player_position === 10)) :
                            event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '1'  && event_home_formation.charAt(4) === '3' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                            event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '2'  && event_home_formation.charAt(4) === '3' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 8 || player.player_position === 9 || player.player_position === 10)) :
                            event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '2'  && event_home_formation.charAt(4) === '2' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 8 || player.player_position === 9)) :
                            event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '2'  && event_home_formation.charAt(4) === '1' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 8)) :
                            event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '3'  && event_home_formation.charAt(4) === '1' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 9)) :
                            event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '3'  && event_home_formation.charAt(4) === '2' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 9 || player.player_position === 10)) :
                            event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '4'  && event_home_formation.charAt(4) === '1' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 10)) :

                            event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '5'  && event_home_formation.charAt(4) === '1' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 10)) :
                            event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '4'  && event_home_formation.charAt(4) === '1' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 9)) :
                            event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '4'  && event_home_formation.charAt(4) === '2' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 9 || player.player_position === 10)) :
                                null
                            }
                        </>
                    )}
                </div>
                <div className="forward-row" style={{ height: event_home_formation.length === 5 ? '25%' : '20%' }}>
                    {
                    event_home_formation.length === 5 && event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '3' && event_home_formation.charAt(4) === '3' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 9 || player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.length === 5  && event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '4' && event_home_formation.charAt(4) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.length === 5  && event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '3' && event_home_formation.charAt(4) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.length === 5  && event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '2' && event_home_formation.charAt(4) === '3' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 9 || player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.length === 5  && event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '5' && event_home_formation.charAt(4) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    null
                    }

                    {
                    event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '1'  && event_home_formation.charAt(4) === '3' && event_home_formation.charAt(6) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 11)) :
                    event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '1'  && event_home_formation.charAt(4) === '2' && event_home_formation.charAt(6) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '2'  && event_home_formation.charAt(4) === '2' && event_home_formation.charAt(6) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 11)) :
                    event_home_formation.startsWith('5') && event_home_formation.charAt(2) === '2'  && event_home_formation.charAt(4) === '1' && event_home_formation.charAt(6) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '1'  && event_home_formation.charAt(4) === '4' && event_home_formation.charAt(6) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 11)) :
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '1'  && event_home_formation.charAt(4) === '3' && event_home_formation.charAt(6) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '2'  && event_home_formation.charAt(4) === '3' && event_home_formation.charAt(6) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 11)) :
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '1'  && event_home_formation.charAt(4) === '2' && event_home_formation.charAt(6) === '3' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 9 || player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '2'  && event_home_formation.charAt(4) === '1' && event_home_formation.charAt(6) === '3' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 9 || player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '3'  && event_home_formation.charAt(4) === '1' && event_home_formation.charAt(6) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '3'  && event_home_formation.charAt(4) === '2' && event_home_formation.charAt(6) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 11)) :
                    event_home_formation.startsWith('4') && event_home_formation.charAt(2) === '4'  && event_home_formation.charAt(4) === '1' && event_home_formation.charAt(6) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 11)) :

                    event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '5'  && event_home_formation.charAt(4) === '1' && event_home_formation.charAt(6) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '5'  && event_home_formation.charAt(4) === '2' && event_home_formation.charAt(6) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 11)) :
                    event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '4'  && event_home_formation.charAt(4) === '2' && event_home_formation.charAt(6) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 11)) :
                    event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '4'  && event_home_formation.charAt(4) === '1' && event_home_formation.charAt(6) === '2' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '2'  && event_home_formation.charAt(4) === '4' && event_home_formation.charAt(6) === '1' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 11)) :
                        null
                    }
                </div>
            </div>




            {/* Mitad inferior de la cancha */}
            <div className="football-half-bottom">
                <div className="forward-row" style={{ height: event_away_formation.length === 5 ? '25%' : '20%' }}>
                    {
                    event_away_formation.length === 5 && event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '3' && event_away_formation.charAt(4) === '3' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 9 || player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.length === 5  && event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '4' && event_away_formation.charAt(4) === '2' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.length === 5  && event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '3' && event_away_formation.charAt(4) === '2' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.length === 5  && event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '2' && event_away_formation.charAt(4) === '3' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 9 || player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.length === 5  && event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '5' && event_away_formation.charAt(4) === '2' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    null
                    }

                    {
                    event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '1'  && event_away_formation.charAt(4) === '3' && event_away_formation.charAt(6) === '1' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 11)) :
                    event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '1'  && event_away_formation.charAt(4) === '2' && event_away_formation.charAt(6) === '2' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '2'  && event_away_formation.charAt(4) === '2' && event_away_formation.charAt(6) === '1' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 11)) :
                    event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '2'  && event_away_formation.charAt(4) === '1' && event_away_formation.charAt(6) === '2' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    
                    event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '1'  && event_away_formation.charAt(4) === '4' && event_away_formation.charAt(6) === '1' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 11)) :
                    event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '1'  && event_away_formation.charAt(4) === '3' && event_away_formation.charAt(6) === '2' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '2'  && event_away_formation.charAt(4) === '3' && event_away_formation.charAt(6) === '1' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 11)) :
                    event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '1'  && event_away_formation.charAt(4) === '2' && event_away_formation.charAt(6) === '3' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 9 || player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '2'  && event_away_formation.charAt(4) === '1' && event_away_formation.charAt(6) === '3' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 9 || player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '3'  && event_away_formation.charAt(4) === '1' && event_away_formation.charAt(6) === '2' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '3'  && event_away_formation.charAt(4) === '2' && event_away_formation.charAt(6) === '1' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 11)) :
                    event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '4'  && event_away_formation.charAt(4) === '1' && event_away_formation.charAt(6) === '1' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 11)) :

                    event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '5'  && event_away_formation.charAt(4) === '1' && event_away_formation.charAt(6) === '2' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '5'  && event_away_formation.charAt(4) === '2' && event_away_formation.charAt(6) === '1' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 11)) :
                    event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '4'  && event_away_formation.charAt(4) === '2' && event_away_formation.charAt(6) === '1' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 11)) :
                    event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '4'  && event_away_formation.charAt(4) === '1' && event_away_formation.charAt(6) === '2' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 10 || player.player_position === 11)) :
                    event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '2'  && event_away_formation.charAt(4) === '4' && event_away_formation.charAt(6) === '1' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 11)) :
                        null
                    }
                </div>

                <div className="midfielder-row" style={{ height: event_away_formation.length === 5 ? '25%' : '20%', display: 'flex'}}>
                    {event_away_formation.length === 5 && (
                        <>
                            {event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '3' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8)) :
                            event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '4' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                            event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '3' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                            event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '2' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 7 || player.player_position === 8)) :
                            event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '5' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 5 || player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                            null
                            }
                        </>
                    )}
                    {event_away_formation.length !== 5 && (
                        <>
                            {event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '1'  && event_away_formation.charAt(4) === '4' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 8 || player.player_position === 9 || player.player_position === 10 || player.player_position === 11)) :
                            event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '1'  && event_away_formation.charAt(4) === '3' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 8 || player.player_position === 9 || player.player_position === 10)) :
                            event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '1'  && event_away_formation.charAt(4) === '2' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 8 || player.player_position === 9)) :
                            event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '2'  && event_away_formation.charAt(4) === '2' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 9 || player.player_position === 10)) :
                            event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '2'  && event_away_formation.charAt(4) === '1' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 9)) :
                            event_away_formation.startsWith('5') && event_away_formation.charAt(2) === '3'  && event_away_formation.charAt(4) === '1' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 10)) :

                            event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '1'  && event_away_formation.charAt(4) === '4' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 7 || player.player_position === 8 || player.player_position === 9 || player.player_position === 10)) :
                            event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '1'  && event_away_formation.charAt(4) === '3' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                            event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '2'  && event_away_formation.charAt(4) === '3' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 8 || player.player_position === 9 || player.player_position === 10)) :
                            event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '2'  && event_away_formation.charAt(4) === '2' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 8 || player.player_position === 9)) :
                            event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '2'  && event_away_formation.charAt(4) === '1' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 8)) :
                            event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '3'  && event_away_formation.charAt(4) === '1' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 9)) :
                            event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '3'  && event_away_formation.charAt(4) === '2' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 9 || player.player_position === 10)) :
                            event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '4'  && event_away_formation.charAt(4) === '1' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 10)) :

                            event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '5'  && event_away_formation.charAt(4) === '1' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 10)) :
                            event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '4'  && event_away_formation.charAt(4) === '1' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 9)) :
                            event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '4'  && event_away_formation.charAt(4) === '2' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 9 || player.player_position === 10)) :
                                null
                            }
                        </>
                    )}
                </div>
                {event_away_formation.length !== 5 && (
                    <div className="five-line-position-row" style={{ height: '20%' }}>
                        {event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '4' ?
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 5 || player.player_position === 6 || player.player_position === 7 || player.player_position === 8)) :
                        event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '3' ?
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 5 || player.player_position === 6 || player.player_position === 7)) :
                        event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '2' ?
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 5 || player.player_position === 6 )) :
                        event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '1' ?
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 5)) :
                        event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '5' ?
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                            null
                        }

                        {event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '4' ?
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                        event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '3' ?
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8)) :
                        event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '2' ?
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 6 || player.player_position === 7 )) :
                        event_away_formation.startsWith('4') && event_away_formation.charAt(2) === '1' ?
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 6)) :

                        event_away_formation.startsWith('5') ?
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
                            null
                        }
                    </div>
                )}
                <div className="defender-row" style={{ height: event_away_formation.length === 5 ? '25%' : '20%' }}>
                    {event_away_formation.startsWith('4') ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 2 || player.player_position === 3 || player.player_position === 4 || player.player_position === 5)) :
                    event_away_formation.startsWith('3') ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 2 || player.player_position === 3 || player.player_position === 4)) :
                    event_away_formation.startsWith('5') ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 2 || player.player_position === 3 || player.player_position === 4 || player.player_position === 5 || player.player_position === 6)) :
                        null
                }
                </div>
                <div className="goalkeeper-row" style={{ height: event_away_formation.length === 5 ? '25%' : '20%'}}>
                    {renderPlayersAway(awayPlayers.filter(player => player.player_position === 1))}
                </div>
            </div>
        </div>
    );
};

export default Formations;