import NavButton from "./NavButton";
import { Bars3Icon } from '@heroicons/react/24/solid';

const testImage = '/polygon.png'

const Header = () => {
  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
        <div className="flex items-center space-x-2">
            <img
                className="rounded-full h-10 w-10"
                src={testImage}
                alt='avatar'
            />
            <div>
                <h1 className="text-lg text-white font-bold">Way2Icy</h1>
                <p>0x1732687346234</p>
            </div>
        </div>
        <div className="hidden md:flex md:col-span-3 items-center justify-center rounded-lg">
            <div className="bg-[#451536] p-2 space-x-2 shadow-lg">
                <NavButton isActive title='Enter Lottery'/>
                <NavButton title='Logout'/>
            </div>
        </div>
        <div className="flex flex-col ml-auto text-right">
            <Bars3Icon className="h-8 w-8 m-auto text-white cursor-pointer"/>
            <span className="md:hidden">
                <NavButton title='Logout' />
            </span>
        </div>
        
    </header>
  )
}

export default Header