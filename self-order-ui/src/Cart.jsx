import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";

function Cart() {
    const {cartId} = useParams();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line no-template-curly-in-string
        axios.get(`http://localhost:8080/api/cart/${cartId}/items`)
            .then(response => {
                console.log('Data fetched', response.data);
                setCartItems(response.data);
            })
            .catch(error => {
                console.error('Error while getting item', error);
            });
    }, [cartId]);

}

export default Cart;