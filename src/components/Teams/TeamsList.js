import React from 'react';
import './TeamsList.css';
import Icon from '../../icon.png';

const TeamsList = ({ searchTeam }) => {
    const teamWithPlayers = searchTeam && searchTeam.filter(team => Array.isArray(team.players) && team.players.length > 0);

    // Mostrar mensaje si no se encontraron resultados
    if (!teamWithPlayers || teamWithPlayers.length < 0) {
        return <div className="no-results">No se encontraron resultados</div>;
    }

    // Agrupar jugadores por equipo y por tipo de posición
    const groupedPlayersByTeam = teamWithPlayers.map(team => {
        const groupedPlayers = {
            'Goalkeepers': [],
            'Defenders': [],
            'Midfielders': [],
            'Forwards': []
        };

        team.players.forEach(player => {
            groupedPlayers[player.player_type].push(player);
        });

        return { ...team, groupedPlayers };
    });

    // Función para ordenar los jugadores por tipo
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
                            {teamWithPlayers[0].coaches && teamWithPlayers[0].coaches.length > 0 && (
                            <div className='dt-team'><b>DT: </b> {teamWithPlayers[0].coaches[0].coach_name}</div>
                            )}
                        </div>
                    </div>
                    <div className="playerslist">
                     {Object.entries(groupedPlayersByTeam[0].groupedPlayers).map(([position, players]) => (
                            <div key={position}>
                                <h4>{position}</h4>
                                {sortPlayersByType(players).map((player, playerIndex) => (
                                    <div className='list' key={playerIndex}>{player.player_name}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                groupedPlayersByTeam.map((team, index) => (
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
                            {team.coaches && team.coaches.length > 0 && (
                            <div className='dt-team'><b>DT: </b>{team.coaches[0].coach_name}</div>
                            )}
                            </div>
                        </div>
                        <div className="playerslist">
                            {Object.entries(team.groupedPlayers).map(([position, players]) => (
                                <div key={position}>
                                    <h4>{position}</h4>
                                    {sortPlayersByType(players).map((player, playerIndex) => (
                                        <div className='list' key={playerIndex}>{player.player_name}</div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default TeamsList;
