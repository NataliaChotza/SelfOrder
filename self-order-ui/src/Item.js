import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from 'react-router-dom';
import './Item.css';
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartShopping, faCaretLeft, faCartPlus} from '@fortawesome/free-solid-svg-icons';

function Item() {
    const {itemId} = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line no-template-curly-in-string
        axios.get(`http://localhost:8080/api/items/${itemId}`)
            .then(response => {
                console.log('Data fetched', response.data);
                setItem(response.data);
            })
            .catch(error => {
                console.error('Error while getting item', error);
            });
    }, [itemId]);

    const handleBackClick = () => {
        navigate(-1); // This navigates to the previous page
    };

    const handleCartClick = () => {
        const cartId = "cart1";//do zmiany
        axios.post(`http://localhost:8080/api/cart/${cartId}/${itemId}`)
            .then(response => console.log('Item saved to cart', response.data))
            .catch(error => {
                console.error('Error while saving item to cart', error)
            });
    }

    if (!item) {
        return (<div className="body">
            Loading data...
        </div>)
    } else {
        return (
            <div className="body">
                <div className="nav-bar ">
                    <nav>
                        <ul>
                            <li>
                                <a href="/">
                                    <FontAwesomeIcon className="icon" icon={faCaretLeft}
                                                     onClick={handleBackClick}></FontAwesomeIcon>
                                    <span>Menu</span>
                                </a>
                            </li>
                            <li>
                                <FontAwesomeIcon className="icon cart-icon" icon={faCartShopping}></FontAwesomeIcon>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="break-line"/>
                <div className="item-container">
                    <div className="item">
                        <h1>{item.name}</h1>
                        <p>{item.quantity}</p>
                            <div className="popup">
                                <FontAwesomeIcon className="icon" icon={faCartPlus} onClick={handleCartClick}>Add to
                                    Cart</FontAwesomeIcon>
                                <span className="popuptext" id="myPopup">Added to cart, successful</span>
                            </div>

                    </div>
                    <div className="description-box">
                        <p>{item.description}</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Item;