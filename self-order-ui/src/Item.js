import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from 'react-router-dom';
import './Item.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping,faCaretLeft} from '@fortawesome/free-solid-svg-icons';
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
    if (!item) {
        return (<div className="body">
            Loading data...
        </div>)
    } else {
        return (
            <div className="body" key={item.id}>
                <div className="item">
                    <h1>{item.name}</h1>
                    <p>{item.quantity}</p>
                </div>
                <div className="description-box">
                    <p>{item.description}</p>
                </div>
                <div className="icons-row">
                    <div>
                        <FontAwesomeIcon className="icon" icon={faCaretLeft} onClick={handleBackClick}></FontAwesomeIcon>
                    </div>
                    <div>
                        <FontAwesomeIcon className="icon" icon={faCartShopping} onClick={handleBackClick}></FontAwesomeIcon>
                    </div>
                </div>
            </div>
        );
    }

}

export default Item;