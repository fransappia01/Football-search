import React, { useState, useEffect } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate} from 'react-router-dom';
import '../Menu.css';
import './Fixture.css'
import loadingImg from '../../loading.gif'
import Logo from '../../soccer-logo3.png'

const EventDetails = ({eventId}) => {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    
    return (
        <div className="fixture-container">
            <nav className="navbar2">         
                <a href="/" className='link'><GoArrowLeft className='back-arrow' /></a>

                 {/* Renderiza la imagen del logo solo en pantallas más pequeñas */}
                <div className="logo-container">
                    <img src={Logo} alt="logo" className="logo" style={{width: 180, height: 100}}/>
                </div>
                
                {/* Renderiza el título en pantallas más grandes */}
                <h1 className="title">Football Search</h1>
            </nav>
    
            {/* Mostrar el spinner de carga si la variable loading es verdadera */}
            {loading ? (
                <div className="preloader-fix">
                    <img src={loadingImg} alt="Preloader" style={{ width: '30px', height: '30px' }}/>
                    <div className="loading-spinner-fix">Cargando...</div>
                </div>
            ) : (
                
                <div className='menu-fixture'>
                    {fixtures

                         // Ordenar las ligas y sus fixtures
                        .sort((a, b) => {
                            // Si el pais de la liga es "Argentina", colocar primero
                            if (a.country_name === "Argentina" && b.country_name !== "Argentina") return -1;
                            if (b.country_name === "Argentina" && a.country_name !== "Argentina") return 1;
    
                            // Si la league_name es "intl", dar prioridad a la league_key 18 (Libertadores)
                            if (a.country_name === "intl" && b.country_name !== "intl") return -1;
                            if (b.country_name === "intl" && a.country_name !== "intl") return 1;
                            if (a.country_name === "intl" && b.country_name === "intl") {
                                if (a.league_key === 18 && b.league_key !== 18) return -1;
                                if (b.league_key === 18 && a.league_key !== 18) return 1;
                            }
    
                            // Si no cumple ningún criterio especial, mantener el orden original
                            return 0;
                        })

                        // Agrupar los partidos por liga
                        .reduce((acc, fixture) => {
                            // Comprobar si ya existe una entrada para esta liga en el acumulador
                            const leagueIndex = acc.findIndex(item => item.league_name === fixture.league_name);
                            if (leagueIndex !== -1) {
                                // Si la liga ya existe, agregar el fixture a la lista de partidos de esa liga
                                acc[leagueIndex].fixtures.push(fixture);
                            } else {
                                // Si la liga no existe, crear una nueva entrada para la liga y agregar el fixture
                                acc.push({ league_name: fixture.league_name, fixtures: [fixture] });
                            }
                            return acc;
                        }, [])

                        // Mapear las ligas y sus fixtures correspondientes
                        .map((league, id) => (
                            <div key={id} className="league-container">
                                <h2 className='league-title'>{league.league_name}</h2>
                                <div className="fixtures-list">
                                {league.fixtures.map((fixture, index) => (
                                        <div key={index} className="fixture-item">
                                            <div className="match-info">
                                                <div className='match-time' style={{ backgroundColor: fixture.event_status === 'Postponed' ||
                                                                                                      fixture.event_status === 'Suspendido'
                                                                                                      ? 'red'  :
                                                                                                      fixture.event_status === 'Finished' || 
                                                                                                      fixture.event_status === 'After ET' || 
                                                                                                      fixture.event_status === 'After Pen.' 
                                                                                                      ? 'black' : 
                                                                                                      fixture.event_status !== ''   && 
                                                                                                      fixture.event_status !== 'Postponed' &&
                                                                                                      fixture.event_status !== 'Finished' && 
                                                                                                      fixture.event_status !== 'After ET' && 
                                                                                                      fixture.event_status !== 'After Pen.'
                                                                                                       ? 'green' : 'rgba(10, 10, 10, 0.712)'}}> 
                                                                                                      {/*Si se esta jugando, los minutos en verde*/}

                                                </div>
                                                <div className= 'div1'> 
                                                <img src={fixture.home_team_logo} className="team-logo" />
                                                <span className= "match-team-name">{fixture.event_home_team}</span>
                                                </div>
                                                <div className= 'div2'> 
                                                <span className="match-result-penalty-home">{fixture.event_penalty_result && fixture.event_penalty_result.split(' - ')[0]}</span>
                                                <span className="match-result">{fixture.event_ft_result !== '' ? fixture.event_ft_result : fixture.event_final_result}</span>
                                                <span className="match-result-penalty-away">{fixture.event_penalty_result && fixture.event_penalty_result.split(' - ')[1]}</span>
                                                </div>
                                                <div className= 'div3'>
                                                <img src={fixture.away_team_logo} className="team-logo" />
                                                <span className="match-team-name">{fixture.event_away_team}</span>                                           
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            )}
            <footer className='footers'> 
                <div className="div-final"></div> 
            </footer>
        </div>
    );
};

export default EventDetails;