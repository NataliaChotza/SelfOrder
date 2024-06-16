// src/Icon.js
import React from 'react';
import { useItemProvider } from './ItemProvider';

function Icon({ iconData }) {
  const { setClickedIcon } = useItemProvider();

  const handleClick = () => {
    setClickedIcon(iconData);
  };

  return (
    <div onClick={handleClick}>

    </div>
  );
}

export default Icon;
