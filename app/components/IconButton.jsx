import React from 'react';

const IconButton = ({ onClick, icon }) => {
  return (
    <button className={`border text-gray-500 hover:text-white hover:bg-gray-500 py-2 px-4 rounded`} onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;
