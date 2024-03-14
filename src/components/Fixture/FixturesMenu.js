import React, { useState, useEffect } from 'react';
import { GoArrowLeft } from "react-icons/go";
import '../Menu.css';
import './Fixture.css'
//import Fixture from './Fixture';
import loadingImg from '../../loading.gif'

const FixturesMenu = () => {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true); 

    const LessHoursToEventTime = (eventTime) => {
        // Separar la hora y los minutos
        const [hour, minutes] = eventTime.split(':');
        
        // Crear un nuevo objeto de fecha
        const date = new Date();
        
        // Establecer la hora y los minutos del objeto de fecha
        date.setHours(parseInt(hour) - 4);
        date.setMinutes(minutes);

        // Formatear la nueva hora
        const newHour = String(date.getHours()).padStart(2, '0');
        const newMinutes = String(date.getMinutes()).padStart(2, '0');

        return `${newHour}:${newMinutes}`;
    };

    useEffect(() => {
        const getCurrentDate = () => {
            const now = new Date();
            now.setHours(now.getHours());
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
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

        const fetchData = async () => {
            const currentDate= getCurrentDate();
            const nextDay = getNextDay();
            console.log(currentDate);
            console.log(nextDay );
            try {
                setLoading(true);
                const apiKey = '6edd94573dd41a4c12b0baaad7938939d43615fd745e000ebb77c46037ab2de5';
                const response = await fetch(`https://apiv2.allsportsapi.com/football/?&met=Fixtures&APIkey=${apiKey}&from=${currentDate}&to=${nextDay}`);
                const data = await response.json();

                // Filtrar los eventos que cumplen con las condiciones requeridas
                const filteredFixtures = data.result.filter(fixture => {
                    const eventDate = fixture.event_date;
                    const eventTime = fixture.event_time;
                    const leagueKey = fixture.league_key;  
                    if (
                        // asi me traigo los partidos solo del dia de la fecha en Argentina teniendo cuenta horarios europeos
                        (eventDate === currentDate && eventTime >= '04:00' && eventTime <= '23:59'|| (eventDate === nextDay && eventTime >= '00:00' && eventTime <= '03:59')) &&
                        (leagueKey === 525 || leagueKey === 44 || leagueKey === 515 ||
                         leagueKey === 5 || leagueKey === 332 ||
                         leagueKey === 18 || leagueKey === 385 || leagueKey === 3 || leagueKey === 4 || leagueKey === 683 ||
                         leagueKey === 152 || leagueKey === 146 || leagueKey === 377 || leagueKey === 147 ||
                         leagueKey === 300 || leagueKey === 302 || leagueKey === 383)
                    ) {
                        console.log('ENTRE');
                        return true;    // Estas son las Keys de los torneos que me importan (Argentina, Messi, Internacional, Inglaterra, España)
                    }
                    return false; // Excluir todos los demás eventos
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
                <a href="/" className='link'><GoArrowLeft className='back-arrow' /></a>
                <h1>Football Search</h1>
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
                                <h2>{league.league_name}</h2>
                                <div className="fixtures-list">
                                    {league.fixtures.map((fixture, index) => (
                                        <div key={index} className="fixture-item">                                      
                                            <p>
                                                <span className='match-hour'>{LessHoursToEventTime(fixture.event_time)}</span>
                                                <img src={fixture.home_team_logo} className="team-logo" />
                                                <span className= "match-team-name">{fixture.event_home_team}</span>
                                                <span className="match-result">{fixture.event_final_result}</span>
                                                <span className="match-team-name">{fixture.event_away_team}</span>
                                                <img src={fixture.away_team_logo} alt={fixture.event_away_team} className="team-logo" />
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            )}
            <footer className='footers'> 
                <div className="div"></div> 
            </footer>
        </div>
    );
};

export default FixturesMenu;