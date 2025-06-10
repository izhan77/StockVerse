import React from "react";

const NavButton = ({ name }) => {
  return (
    <button
      className="relative border border-gray-500 px-6 py-2 overflow-hidden rounded-full cursor-pointer font-bold tracking-tight text-gray-700 transition-all duration-300 ease-in-out after:content-[''] after:absolute after:w-full after:h-full after:bg-black after:transition-all
      after:duration-300
      after:ease-in-out after:left-0 after:bottom-[-100%] after:rounded-full  hover:after:bottom-0 hover:after:rounded-none  hover:text-white "
    >
      <span className="relative z-10">{name}</span>
    </button>
  );
};

export default NavButton;
