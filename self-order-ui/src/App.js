// src/App.js
import React from 'react';
import Menu from "./Menu";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Item from "./Item";
import Cart from "./Cart";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Menu/>}></Route>
                <Route path='/items' element={<Menu/>}></Route>
                <Route path='/items/:itemId' element={<Item/>}></Route>
                <Route path='/cart/:cartId' element={<Cart/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
