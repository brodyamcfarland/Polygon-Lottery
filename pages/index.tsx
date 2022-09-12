import { useAddress, useContract, useContractData, useContractCall } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Login from '../components/Login';
import Loading from '../components/Loading';
import AdminControls from '../components/AdminControls';
import { ethers } from "ethers";
import { currency } from '../constants';
import CountdownTimer from '../components/CountdownTimer';
import toast from 'react-hot-toast';
import Marquee from 'react-fast-marquee';

const Home: NextPage = () => {
  const testImage = '/polygon.png'
  const address = useAddress();
  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS);
  const [quantity, setQuantity] = useState<number>(1);
  const [userTickets, setUserTickets] = useState<number>(0);

  const { data: remainingTickets } = useContractData(contract, "RemainingTickets");
  const { data: CurrentWinningReward } = useContractData(contract, "CurrentWinningReward");
  const { data: ticketPrice } = useContractData(contract, "ticketPrice");
  const { data: ticketCommission } = useContractData(contract, "ticketCommission");
  const { data: expiration } = useContractData(contract, "expiration");
  const { mutateAsync: BuyTickets } = useContractCall(contract, "BuyTickets");
  const { data: tickets } = useContractData(contract, "getTickets");
  const { data: winnings } = useContractData(contract, "getWinningsForAddress", address);
  const { mutateAsync: WithdrawWinnings } = useContractCall(contract, "WithdrawWinnings");
  const { data: lastWinner } = useContractData(contract, "lastWinner");
  const { data: lastWinnerAmount } = useContractData(contract, "lastWinnerAmount");
  const { data: isLotteryOperator } = useContractData(contract, "lotteryOperator");


  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;
    const numberOfTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),0);
    setUserTickets(numberOfTickets);
  }, [tickets, address]);
  

  const handleClick = async () => {
    if (!ticketPrice) return;
    const notification = toast.loading("Purchasing tickets...");
    try {
      const data = await BuyTickets([{
        value: ethers.utils.parseEther(
          (Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString())
      }]);

      toast.success("Successfully Purchased Tickets!", { id: notification });
      console.info("Contract call success!");
    } catch (error) {
      toast.error("Something went wrong!", {id: notification});
      console.error("Contract call failed", error);
    }
  }

  const withdrawWinnings = async () => {
    const notification = toast.loading("Collecting winnings...");
    try {
      const data = await WithdrawWinnings([{}]);
      toast.success("Winnings Successfully Collected!", { id: notification });
    } catch (error) {
      toast.error("Something went wrong!", {id: notification});
      console.error("Contract call failed", error);
    }
  }

  if (isLoading) return (<Loading/>);

  if (!address) return (<Login/>);

  return (
    <div className="flex flex-col bg-[#5a264a] min-h-screen">
      <Head>
        <title>Polygon Lottery</title>
      </Head>
      <div className='flex-1'>
        <Header />
        <Marquee className='bg-[#00000086] p-2 mb-5 shadow-inner text-sm' gradient={false} speed={90}>
          <div className='flex space-x-2 mx-19'>
            <h4 className='text-white font-bold'>Last Winner: {lastWinner?.toString()}</h4>
            <h4 className='text-white font-bold'>Winnings: {lastWinnerAmount && ethers.utils.formatEther(lastWinnerAmount.toString())}{" "}{currency}</h4>
          </div>
        </Marquee>

        {isLotteryOperator === address && (
          <div className='flex justify-center'>
            <AdminControls/>
          </div>
        )}

        {winnings > 0 && (
          <div className='text-white max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5'>
            <button onClick={withdrawWinnings} className='p-5 bg-gradient-to-tl from-purple-900 to-[#8f3d76] animate-pulse text-center rounded-lg w-full shadow-lg'>
              <p className='font-bold'>Winner!</p>
              <p>Total Winnings: {ethers.utils.formatEther(winnings.toString())}{" "}{currency}</p>
              <br/>
              <p className='font-semibold'>Click Here to Collect Winnings</p>
            </button>
          </div>
        )}

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
              <button 
                onClick={handleClick}
                disabled={expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0}
                className='mt-5 py-3 w-full bg-gradient-to-tr from-purple-900 to-[#c555a3] rounded-md text-white shadow-xl disabled:from-gray-500 disabled:to-gray-500 disabled:shadow-inner hover:from-[#c555a3] hover:to-purple-900 duration-500 disabled:opacity-50 disabled:cursor-not-allowed opacity-80 hover:opacity-100'
                > Buy {quantity} Tickets for {ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity}{' '}{currency}
              </button>
            </div>
            {userTickets > 0 && (
              <div className='stats'>
                <p className='text-sm mb-2'>You have {userTickets} Ticket(s) in this round.</p>
                <div className='flex max-w-sm flex-wrap gap-2'>
                  {Array(userTickets)
                    .fill('')
                    .map((_, index) => (
                    <p className='text-yellow-300 h-20 w-12 bg-[#00000060] flex flex-shrink-0 items-center justify-center text-xs italic border border-[#c555a3] rounded-md mt-3' key={index}>{index + 1}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className='border-t border-[#c555a3] flex items-center text-white justify-between p-5'>
        <img className='h-10 w-10 filter hue-rotate-90 opacity-40 rounded-full border-2 border-purple-900' src={testImage} />
        <p className='text-xs text-[#c555a3] pl-5 text-center'>DISCLAIMER: This dapp is created on the Polygon Mumbai Test Network. Make sure you have the Mumbai Network Added to your wallet provider. Dev is not responsible for any real cryptocurrency losses. Test MATIC can be obtained by providing your wallet address to a Mumbai faucet. <a className='text-red-300' href="https://mumbaifaucet.com/">https://mumbaifaucet.com/</a></p>

      </footer>
    </div>
  )
}

export default Home;
