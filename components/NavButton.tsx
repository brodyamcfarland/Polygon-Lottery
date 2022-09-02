import React from 'react';

interface Props {
    title: string;
    isActive?: Boolean;
}

const NavButton = ({ title, isActive }: Props) => {
  return (
    <button
        className={`${
            isActive && "bg-[#72144d]"} hover:bg-[#72144d] text-white py-2 px-2 rounded-lg shadow-md font-bold`}
    >{title}</button>
  )
}

export default NavButton;