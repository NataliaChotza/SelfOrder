// src/Menu.js
import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faHamburger, faIceCream, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useItemProvider } from './ItemProvider';
import './Menu.css';
import Item from "./Item";
class Menu extends Component{
    state ={
        items:[]
    }
    async componentDidMount(){
        const response  = await fetch('/items')
        const body = await response.json();
        this.setState({items:body});
    }
    render(){
        const {items} = this.state;
        return(
            <body className="body">
            <div className="menu">
                <h1>Restaurant Menu</h1>
                <div className="menu-items">
                    {items.map(item=>
                        <Item>
                        <div key={item.id}>
                            <p>{item.name}</p>
                        </div>
                        </Item>)
                        }

                </div>
            </div>
            </body>
        )
    }
}

export default Menu;
