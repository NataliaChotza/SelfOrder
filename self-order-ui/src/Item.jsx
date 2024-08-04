import './Item.css';
import axios from "axios";
import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {css, jsx, Global} from "@emotion/react";

const Item = () => {
    const [item, setItem] = useState([])
    const {itemId} = useParams();

    const breakpoints = [576, 768, 992, 1200];

    const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

    const itemContainer = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
        },
    };
    const navigator = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/items/${itemId}`)
            .then(response => {
                console.log('Data fetched:', response.data);  // Debugging log
                setItem(response.data);
            })
            .catch(error => {
                console.error('Error while getting items', error);
            });
    }, [itemId]);
    const handleCartClick = () => {
        const cartId = "cart1";//do zmiany
        axios.post(`http://localhost:8080/api/cart/${cartId}/${itemId}`)
            .then(response => console.log('Item saved to cart', itemId))
            .catch(error => {
                console.error('Error while saving item to cart', error)
            });
    }

    const handleShowCart = (cartId) => {
        navigator(`/api/cart/${cartId}`)

    }


    if (!item) return <div className="body">Loading</div>

    return (
        <>
            <motion.div className="body">
                <motion.div className=" item-title-box item">
                    <FontAwesomeIcon className="cart-icon" icon={faCartShopping} onClick={()=>handleShowCart("cart1")}></FontAwesomeIcon>
                    <motion.h5 className="item-title">{item.name} </motion.h5>
                    <motion.h6> {item.price}{item.currency}</motion.h6>
                    <motion.h6 onClick={() => handleCartClick()}>
                        <FontAwesomeIcon className="icon" icon={faCartPlus}></FontAwesomeIcon>
                    </motion.h6>
                </motion.div>
                <motion.div>
                    <motion.h5 className="description-box ">{item.description} </motion.h5>

                </motion.div>

                <Global
                    styles={css`
                      ::selection {
                        background: #000;
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
                        background: #F9E0D9; /* color of the tracking area */
                      }

                      body::-webkit-scrollbar-thumb {
                        background-color: #5E1833; /* color of the scroll thumb */
                        border-radius: 20px; /* roundness of the scroll thumb */
                        border: 3px solid #F9E0D9; /* creates padding around scroll thumb */
                      }

                      body {
                        background: #F9E0D9;
                      }

                      .container {
                        width: 80%;
                        margin: auto;
                      }

                      .description-box {
                        display: flex;
                        background: #F9E0D9;
                        font-size: 1.2em;
                        color: #000000;
                        margin: 30px;
                        padding: 20px;
                        border-radius: 10px;
                        flex-direction: column;
                        align-items: center;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        transition: transform 0.3s, box-shadow 0.3s;
                      }

                      .item-title-box {
                        display: flex;
                        justify-content: space-between;

                        .item-title {
                          font-size: 1.5em;
                        }

                        .item-price {
                          font-size: 1rem;

                          ${mq[(0, 1)]} {
                            font-size: 0.8rem;
                          }
                        }

                    `}
                />
            </motion.div>
        </>

    )
        ;
}

export default Item;