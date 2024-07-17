import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from 'react-router-dom';
import './Item.css';
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartShopping, faCaretLeft, faCartPlus} from '@fortawesome/free-solid-svg-icons';
import Navbar from "./components/Navbar";
import {motion} from "framer-motion";

const Item=({itemId,items}) =>{

    const handleCartClick = () => {
        const cartId = "cart1";//do zmiany
        axios.post(`http://localhost:8080/api/cart/${cartId}/${itemId}`)
            .then(response => console.log('Item saved to cart', response.data))
            .catch(error => {
                console.error('Error while saving item to cart', error)
            });
    }

        return (
            <div className="body">

                {itemId && items
                    .filter((id)=>itemId === id)
                    .map(item => (
                        <motion.div
                            transition={{ delay: 0.2 }}
                        >
                            <motion.h5 className="item-title">{item.name} <br/> {item.price} {item.currency} </motion.h5>
                            <motion.h6> {item.quantity}</motion.h6>
                            <motion.p className="item-desc">{item.description}</motion.p>
                        </motion.div>

                    ))}
            </div>
        );
}

export default Item;