'use client';

import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';
import Moralis from 'moralis';
import { EvmChain } from "@moralisweb3/common-evm-utils";

const Dashboard = () => {
  const { user } = useAuth();
  const [balances, setBalances] = useState<Array<any>>([]);
  // const [balances, setBalances] = useState([]);

  useEffect(() => {
    const initializeMoralis = async () => {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: "P1ZvrguGccwivEz7eObhSySzgrVUptRqaZoNigQy7XRwKUoHewAMTA7B37k4P3Rk",
        });
      }
    };

    initializeMoralis();
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      if (user?.address) {
      console.log(user?.address)
        try {
          const address = user.address;
          const chain = EvmChain.BASE_SEPOLIA;

          const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain
          });

          const formattedBalances = response.toJSON().map((token) => ({
            ...token,
            formatted_balance: (parseInt(token.balance) / Math.pow(10, token.decimals)).toFixed(token.decimals)
          }));

          setBalances(formattedBalances);
      console.log(user?.address)

          console.log(formattedBalances);
        } catch (error) {
          console.error("Error fetching balances:", error);
        }
      }
    };

    getBalance();
  }, [user]);

  return (
    <div>
      <h2 className='font-bold text-xl text-[#cbceeb]'>Token Balances:</h2>
      <ul>
        {balances.map((token, index) => (
          <li key={index} className='font-bold text-xl text-[#cbceeb]'>
            {token.symbol}: {token.formatted_balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;