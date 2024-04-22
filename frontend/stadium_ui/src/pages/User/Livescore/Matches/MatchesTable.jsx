// MatchesTable.js

import React, { useState, useEffect } from 'react';
import './MatchesTable.css';

function MatchesTable() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://sportscore1.p.rapidapi.com/teams/5711/events?page=1', {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '67fd92b166mshba66ed90c147fc4p166dc8jsn13e422347d03',
                        'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
                    }
                });
                const data = await response.json();
                const lastTenMatches = data.data.slice(0, 10); // Get the last 10 matches
                setMatches(lastTenMatches);
            } catch (error) {
                console.error(error);
            }
        };
        

        fetchMatches();
    }, []);

    const isMatchStarted = (match) => {
        
        return match.status === 'inprogress' || match.status === 'finished';
    };

    const handleBuyTicket = (matchId) => {
        // Handle buy ticket button click
        if (!isMatchStarted) {
            // Implement logic for buying tickets
            console.log(`Buy ticket for match ${matchId}`);
        }
    };

    return (
        <div className="matches-container">
            <h1 className="matches-header">Matches</h1>
            <table className="matches-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>League</th>
                        {/* <th></th> */}
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Status</th>
                        <th>Result</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match.id}>
                            <td> <img src={match.league.logo} alt="" /> </td>
                            <td>{match.league?.name}</td>
                            {/* <td>{match.start_at}</td> */}
                            <td>{match.home_team?.name}</td>
                            <td>{match.away_team?.name}</td>
                            <td>{match.status}</td>
                            <td>{match.home_score?.current}-{match.away_score?.current}</td>
                            <td>
                                {isMatchStarted(match) ? (
                                    <button disabled>Buy Ticket</button>
                                ) : (
                                    <button onClick={() => handleBuyTicket(match.id)}>Buy Ticket</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatchesTable;
