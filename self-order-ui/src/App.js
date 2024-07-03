// src/App.js
import React from 'react';
import './App.css';
import Menu from "./Menu";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Item from "./Item";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Menu/>}></Route>
                <Route path='/items' element={<Menu/>}></Route>
                <Route path='/items/:itemId' element={<Item/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
