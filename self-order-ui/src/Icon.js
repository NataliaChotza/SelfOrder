// src/Icon.js
import React from 'react';

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
