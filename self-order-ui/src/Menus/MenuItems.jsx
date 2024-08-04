/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import {motion} from "framer-motion";

import AllItems from "./MenuAll";
import DrinksNoAlk from "./MenuDrinksNoAlk";
import MainDish from "./MenuMainDish";
import MenuAppetisers from "./MenuAppetisers";
import MenuSweets from "./MenuSweets";

const MenuItems = ({items, all, drinksNoAlk, mainDish, sweets, appetisers}) => {
    const container = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
        },
    };

    const breakpoints = [576, 768, 992, 1200];

    const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

    return (
        <motion.div
            className="menu-item container"
            variants={container}
            initial="hidden"
            animate="visible"
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;

              ${mq[2]} {
                grid-template-columns: 1fr;
              }

              margin-top: 30px;
              padding: 40px 20px;
              background: #F9E0D9;
              border-radius: 50px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              transition: transform 0.3s, box-shadow 0.3s;
              justify-content: space-between;
              
              .menu-item {
                padding: 1rem 1.5rem;
                display: flex;
                border-top: none;
                cursor: pointer;
                

                ${mq[0]} {
                  display: grid;

                  img {
                    margin-bottom: 10px;
                  }
                }

                &:last-child {
                  border-bottom: none;
                }


                .item-content {
                  display: grid;
                  padding: 0 1rem;
                  
                  p {
                    font-size: 0.8rem;

                    ${mq[(0, 1)]} {
                      font-size: 0.7rem;
                    }
                  }

                  .item-title-box {
                    display: flex;
                    justify-content: space-between;
                    justify-content: center;
                    
                    .item-price {
                      font-size: 1rem;

                      ${mq[(0, 1)]} {
                        font-size: 0.8rem;
                      }
                    }
                  }
                }
              }

              img {
                height: 85px;

                ${mq[(0, 1)]} {
                  height: 75px;
                }

                cursor: pointer;
              }
            `}
        >
            <AllItems all={all} items={items}/>
            <DrinksNoAlk drinksNoAlk={drinksNoAlk} items={items}/>
            <MainDish mainDish={mainDish} items={items}/>
            <MenuAppetisers appetisers={appetisers} items={items}/>
            <MenuSweets sweets={sweets} items={items}/>

        </motion.div>
    );
};

export default MenuItems;