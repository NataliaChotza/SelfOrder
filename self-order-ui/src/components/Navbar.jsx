import { css } from "@emotion/react";
import Buttons from "./Buttons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
const Navbar = ({ setAll, setDrinksNoAlk, setMainDish, setSweets,setAppetisers }) => {
    const breakpoints = [576, 768, 992, 1200];

    const navigate = useNavigate();
    const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

    const handleShowCart = (cartId) => {
        navigate(`/api/cart/${cartId}`)
    }

    return (
        <div
            className="Navbar"
            css={css`
        display: flex;
        justify-content: space-around;

        .logo {
          font-size: 1.8rem;
        }

        ${mq[2]} {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          place-items: center;

          .Buttons {
            grid-row: 2;
            grid-column: 1/4;
            border: none;
            box-sizing:unset;
          }

          .logo {
            grid-row: 1;
            grid-column: 1/4;
            position: relative;
            bottom: 10px;
            font-size: 3rem;
          }
          .cart-icon {
            margin-left: 90%;
          }

          .dwu {
            grid-row: 1;
            position: relative;
            top: 20px;
            font-weight: 400;
            font-size: 1.3rem;
          }
        }
      `}
        >
            <h3 className="logo">Self Order</h3>
            <Buttons
                className="Buttons"
                setAll={setAll}
                setDrinksNoAlk={setDrinksNoAlk}
                setMainDish={setMainDish}
                setAppetisers={setAppetisers}
                setSweets={setSweets}
            />
            <FontAwesomeIcon className="dwu cart-icon" icon={faCartShopping} onClick={()=>handleShowCart("cart1")}></FontAwesomeIcon>
        </div>
    );
};

export default Navbar;