import React from 'react';
import './Home.css';
import Card from './Card';

const Home = () => {
    return (
        <div className="home-container">
            <nav className="navbar">
                <h1>Fulbaso</h1>
            </nav>
            <Card />
            <footer className='footer'>
            <div className="div">
                Created by <h3>franchute</h3>
                </div>
            </footer>
        </div>
    );
};

export default Home;
