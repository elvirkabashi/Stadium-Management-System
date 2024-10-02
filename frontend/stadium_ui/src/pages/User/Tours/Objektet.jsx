import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Objektet.css';

const Objektet = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // Fetch data using Axios
        axios.get(`${import.meta.env.VITE_BASE_URL}api/Group`)
            .then(response => setRestaurants(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="container">
            <div className="text-container">
                <header className="header">OBJEKTET USHQIMORE MË TË AFËRTA PËR NJË EKSPERIENCE SA MË TË MIRË</header>
                <div className="restaurant-list">
                    {restaurants.map((restaurant, index) => (
                        <div key={index} className="restaurant">
                            <strong>{restaurant.groupName}</strong>
                            <p>{restaurant.description}</p>
                        </div>
                    ))}
                </div>
                <p className="info">
                    <em>Ju rekomandoj të kontrolloni oraret e hapjes së këtyre vendëve dhe të verifikoni informacionin aktual përkatës pasi mund të ndryshojnë...</em>
                </p>
            </div>
        </div>
    );
};

export default Objektet;
