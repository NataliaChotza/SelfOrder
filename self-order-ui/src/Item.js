import React from "react"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Item.css';

function Item(){
    const navigate = useNavigate();
    const location = useLocation();

    const { description, clickedIcon, clickedName } = location.state || {};
    const handleBackClick = () => {
    navigate(-1); // This navigates to the previous page
  };

    return (
      <body className="body">
        <div className="item">
          <h1>Item Name</h1>
          {clickedIcon && <FontAwesomeIcon icon={clickedIcon} size="3x" />}
        </div>
        <div className="description-box">
            {description && <p>{description}</p>}
        </div>
        <div>
          <button className="button-back" onClick={handleBackClick}>Go Back</button>
        </div>
        </body>
        );

}
export default Item;