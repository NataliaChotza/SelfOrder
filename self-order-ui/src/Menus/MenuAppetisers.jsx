import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import item from "../Item";
import Item from "../Item";

const MenuAppetisers = ({ appetisers, items }) => {
const itemContainer = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};
const navigate = useNavigate();
const handleItemClick = (itemId) => {
    return(<Item item={itemId} items={items}></Item>);
}

return (
    <>
        {appetisers &&
            items
                .filter((item) => item.category === "APPETISER")
                .map((item, i) => (
                <motion.div
                    className="menu-items"
                    key={item.id}
                    onClick={handleItemClick(item.id)}
                    variants={itemContainer}
                    transition={{ delay: i * 0.2 }}
                >
                    <motion.div className="item-content">
                        <motion.div className="item-title-box">
                            <motion.h5 className="item-title">{item.name} <br/> {item.price} {item.currency} </motion.h5>
                            <FontAwesomeIcon className="cart-icon" icon={faCartPlus}></FontAwesomeIcon>
                        </motion.div>
                        <motion.p className="item-desc">{item.desc}</motion.p>
                    </motion.div>
                </motion.div>
            ))}
    </>
);
};
export default MenuAppetisers;