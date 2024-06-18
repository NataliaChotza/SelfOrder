import React, {useEffect, useState} from "react"
import { useNavigate } from 'react-router-dom';
import './Item.css';
import axios from "axios";

function Item(){
    const navigate = useNavigate();
    const [item, setItem] = useState([]);
    useEffect(() => {
        axios.get(`/api/items/${item.id}`)
            .then(response => {
                console.log('Data fetched:', response.data);  // Debugging log
                setItem(response.data);
            })
            .catch(error => {
                console.error('Error while getting item', error);
            });
    }, []);
    const handleBackClick = () => {
    navigate(-1); // This navigates to the previous page
  };

    return (
      <body className="body">
        <div className="item">
          <h1>Item Name</h1>
            {item.name && <p>{item.name}</p>}
        </div>
        <div className="description-box">
            {item.description && <p>{item.description}</p>}
        </div>
        <div>
          <button className="button-back" onClick={handleBackClick}>Go Back</button>
        </div>
        </body>
        );

}
export default Item;