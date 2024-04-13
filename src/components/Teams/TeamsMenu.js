import React, { useState } from 'react';
import { GoArrowLeft } from "react-icons/go";
import '../Home.css';
import '../Menu.css'
import TeamsList from './TeamsList';
import loadingImg from '../../loading.gif'
import Logo from '../../soccer-logo3.png'

const TeamsMenu = () => {
    const [searchTeam, setSearchTeam] = useState('');
    const [teamsList, setTeamsList] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [modalIsOpen, setModalIsOpen ] = useState(true);

    const handleInputChange = (event) => {
        setSearchTeam(event.target.value);
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchTeam.trim() !== '') {
            try {
                setLoading(true); // Establecer el estado de carga como verdadero
                const apiKey = process.env.REACT_APP_CLAVE;
                //console.log(apiKey);
                const response = await fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamName=${searchTeam}&APIkey=${apiKey}`);
                const data = await response.json();
                setTeamsList(data.result);
                console.log(data.result)
                setModalIsOpen(true);
            } catch (error) {
                console.error('Error fetching Teams:', error);
            } finally {
                setLoading(false); // Establecer el estado de carga como falso cuando se completa la carga
            }
        } else {
            console.error("Se requiere nombre del jugador");
        }
    };

    return (
        <div className="home-container">
            <nav className="navbar2">         
                <a href="/" className='link'><GoArrowLeft className='back-arrow' /></a>
                {/* Renderiza la imagen del logo solo en pantallas más pequeñas */}
                
                <div className="logo-container">
                    <img src={Logo} alt="logo" className="logo" style={{width: 180, height: 100}}/>
                </div>
                
                {/* Renderiza el título en pantallas más grandes */}
                <h1 className="title">Football Search</h1>
            </nav>
            <div className='menu'>
                <h4 className='title1'>Busca el equipo o selección de fútbol que quieras!</h4>
                <div className='searcher'isOpen={modalIsOpen}>
                <form onSubmit={handleSearch}>
                    <input
                        className='search-bar'
                        type="text"
                        value={searchTeam}
                        onChange={handleInputChange}
                        placeholder="Escribir equipo..."
                    />
                    <button type="submit" className='button'>Buscar</button>
                </form>
                </div>
            </div>
            {/* Mostrar el spinner de carga si la variable loading es verdadera */}
            {loading ? (
                <div className="preloader">
                <img src={loadingImg} alt="Preloader" style={{ width: '30px', height: '30px' }}/>
                <div className="loading-spinner">Cargando...</div>
                </div>
            ) : (
                // Mostrar la lista de equipos cuando la carga haya finalizado
                <TeamsList searchTeam ={teamsList} />
            )}
        </div>
    );
};

export default TeamsMenu;
