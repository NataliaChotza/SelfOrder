import { motion } from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const MenuMainDish = ({ mainDish, items }) => {
    const itemContainer = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };
    const navigate = useNavigate();
    const handleItemClick = (itemId) => {
        navigate(`/api/items/${itemId}`)
    }
    const handleCartClick = (itemId) => {
        const cartId = "cart1";//do zmiany
        axios.post(`http://localhost:8080/api/cart/${cartId}/${itemId}`)
            .then(response => console.log('Item saved to cart', itemId))
            .catch(error => {
                console.error('Error while saving item to cart', error)
            });
    }

    return (
        <>
            {mainDish &&
                items
                    .filter((item) => item.category === "MAIN_DISH")
                    .map((item, i) => (
                        <motion.div
                            className="menu-items"
                            key={item.id}
                            variants={itemContainer}
                            transition={{delay: i * 0.2}}
                        >
                            <motion.div className="item-content">
                                <motion.div className="item-title-box">
                                    <motion.h5 className="item-title" onClick={() => handleItemClick(item.id)}>{item.name}{item.price} {item.currency} </motion.h5>
                                    <motion.div onClick={() => handleCartClick(item.id)}>
                                        <FontAwesomeIcon className="cart-icon" icon={faCartPlus}></FontAwesomeIcon>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
        </>
    );
};

export default MenuMainDish;