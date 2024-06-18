// src/App.js
import React, {useEffect, useState} from 'react';
import './App.css';
import Menu from "./Menu";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Item from "./Item";
//fix rutes
const App =()=> {
    return(
            <Routes>
                <Route path="/api/items" element={<Menu/>} />
                <Route path="/api/items/:itemId" element={<Item/>}/>
            </Routes>

        )
}

export default App;
