
import React, { createContext, useContext, useState } from 'react';
const IconProvider = createContext();

export function useItemProvider() {
  return useContext(IconProvider);
}

export function ItemProvider({ children }) {
  const [clickedIcon, setClickedIcon] = useState(null);

  return (
    <IconProvider.Provider value={{clickedIcon,setClickedIcon}}>
      {children}
    </IconProvider.Provider>
  );
}