// src/Menu.js
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Menu.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faCaretLeft, faCartPlus} from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/items`)
            .then(response => {
                console.log('Data fetched:', response.data);  // Debugging log
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error while getting items', error);
            });
    }, []);

    const handleItemClick = (itemId) => {
        navigate(`/items/${itemId}`)
    }

    return (
        <div className="menu-body">
            <div className="nav-bar ">
                <nav>
                    <ul>
                        <li>
                            <a href="/">Menu</a>
                        </li>
                        <li>
                            <FontAwesomeIcon className="icon cart-icon" icon={faCartShopping}></FontAwesomeIcon>
                        </li>

                    </ul>
                </nav>
            </div>
            <div className="break-line"/>
            <div className="menu-title">
                <h1>Self Order Menu</h1>
            </div>

            <div className="menu">
                <ul>
                    {items.map(item => (
                        <li key={item.id} onClick={() => handleItemClick(item.id)}>
                            <div className="menu-item" key={item.id}>
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
