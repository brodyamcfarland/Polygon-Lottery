import PropagateLoader from 'react-spinners/PropagateLoader';

const Loading = () => {

    const testImage = '/polygon.png'

  return (
    <div className='bg-[#5a264a] h-screen flex flex-col items-center justify-center select-none'>
        <div className='flex items-center space-x-2 mb-5'>
            <img className='border-4 border-black shadow-lg rounded-full bg-[#00000063] h-56 w-56 mb-10' src={testImage}/>
            <h1 className='text-xl text-white font-bold'>Connecting to Smart Contract ...</h1>
        </div>
        <PropagateLoader color='white' size={25}/>
    </div>
  )
}

export default Loading