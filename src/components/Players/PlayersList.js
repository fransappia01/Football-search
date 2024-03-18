import React from 'react';
import './PlayersList.css'
import Icon from '../../icon.png'

const PlayersList = ({ searchPlayer, onSearch }) => {

    // Verificar si searchPlayer existe y es un array antes de filtrar
    const clubPlayers = searchPlayer && Array.isArray(searchPlayer)
        ? searchPlayer.filter(player => player.team_name !== player.player_country && !player.team_name.includes("U23") && !player.team_name.includes("U21") && !player.team_name.includes("U17"))
        : [];

    // Mostrar mensaje si no se encontraron resultados
    if (!searchPlayer) {
        return <div className="no-results">No se encontraron resultados</div>;
    }

    // Ordenar los jugadores por rating (de mayor a menor)
    clubPlayers.sort((a, b) => {

        // Ordenar por rating (de mayor a menor)
        if (b.player_rating !== a.player_rating) {
            return b.player_rating - a.player_rating;
        } else {

            // Si el rating es el mismo, ordenar por nombre alfabéticamente
            const nameA = a.player_name.toLowerCase();
            const nameB = b.player_name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }
    });

    return (
        <div className="players-container">
            {clubPlayers.length < 0 && (
                <div className="loading-spinner">Cargando...</div>
            )}
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
                            e.target.onerror = null;
                            e.target.src = Icon;
                        }}/>
                    </div>
                    <div className="player-country">
                        <div className="footer-card" title={searchPlayer.player_name}>
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
