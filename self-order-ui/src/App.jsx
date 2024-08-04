
import React from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Item from "./Item";
import Cart from "./Cart";
import Menu from "./Menu";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/api/items' element={<Menu/>}></Route>
                <Route path='/api/items/:itemId' element={<Item/>}></Route>
                <Route path='/api/cart/:cartId' element={<Cart/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
