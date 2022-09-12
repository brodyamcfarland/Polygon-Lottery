import NavButton from "./NavButton";
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
const testImage = '/polygon.png'

const Header = () => {
    const address = useAddress();
    const disconnect = useDisconnect();

  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
        <div className="flex items-center space-x-2 bg-[#0000004b] p-1 pl-3 rounded-md shadow-md">
            <img
                className="rounded-full h-10 w-10"
                src={testImage}
                alt='avatar'
            />
            <div>
                <h1 className="text-lg text-white font-bold">Way2Icy</h1>
                <p className="text-gray-300">Wallet: {address?.substring(0,5)}...{address?.substring(address.length, address.length - 5)}</p>
            </div>
        </div>
        <div className="hidden md:flex md:col-span-3 items-center justify-center rounded-lg">
            <div className="bg-[#451536] p-2 space-x-2 shadow-lg rounded-md">
                <NavButton isActive title='Enter Lottery'/>
                <NavButton onClick={disconnect} title='Logout'/>
            </div>
        </div>
        <div className="flex flex-col ml-auto text-right">
            <Bars3Icon className="h-8 w-8 m-auto text-white cursor-pointer"/>
            <span className="md:hidden">
                <NavButton onClick={disconnect} title='Logout' />
            </span>
        </div>
        
    </header>
  )
}

export default Header