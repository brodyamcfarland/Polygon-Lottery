import { useAddress, useContract, useContractData } from '@thirdweb-dev/react';
import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Login from '../components/Login';
import Loading from '../components/Loading';
import { ethers } from "ethers";
import { currency } from '../constants';
import CountdownTimer from '../components/CountdownTimer';

const Home: NextPage = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS);
  const [quantity, setQuantity] = useState<number>(1);

  const { data: remainingTickets } = useContractData(contract, "RemainingTickets");
  const { data: CurrentWinningReward } = useContractData(contract, "CurrentWinningReward");
  const { data: ticketPrice } = useContractData(contract, "ticketPrice");
  const { data: ticketCommission } = useContractData(contract, "ticketCommission");
  const { data: expiration } = useContractData(contract, "expiration");

  if (isLoading) return (<Loading/>);

  if (!address) return (<Login/>);

  return (
    <div className="flex flex-col bg-[#5a264a] min-h-screen">
      <Head>
        <title>Polygon Lottery</title>
      </Head>
      <div className='flex-1'>
        <Header />

        <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5'>
          <div className='stats-container'>
            <h1 className='text-3xl text-white font-semibold text-center'>Upcoming Draw</h1>
            <div className='flex justify-between p-2 space-x-2'>
              <div className='stats'>
                <h2 className='text-sm'>Total Pool</h2>
                <p className='text-xl'>{CurrentWinningReward && ethers.utils.formatEther(CurrentWinningReward.toString())}{" "}{currency}</p>
              </div>
              <div className='stats'>
                <h2 className='text-sm'>Tickets Remaining</h2>
                <p className='text-xl'>{remainingTickets?.toNumber()}</p>
              </div>
            </div>
            <div className='mt-5 mb-3'>
              <CountdownTimer/>
            </div>

          </div>
          <div className='stats-container space-y-2'>
            <div className="stats-container bg-[#00000040]">
              <div className='flex justify-between items-center text-white pb-2'>
                <h2>Price Per Ticket</h2>
                <p>{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())}{" "}{currency}</p>
              </div>
              <div className='flex text-white items-center space-x-2 bg-[#00000056] border-[#a54688] rounded-md border-2 p-4'>
                <p>Quantity</p>
                <input className='flex w-full bg-transparent text-right outline-none' type="number" min={1} max={10} value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
              </div>
              <div className='space-y-2 mt-5'>
                <div className='flex items-center justify-between text-[#c555a3] text-sm italic font-bold'>
                  <p>Total Cost</p>
                  <p>{ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity}{" "}{currency}</p>
                </div>
                <div className='flex items-center justify-between text-[#c555a3] text-sm italic '>
                  <p>Service Fees</p>
                  <p>{ticketCommission && ethers.utils.formatEther(ticketCommission.toString())}{" "}{currency}</p>
                </div>
                <div className='flex items-center justify-between text-[#c555a3] text-sm italic '>
                  <p>+ Network Fees</p>
                  <p>TBD</p>
                </div>
              </div>
              <button disabled={expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0} className='mt-5 py-3 w-full bg-gradient-to-tr from-purple-900 to-[#c555a3] rounded-md text-white shadow-xl disabled:from-gray-500 disabled:to-gray-500 disabled:shadow-inner hover:from-[#c555a3] hover:to-purple-900 duration-500 disabled:opacity-50 disabled:cursor-not-allowed opacity-80 hover:opacity-100'>Buy Tickets</button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  )
}

export default Home;
