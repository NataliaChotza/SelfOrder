
import {css, jsx, Global} from "@emotion/react";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Menu.css';
import Navbar from "./components/Navbar";
import MenuItems from "./Menus/MenuItems";
import {useNavigate} from "react-router-dom";

const Menu = () => {
    const [items, setItems] = useState([]);
    const [all, setAll] = useState(true)
    const [drinksNoAlk, setDrinksNoAlk] = useState(false)
    const [mainDish, setMainDish] = useState(false)
    const [sweets, setSweets] = useState(false)
    const [appetisers, setAppetisers] = useState(false)

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

    return (
        <div
            className="body"
            css={css`
        background: #5E1833;
        height: 100%;
        padding: 70px 0;
      `}
        >
            <Navbar
                setAll={setAll}
                setDrinksNoAlk={setDrinksNoAlk}
                setMainDish={setMainDish}
                setSweets={setSweets}
                setAppetisers={setAppetisers}
            />

            <MenuItems
                items={items}
                all={all}
                drinksNoAlk={drinksNoAlk}
                mainDish = {mainDish}
                sweets={sweets}
                appetisers={appetisers}
            />

            <Global
                styles={css`
                  ::selection {
                    background:#F9E0D9;
                    color: #f0eff1;
                  }

                  * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: "Poppins", sans-serif;
                    --webkit-tap-highlight-color: transparent;
                  }

                  body::-webkit-scrollbar {
                    width: 12px; /* width of the entire scrollbar */
                  }

                  body::-webkit-scrollbar-track {
                    background:#F9E0D9; /* color of the tracking area */
                  }

                  body::-webkit-scrollbar-thumb {
                    background-color:#F9E0D9; /* color of the scroll thumb */
                    border-radius: 20px; /* roundness of the scroll thumb */
                    border: 3px solid #F9E0D9; /* creates padding around scroll thumb */
                  }

                  body {
                    background: #F9E0D9;
                    justify-content: center;
                    text-align: center;
                  }

                  .container {
                    width: 80%;
                    margin: auto;
                  }
                `}
            />
        </div>

    );

};

export default Menu;
