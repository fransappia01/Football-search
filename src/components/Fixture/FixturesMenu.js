import React, { useState, useEffect } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate} from 'react-router-dom';
import '../Menu.css';
import './Fixture.css'
import EventDetails from './EventDetails'
import loadingImg from '../../assets/loading.gif'
import Logo from '../../assets/soccer-logo3.png'

const FixturesMenu = ({setSelectedEvent}) => {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        console.log('Evento seleccionado:', event);
        navigate(`/${event.event_key}`)
    };

    // Funcion para manejar el modal del horario del partido
    const LessHoursToEventTime = (eventTime, eventStatus) => {
        if (eventStatus === 'Finished' || eventStatus === 'After Pen.' || eventStatus === 'After ET') {
            return 'Final';

        } else if (eventStatus === 'Half Time'){
            return 'ET';
            
        } else if (eventStatus === 'Postponed'){
            return 'Post.';
            
        } else if (eventStatus === 'Abandoned'){
            return 'Susp.';
            
        }else if (eventStatus !=='') {
            return `${eventStatus}'`;
        } else {
            // Separar la hora y los minutos
            const [hour, minutes] = eventTime.split(':');
            const date = new Date();
            date.setHours(parseInt(hour) - 5);
            date.setMinutes(minutes);
    
            // Formatear la nueva hora
            const newHour = String(date.getHours()).padStart(2, '0');
            const newMinutes = String(date.getMinutes()).padStart(2, '0');
    
            return `${newHour}:${newMinutes}`;
        }
    };

    // Funcion obtener fecha de hoy en modo estadounidense para usar en la api
    const getCurrentDate = () => {
        const now = new Date();
        //now.setDate(now.getDate()-1)
        now.setHours(now.getHours());
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Funcion para mostrar fecha como argentina
    const getCurrentDateArgFormat = () => {
        const now = new Date();
        now.setHours(now.getHours());
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    const getNextDay = () => {
        const now = new Date();
        now.setDate(now.getDate() + 1); // Agregar un día
        now.setHours(now.getHours());
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {


        const fetchData = async () => {
            const currentDate= getCurrentDate();
            const nextDay = getNextDay();
            console.log(currentDate);
            console.log(nextDay );
            try {
                setLoading(true);
                const apiKey = process.env.REACT_APP_KEY;
                //console.log(apiKey);
                const response = await fetch(`https://apiv2.allsportsapi.com/football/?&met=Fixtures&APIkey=${apiKey}&from=${currentDate}&to=${nextDay}`);
                const data = await response.json();

                // Filtrar los eventos que cumplen con las condiciones requeridas
                const filteredFixtures = data.result.filter(fixture => {
                    const eventDate = fixture.event_date;
                    const eventTime = fixture.event_time;
                    const leagueKey = fixture.league_key;  
                    const leagueName = fixture.league_name;
                    const eventId = fixture.event_key;

                    if (
                        // asi me traigo los partidos solo del dia de la fecha en Argentina teniendo cuenta horarios europeos
                        (eventDate === currentDate && eventTime >= '04:00' && eventTime <= '23:59'|| (eventDate === nextDay && eventTime >= '00:00' && eventTime <= '03:59')) &&
                        (leagueKey === 525 || leagueKey === 44 || leagueKey === 515 ||
                         leagueKey === 5 || leagueKey === 332 ||
                         leagueKey === 18 || leagueKey === 385 || leagueKey === 3 || leagueKey === 4 || leagueKey === 683 ||
                         leagueKey === 152 || leagueKey === 146 || leagueKey === 377 || leagueKey === 147 ||
                         leagueKey === 300 || leagueKey === 302 || leagueKey === 383 ||
                         leagueKey === 207 || leagueKey === 205 || leagueKey === 384 ||
                         leagueKey === 175 || leagueKey === 172 || leagueKey === 379 ||
                         leagueKey === 168 || leagueKey === 165 || leagueKey === 389 ||
                         leagueKey === 28 || leagueKey === 1 || leagueKey === 356 && leagueName === 'Friendlies - Friendlies 1'  || leagueKey === 633 || leagueKey === 354)
                    )
                    {
                        console.log('ENTRE');
                        return true;    // Estas son las Keys de los torneos que me importan (Argentina, Messi, Internacional, Inglaterra, España)
                    }
                    return false; // Excluir todos los demas eventos
                });
                
                setFixtures(filteredFixtures);
                console.log("Filtered Fixtures:", filteredFixtures);
            } catch (error) {
                console.error('Error fetching Fixtures:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    
    return (
        <div className="fixture-container">
            <nav className="navbar2">         
            <div className='link'><GoArrowLeft className='back-arrow' /></div>

                 {/* Renderiza la imagen del logo solo en pantallas más pequeñas */}
                <div className="logo-container">
                    <img src={Logo} alt="logo" className="logo" style={{width: 180, height: 100}}/>
                </div>
                
                {/* Renderiza el título en pantallas más grandes */}
                <h1 className="title">Fulbaso</h1>
            </nav>
            <p className= 'date-title'>Fecha de hoy:  <span className='date-number'>{getCurrentDateArgFormat()}</span></p>
    
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
                                {league.fixtures.map((fixture) => (
                                        <div key={fixture.event_key} className="fixture-item" onClick={() => handleEventClick(fixture)}>
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

                                                    {LessHoursToEventTime(fixture.event_time, fixture.event_status )}
                                                </div>
                                                <div className= 'div1'> 
                                                <div className="red-cards-container">
                                                   
                                                {fixture.cards && fixture.cards.some(card => card.card === 'red card' && card.home_fault) && (
                                                    <div className="red-card" title={fixture.cards.find(card => card.card === 'red card' && card.home_fault) &&
                                                     `${fixture.cards.find(card => card.card === 'red card' && card.home_fault).home_fault} (${fixture.cards.find(card => card.card === 'red card' && card.home_fault).time}')`}> 
                                                     </div>
                                                )}
                                                </div>
                                                <img src={fixture.home_team_logo} className="team-logo" />
                                                <span className= "match-team-name">{fixture.event_home_team}</span>
                                                </div>
                                                <div className= 'div2'> 
                                                <span className="match-result-penalty-home">{fixture.event_penalty_result && fixture.event_penalty_result.split(' - ')[0]}</span>
                                                <span className="match-result">
                                                {fixture.event_ft_result !== '' && fixture.event_status === "After ET" ? 
                                                    fixture.event_final_result :
                                                    fixture.event_ft_result !== '' ? 
                                                    fixture.event_ft_result :
                                                    fixture.event_final_result
                                                }
                                                </span>
                                                <span className="match-result-penalty-away">{fixture.event_penalty_result && fixture.event_penalty_result.split(' - ')[1]}</span>
                                                </div>
                                                <div className= 'div3'>
                                                <div className="red-cards-container">
                                                  
                                                {fixture.cards && fixture.cards.some(card => card.card === 'red card' && card.away_fault) && (
                                                    <div className="red-card" title={fixture.cards.find(card => card.card === 'red card' && card.away_fault) &&
                                                     `${fixture.cards.find(card => card.card === 'red card' && card.away_fault).away_fault} (${fixture.cards.find(card => card.card === 'red card' && card.away_fault).time}')`}> 
                                                     </div>
                                                )}
                                                </div>  
                                                <img src={fixture.away_team_logo} className="team-logo" />
                                                <span className="match-team-name">{fixture.event_away_team}</span>                                           
                                                </div>
                                            </div>
                                            <div className="goal-info">
                                            {fixture.goalscorers &&
                                                fixture.goalscorers
                                                    // Filtrar los goles de penal
                                                .filter(goal => !goal.home_scorer.includes('(pen.)') && !goal.away_scorer.includes('(pen.)'))
                                                .map((goal, goalIndex) => (
                                                    <div key={goalIndex} className="goal-details">
                                                        <div className='home_scorer'>{goal.home_scorer && `${goal.home_scorer} (${goal.time}')`}</div>
                                                        <div className='away_scorer'>{goal.away_scorer && `${goal.away_scorer} (${goal.time}')`}</div>
                                                    </div>
                                            ))}
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

export default FixturesMenu;