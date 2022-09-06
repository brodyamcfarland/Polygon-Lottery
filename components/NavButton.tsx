import React from 'react';

interface Props {
    title: string;
    isActive?: Boolean;
    onClick?: () => void;
}

const NavButton = ({ title, isActive, onClick }: Props) => {
  return (
    <button
        onClick={onClick}
        className={`${
            isActive && "bg-[#72144d]"} hover:bg-[#72144d] text-white py-2 px-2 rounded-lg shadow-md font-bold`}
    >{title}</button>
  )
}

export default NavButton;