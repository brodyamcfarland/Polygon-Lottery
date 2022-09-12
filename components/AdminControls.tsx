import React from 'react'
import { CheckCircleIcon, CurrencyDollarIcon, ArrowPathIcon, ArrowUturnDownIcon, StarIcon } from "@heroicons/react/24/solid";
import { useContract, useContractData, useContractCall } from '@thirdweb-dev/react';
import { currency } from '../constants';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

const AdminControls = () => {

    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS);
    const { data: totalCommission } = useContractData(contract, "operatorTotalCommission");
    const { mutateAsync: drawWinnerTicket } = useContractCall(contract, "DrawWinnerTicket");
    const { mutateAsync: refundAll } = useContractCall(contract, "RefundAll");
    const { mutateAsync: restartDraw } = useContractCall(contract, "restartDraw");
    const { mutateAsync: withdrawCommission } = useContractCall(contract, "WithdrawCommission");

    const chooseWinner = async () => {
        const notification = toast.loading("Choosing A Winner...");
        try {
            const data = await drawWinnerTicket([{}]);
            toast.success("A Winner has been chosen!", { id: notification });
            console.info("Contract call success!");            
        } catch (error) {
            toast.error("Something went wrong!", {id: notification});
            console.error("Contract call failed", error);
        }
    }

    const adminCashOut = async () => {
        const notification = toast.loading("Withdrawing Commission...");
        try {
            const data = await withdrawCommission([{}]);
            toast.success("Commission has been withdrawn successfully!", { id: notification });
            console.info("Contract call success!");            
        } catch (error) {
            toast.error("Something went wrong!", {id: notification});
            console.error("Contract call failed", error);
        }
    }

    const refund = async () => {
        const notification = toast.loading("Refunding All Participants...");
        try {
            const data = await refundAll([{}]);
            toast.success("All Participants are now refunded!", { id: notification });
            console.info("Contract call success!");            
        } catch (error) {
            toast.error("Something went wrong!", {id: notification});
            console.error("Contract call failed", error);
        }
    }

    const restartLottery = async () => {
        const notification = toast.loading("Restarting Lottery");
        try {
            const data = await restartDraw([{}]);
            toast.success("Lottery restarted successfully!", { id: notification });
            console.info("Contract call success!");            
        } catch (error) {
            toast.error("Something went wrong!", {id: notification});
            console.error("Contract call failed", error);
        }
    }
    
  return (
    <div className='text-white text-center px-5 py-3 rounded-md border border-[#c555a3] bg-gradient-to-tl from-[#32093abe] to-[#772d94c5] shadow-lg'>
        <h2 className='font-bold'>Admin Controls</h2>
        <p className='mb-5'>Total Commission Accumulated: {totalCommission && ethers.utils.formatEther(totalCommission.toString())}{" "}{currency}</p>
        <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
            <button onClick={chooseWinner} className='admin-button'><StarIcon className='h-6 mx-auto mb-2'/> Choose Winner</button>
            <button onClick={adminCashOut} className='admin-button'><CurrencyDollarIcon className='h-6 mx-auto mb-2'/> Withdraw Commission</button>
            <button onClick={restartLottery} className='admin-button'><ArrowPathIcon className='h-6 mx-auto mb-2'/> Restart Lottery</button>
            <button onClick={refund} className='admin-button'><ArrowUturnDownIcon className='h-6 mx-auto mb-2'/>Refund All</button>
        </div>
    </div>
  )
}

export default AdminControls