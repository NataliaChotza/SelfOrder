// src/App.js
import React, {Component} from 'react';
import Menu from './Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Item from "./Item";

class App extends Component{
    render() {
       return(
           <div className="App">
            <Menu>
            </Menu>

        </div>);
    }
}

export default App;
