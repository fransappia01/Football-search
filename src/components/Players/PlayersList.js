import React, { useState } from 'react';
import './PlayersList.css'
import Icon from '../../icon.png'

const PlayersList = ({ searchPlayer }) => {


    // Filtrar jugadores que tengan un equipo de club
    const clubPlayers = searchPlayer.filter(player => player.team_name !== player.player_country);

    return (
        <div className="players-container">
            {clubPlayers.map((searchPlayer, id) => (
                <div key={id} className="player">
                    <div className="player-name">
                        {searchPlayer.player_name || 'n/a' }
                    </div>
                    <div className="player-image">
                        <img src={searchPlayer.player_image || Icon} 
                        alt={searchPlayer.player_name} 
                        className="player-img" 
                        onError={(e) => {
                            e.target.onerror = null; // Evita bucle infinito si dummyImg también es inválida
                            e.target.src = Icon; // Cambia la imagen a dummyImg en caso de error

                        }}/>
                    </div>
                    <div className="player-country">
                        <div className="footer-card" title="author">
                            <strong>Nacionalidad:</strong> {searchPlayer.player_country || 'No especificado'}
                        </div>
                        <div className="footer-card">
                            <strong>Equipo actual:</strong> {searchPlayer.team_name|| 'No especificado'}
                        </div>
                        <div className="footer-card">
                            <strong>Posición:</strong> {searchPlayer.player_type|| 'n/a'}
                        </div>
                        <div className="footer-card">
                            <strong>Edad:</strong> {searchPlayer.player_age|| 'n/a'}
                        </div>
                    </div>    
                </div>
            ))}
        </div>
    );
}

export default PlayersList;
