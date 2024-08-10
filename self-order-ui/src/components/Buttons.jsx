import {css} from "@emotion/react";

const Buttons = ({setAll, setDrinksNoAlk, setMainDish, setSweets, setAppetisers}) => {
    const breakpoints = [576, 768, 992, 1200];

    const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

    return (
        <div
            className="Buttons"
            css={css`
              display: flex;

              button {
                margin: 0 2rem;
                padding: 10px;
                cursor: pointer;
                border: none;
                box-sizing:unset;
                

                ${mq[2]} {
                  margin: 0 1rem;
                }

                ${mq[0]} {
                  margin: 0;
                  margin-top: 2rem;
                }

                &::after {
                  content: "";
                  display: block;
                  height: 2px;
                  width: 0;
                  transition: width 0.3s ease-in;
                }

                &:hover::after {
                  width: 100%;
                }

                span {
                  padding: 0 5px;
                  font-family: "Poppins", sans-serif;
                  font-weight: 600;
                  font-size: 1rem;
                  margin: auto;

                  ${mq[2]} {
                    padding: 0;
                  }

                  ${mq[0]} {
                    font-size: 0.9rem;
                  }
                }
              }
            `}
        >
            <button
                onClick={() => {
                    setAll(true);
                    setDrinksNoAlk(false);
                    setMainDish(false);
                    setSweets(false);
                    setAppetisers(false)
                }}
            >
                <span>All</span>
            </button>

            <button
                onClick={() => {
                    setAll(false);
                    setDrinksNoAlk(true);
                    setMainDish(false);
                    setSweets(false);
                    setAppetisers(false)
                }}
            >
                <span>No Alcohol drinks</span>
            </button>

            <button
                onClick={() => {
                    setMainDish(true);
                    setAll(false);
                    setDrinksNoAlk(false);
                    setSweets(false);
                    setAppetisers(false)
                }}
            >
                <span>Main Dishes</span>
            </button>
            <button
                onClick={() => {
                    setSweets(false);
                    setAll(false);
                    setMainDish(false);
                    setDrinksNoAlk(false);
                    setAppetisers(true)
                }}
            >
                <span>Appetisers</span>
            </button>
            <button
                onClick={() => {
                    setSweets(false);
                    setAll(false);
                    setMainDish(false);
                    setDrinksNoAlk(false);
                    setAppetisers(false)
                }}
            >
                <span>Sweets</span>
            </button>


        </div>
    );
};

export default Buttons;