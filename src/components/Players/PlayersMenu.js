import React, { useState } from 'react';
import { GoArrowLeft } from "react-icons/go";
import '../Home.css';
import '../Menu.css'
import PlayersList from './PlayersList';

const PlayersMenu = () => {

    const [searchPlayer, setSearchPlayer] = useState('');
    const [playersList, setPlayersList] = useState([]);
    const [modalIsOpen, setModalIsOpen ] = useState(true);

    const handleInputChange = (event) => {
        setSearchPlayer(event.target.value);
    }

    const handleSearch = async (event) => 	{

        event.preventDefault();
        if (searchPlayer.trim() !== '') {
            try {
                const apiKey = '6edd94573dd41a4c12b0baaad7938939d43615fd745e000ebb77c46037ab2de5';
                const response = await fetch(`https://apiv2.allsportsapi.com/football/?&met=Players&playerName=${searchPlayer}&APIkey=${apiKey}`);
                const data = await response.json();
                setPlayersList(data.result);
                console.log(data)
                setModalIsOpen(true);       //mantengo siempre abierto el modal
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        } else {
            console.error("Se requiere nombre del jugador");
        }
    };

    return (
        
        <div className="home-container">
            <nav className="navbar2">         
                <a href="/" className='link'><GoArrowLeft className='back-arrow' /></a>
                <h1>Football Search</h1>
            </nav>
            <div className='menu'>
                <h4 className='title1'>Busca el jugador de fútbol que quieras!</h4>
                <div className='searcher'isOpen={modalIsOpen}>
                <form onSubmit={handleSearch}>
                    <input
                        className='search-bar'
                        type="text"
                        value={searchPlayer}
                        onChange={handleInputChange}
                        placeholder="Escribir jugador..."
                    />
                    <button type="submit" className='button'>Buscar</button>
                </form>
                </div>
            </div>
            <PlayersList searchPlayer={playersList}/>
            <footer className='footer'>
            <div className="div">
                Created by <h3>franchute</h3>
                </div>
            </footer>
        </div>
        
    );
};

export default PlayersMenu;
