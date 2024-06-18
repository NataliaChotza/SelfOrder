// src/Menu.js
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Menu.css';

const Menu = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/items')
            .then(response => {
                console.log('Data fetched:', response.data);  // Debugging log
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error while getting items', error);
            });
    }, []);

    const handleItemClick = (itemId) => {
        navigate(`/api/items/${itemId}`)
    }

    return (
        <div className="body">
            <div className="menu">
                <h1>Self Order Menu</h1>
                <ul>
                    {items.map(item => (
                        <li key={item.id} onClick={() => handleItemClick(item.id)}>
                            <div className="item" key={item.id}>
                                <p>{item.name}</p>
                                <p>{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Menu;
