import React, { useState } from 'react';
import Modal from 'react-modal';
import '../Home.css';
import '../Menu.css'

const MatchsMenu = () => {

    return (
        
        <div className="home-container">
            <nav className="navbar">
                <h1>Football Search</h1>
            </nav>
            <div className='menu'>
                <h4 className='title1'>Busca el partido de fútbol que quieras!</h4>
            </div>
            <footer className='footer'>
            <div className="div">
                Created by <h3>franchute</h3>
                </div>
            </footer>
        </div>
        
    );
};

export default MatchsMenu;
