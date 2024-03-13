import React, { useState } from 'react';
import { GoArrowLeft } from "react-icons/go";
import '../Home.css';
import '../Menu.css'

const PlayersMenu = () => {

    const [searchPlayer, setSearchPlayer] = useState('');

    const handleInputChange = (event) => {
        setSearchPlayer(event.target.value);
    }

    const handleSearch = () => 	{

    }

    return (
        
        <div className="home-container">
            <nav className="navbar2">         
                <a href="/" className='link'><GoArrowLeft className='back-arrow' /></a>
                <h1>Football Search</h1>
            </nav>
            <div className='menu'>
                <h4 className='title1'>Busca el equipo de fútbol que quieras!</h4>
                <div className='searcher'>
                <input
                        className='search-bar'
                        type="text"
                        value={searchPlayer}
                        onChange={handleInputChange}
                        placeholder="Escribir jugador..."
                    />
                    <button className='button' onClick={handleSearch}>Buscar</button>
                </div>
            </div>
            <footer className='footer'>
            <div className="div">
                Created by <h3>franchute</h3>
                </div>
            </footer>
        </div>
        
    );
};

export default PlayersMenu;
