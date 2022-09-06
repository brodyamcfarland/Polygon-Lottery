import { useMetamask } from '@thirdweb-dev/react';
const testImage = '/polygon.png'

const Login = () => {

    const connectWithMetamask = useMetamask();

  return (
    <div className="bg-[#2f1427] min-h-screen flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center mb-10">
            <img className='border-4 border-black shadow-lg rounded-full bg-[#00000063] h-56 w-56 mb-10' src={testImage}/>
            <h1 className="text-3xl text-white font-bold mb-1">Polygon Lottery</h1>
            <h2 className="text-gray-400">Please login by connecting to your wallet to continue. </h2>
        </div>
        <button 
            onClick={connectWithMetamask}
            className='text-white px-2 py-1 bg-[#910be4] rounded-md opacity-70 hover:opacity-100 duration-500 shadow-xl'>
            Login with MetaMask
        </button>
    </div>
  )
}

export default Login