'use client'; 

import React, { useEffect, useState } from 'react'
import { JsonRpcProvider, formatEther } from 'ethers';



function CheckBalance() {
    const [addresh, setaddresh] = useState("");
    const [balance, setBalance] = useState();
    useEffect(() => {
       
          const fetchBalance = async () => {
            try {
              const provider = new JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/IPOGuds9afqWqBWux0V20UhdrVRP5mA2`);
              const walletBalance = await provider.getBalance();
              setBalance(formatEther(walletBalance));
            } catch (error) {
              console.error('Error fetching balance:', error);
            }
          };
    
          fetchBalance();
        
      }, [addresh]);
    
   


  return (
   <>
   <div className="text-2xl font-bold text-center dark:text-white ">Enter Your Wallet Addresh</div>

   <input type="text" value={addresh} className='border-2 border-b-lime-300 ' onSubmit={(e) => setaddresh(e.target.value)} />
   <div className='dark:text-white text-xl font-bold'>Your ballance is: {balance}</div>
   </>
  )
}

export default CheckBalance;