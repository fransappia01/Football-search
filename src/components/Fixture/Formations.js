import React from 'react';
import { GoArrowLeft } from "react-icons/go";
import loadingImg from '../../assets/loading.gif';
import Ball from '../../assets/ball.png'
import './Fixture.css';
import './Event.css'
import YellowCardImage from '../../assets/yellow-card.png'
import RedCardImage from '../../assets/red-card.png'
import ArrowDown from '../../assets/flecha-abajo.png'
import { useNavigate, Link } from 'react-router-dom';

const  Formations = ({ selectedEvent }) => {
    const localPlayers = selectedEvent.lineups.home_team.starting_lineups;
    const awayPlayers = selectedEvent.lineups.away_team.starting_lineups;

    const { cards, card, event_key, goalscorers, event_away_formation, event_home_formation, home_scorer, away_scorer, time, event_home_team, event_away_team, home_team_logo, event_penalty_result, event_ft_result, event_final_result, away_team_logo} = selectedEvent;
    const changes = selectedEvent.substitutes;
    
    const isGoalScorer = (player) => {
        // Itera sobre los goleadores y verifica si alguno coincide con el jugador
        return goalscorers.some((goal) => {
            // Convierte player.player_key a string antes de la comparación
            return (goal.home_scorer  && !goal.home_scorer.includes('(pen.)') && goal.home_scorer_id === player.player_key.toString()) ||
                   (goal.away_scorer &&  !goal.away_scorer.includes('(pen.)') && goal.away_scorer_id === player.player_key.toString())
        });
    };    

    const isYellowCard = (player) => {
        return selectedEvent.cards.some((card) => {
            return card.card === "yellow card" && card.away_player_id === player.player_key.toString() ||
                  (card.card === "yellow card" && card.home_player_id === player.player_key.toString())
        });
    };
   
    
    const isRedCard = (player) => {
        return selectedEvent.cards.some((card) => {
            return card.card === "red card" && card.away_player_id === player.player_key.toString() ||
                  (card.card === "red card" && card.home_player_id === player.player_key.toString())
        });
    };

    // Lógica para renderizar los jugadores en cada fila de la cancha
    const renderPlayers = (players) => {
        players.sort((a, b) => a.player_position - b.player_position); 
        const formationClass = event_home_formation.charAt(0) === '5' || event_home_formation.charAt(2) === '5' ? 'extra-case-5-line' : '';
    
        return players.map((player, index) => {
            const goalsScored = isGoalScorer(player);
            const hasBeenSubstituted = changes.some(change => change.home_scorer && change.home_scorer.out_id === player.player_key);
            const hasDownArrowAndGoal = goalsScored > 0 && hasBeenSubstituted;
            const hasYellowCard = isYellowCard(player);
            const hasRedCard = isRedCard(player);
            const hasCard = hasYellowCard || hasRedCard;
    
            return (
                <div key={index} className={`player-circle${hasBeenSubstituted ? ' substituted' : ''}${hasCard ? ' player-circle-withcard' : ''} ${formationClass}`}>
                    <div className='cards-container-home'>
                        {isYellowCard(player) && <img src={YellowCardImage} alt="yellow-card" className="card-icon-form-home" />}
                        {isRedCard(player) && <img src={RedCardImage} alt="red-card" className="card-icon-form-home" />}
                    </div>
                    <div className="player-number"><div className='numero-jugador'>{player.player_number}</div>
                        {goalsScored > 0 && ( // Mostrar la pelota solo si se ha marcado al menos un gol
                            <img
                                src={Ball}
                                alt="soccer-ball-icon"
                                className={`soccer-ball-icon${hasBeenSubstituted ? ' substituted' : ''}`}
                            />
                        )}
                        {goalsScored >= 2 && ( // Mostrar el número de goles si es mayor o igual a 2
                            <div className={`goals-scored${hasBeenSubstituted ? ' substituted' : ''}`}>{goalsScored}</div>
                        )}
                    <div className={`sust-local${hasDownArrowAndGoal ? ' down-arrow-goal' : ''}`}>
                        {hasBeenSubstituted && <img src={ArrowDown} alt="down-arrow" className={`down-arrow-icon${hasBeenSubstituted ? ' substituted' : ''}`} />}
                    </div>
                    </div>
                    <div className={`player-name${hasDownArrowAndGoal ? ' player-name2' : ''}`}>
                        {player.player}
                    </div>
                </div>
            );
        });
    };

    const renderPlayersAway = (players) => {
        players.sort((a, b) => a.player_position - b.player_position); 
        players.reverse();  //Los da vuelta para mostrar al visitante
    
        return players.map((player, index) => {
            const goalsScored = isGoalScorer(player);
            const hasBeenSubstitutedAway = changes.some(change => change.away_scorer && change.away_scorer.out_id === player.player_key);
            const hasDownArrowAndGoal = goalsScored > 0 && hasBeenSubstitutedAway;
            const hasYellowCard = isYellowCard(player);
            const hasRedCard = isRedCard(player);
            const hasCard = hasYellowCard || hasRedCard;
    
            return (
                <div key={index} className={`player-circle${hasBeenSubstitutedAway ? ' substituted' : ''}${hasCard ? ' player-circle-withcard' : ''}`}>
                    <div className='cards-container-away'>
                        {isYellowCard(player) && <img src={YellowCardImage} alt="yellow-card" className="card-icon-form-away" />}
                        {isRedCard(player) && <img src={RedCardImage} alt="red-card" className="card-icon-form-away" />}
                    </div>
                    <div className="player-number-away"><div className='numero-jugador'>{player.player_number}</div>
                        {goalsScored > 0 && (
                            <img
                                src={Ball}
                                alt="soccer-ball-icon"
                                className={`soccer-ball-icon${hasBeenSubstitutedAway ? ' substituted' : ''}`}
                            />
                        )}
                        {goalsScored >= 2 && (
                            <div className={`goals-scored${hasBeenSubstitutedAway ? ' substituted' : ''}`}>{goalsScored}</div>
                        )}
                    <div className={`sust-away${hasDownArrowAndGoal ? ' down-arrow-goal' : ''}`}>
                        {hasBeenSubstitutedAway && <img src={ArrowDown} alt="down-arrow" className={`down-arrow-icon${hasBeenSubstitutedAway ? ' substituted' : ''}`} />}
                    </div>
                    </div>
                    <div className={`player-name-away${hasDownArrowAndGoal ? ' player-name-away2' : ''}`}>
                        {player.player}
                    </div>
                </div>
            );
        });
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
                        renderPlayers(localPlayers.filter(player => player.player_position === 5 || player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
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
                            event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '4' ?
                                renderPlayers(localPlayers.filter(player => player.player_position === 5 || player.player_position === 6 || player.player_position === 7 || player.player_position === 8)) :
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
                    event_home_formation.length === 5  && event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '4' && event_home_formation.charAt(4) === '3' ?
                        renderPlayers(localPlayers.filter(player => player.player_position === 9 ||player.player_position === 10 || player.player_position === 11)) :
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
                    event_home_formation.startsWith('3') && event_home_formation.charAt(2) === '5'  && event_home_formation.charAt(4) === '1' && event_home_formation.charAt(6) === '1' ?
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
                    event_away_formation.length === 5  && event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '4' && event_away_formation.charAt(4) === '3' ?
                        renderPlayersAway(awayPlayers.filter(player => player.player_position === 9 ||player.player_position === 10 || player.player_position === 11)) :
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
                    event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '5'  && event_away_formation.charAt(4) === '1' && event_away_formation.charAt(6) === '1' ?
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
                            event_away_formation.startsWith('3') && event_away_formation.charAt(2) === '4' ?
                                renderPlayersAway(awayPlayers.filter(player => player.player_position === 5 || player.player_position === 6 || player.player_position === 7 || player.player_position === 8)) :
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
                            renderPlayersAway(awayPlayers.filter(player => player.player_position === 5 || player.player_position === 6 || player.player_position === 7 || player.player_position === 8 || player.player_position === 9)) :
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