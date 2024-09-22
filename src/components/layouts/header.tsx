'use client';

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/context/AuthContext';


const Header = () => {

    // const { logout } = useLogout();
  const {user} = useAuth()
    // const { address } = useAccount({ type: accountType });

    return (
        <div className='mt-6  mb-12 flex flex-row space-x-4 items-center justify-center'>
            <h1 className='font-bold text-xl text-[#cbceeb]'>Hello</h1>
            <div className="flex-grow"></div>
            <div className="ml-auto flex flex-row">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{ }</AvatarFallback>
                </Avatar>
                <div className='ml-2'>
                    <p className='text-sm font-semibold text-[#cbceeb]'>{user?.email}</p>
                    <span className="block xl:inline text-[#cbceeb]">{user?.address? `${(user.address).slice(0,6)}...${(user.address).slice(-4)}`: 'Wallet Address'}</span>
                    <p className='text-xs font-light'></p>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Header
