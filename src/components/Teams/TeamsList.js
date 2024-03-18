import React, { useState } from 'react';
import './TeamsList.css';
import Icon from '../../icon.png';

const TeamsList = ({ searchTeam }) => {
    const teamWithPlayers = searchTeam && searchTeam.filter(team => Array.isArray(team.players) && team.players.length > 0);

    // Mostrar mensaje si no se encontraron resultados
    if (!teamWithPlayers || teamWithPlayers.length < 0) {
        return <div className="no-results">No se encontraron resultados</div>;
    }

    // Función para ordenar los jugadores
    const sortPlayersByType = (players) => {
        const playerTypesOrder = ['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards'];

        // Ordenar los jugadores según su tipo
        players.sort((a, b) => {
            const typeA = playerTypesOrder.indexOf(a.player_type);
            const typeB = playerTypesOrder.indexOf(b.player_type);
            return typeA - typeB;
        });

        return players;
    };

    // Agrupar jugadores por tipo
    const groupedPlayers = {
        'Goalkeepers': [],
        'Defenders': [],
        'Midfielders': [],
        'Forwards': []
    };

    teamWithPlayers.forEach(team => {
        team.players.forEach(player => {
            groupedPlayers[player.player_type].push(player);
        });
    });

    return (
        <div className="teams-container">
            {teamWithPlayers.length === 1 ? (
                <div className="team-individual">
                    <div className="team-info">
                        <div className="team-name">
                            {teamWithPlayers[0].team_name || 'n/a' }
                        </div>
                        <div className="team-image">
                            <img
                                src={teamWithPlayers[0].team_logo || Icon}
                                alt={teamWithPlayers[0].team_name}
                                className="team-img"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = Icon;
                                }}
                            />
                        </div>
                    </div>
                    <div className="playerslist">
                        <h3 className='title-players'>Jugadores</h3>
                        <div>
                        {sortPlayersByType(teamWithPlayers[0].players).map((player, playerIndex) => (
                                <div className='list' key={playerIndex}>{player.player_name} - {player.player_type}</div>
                                
                            ))}
                        </div>
                    </div>
                </div>
            ) : (

                // mapeo para 2 o mas equipos en la busqueda
                teamWithPlayers.map((team, index) => (
                    <div key={index} className="team">
                        <div className="team-info">
                            <div className="team-name">
                                {team.team_name || 'n/a' }
                            </div>
                            <div className="team-image">
                                <img
                                    src={team.team_logo || Icon}
                                    alt={team.team_name}
                                    className="team-img"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = Icon;
                                    }}
                                />
                            </div>
                        </div>
                        <div className="playerslist">
                            <h3 className='title-players'>Jugadores</h3>
                            <div>
                                {sortPlayersByType(team.players).map((player, playerIndex) => (
                                    <div className='list' key={playerIndex}>{player.player_name} - {player.player_type}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default TeamsList;
