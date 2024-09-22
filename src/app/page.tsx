'use client';
import { useRouter } from "next/navigation";
import Head from "next/head";
import { IoMdLogIn } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa"
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAccount, useLogout, useSignerStatus } from "@alchemy/aa-alchemy/react";
import { LogInCard } from "./app/_components/LoginCard";
import {
  accountType,
} from "@/lib/config";
import { ethers } from 'ethers';
import { useEffect, useState } from "react";
import RoleSelectModal from "@/components/modal/roles"
import { useAuth } from "@/context/AuthContext";
import { profileABI } from "@/abi/contract";


export default function Home() {
 
  const router = useRouter();
  const { logout } = useLogout();
  const {user} = useAuth();
  const { address } = useAccount({ type: accountType });
  const [showRoleSelectModal, setShowRoleSelectModal] = useState(false);

  console.log(user, "this is user")

  const { isInitializing, isAuthenticating, isConnected, status } =
    useSignerStatus();
  const isLoading =
    isInitializing || (isAuthenticating && status !== "AWAITING_EMAIL_AUTH");

  // Function to toggle the modal visibility
const toggleRoleSelectModal = () => {
  setShowRoleSelectModal(!showRoleSelectModal);
};


const getUser = async () => {

  const provider = new ethers.JsonRpcProvider('https://base-sepolia.g.alchemy.com/v2/XJjEhlbtuCP5a6aZvpacjn16Aqd9G0z1');
  const contract = new ethers.Contract("0x3578966a427236C326bCd72244de9F8456141F9B", profileABI, provider);

  try {
    console.log(user?.address)

    const userDetails = await contract.getUserByAddress(user?.address);
    console.log(userDetails)
  
    if (!userDetails || userDetails.length !== 3) {
      console.log('No valid user details found for address', user?.address);
      router.push('/');
      return;
    }

    const [ userRole ] = userDetails;

    const roleMapping: {[key:string]: number} = {
      Buyer: 0,
      Merchant: 1,
    };

    const roleNumeric = Number(userRole);
    const roleString = Object.keys(roleMapping).find(key => roleMapping[key] === roleNumeric);

    console.log(roleString)

    // Redirect based on the role
    if (roleString === 'Buyer') {
      router.push('/app/buyer/products/view'); 
    } else if (roleString === 'Merchant') {
      router.push('/app/merchant/product/dashboard'); 
    } else {
      router.push('/');
    }
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    // Handle error, e.g., show an error message
  }
};

useEffect(() => {
  getUser();
}, [user]);



  return (
    <>
      <Head>
        <title>Payflip | Home</title>
      </Head>
      <div className="mx-auto h-screen bg-[#FFF]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 after:absolute after:opacity-25 after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-transparent after:z-[-1] bg-[#555555]">
          <div>
            <div className="flex flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <p className="text-[#FFE840] text-4xl font-bold">PayFlip</p>
              </div>
            </div>
            <img src="https://static.scientificamerican.com/sciam/cache/file/3FE9ABC3-2CC3-41D8-AE636C8A1CD61909_source.jpeg?w=1200" alt="payflip" className="object-cover h-[99vh] bg-gray-100" />
          </div>
          {isLoading ?
            (
              <LoadingSpinner />
            ) : isConnected ?
              (
                <div className="relative flex items-center justify-center w-full md:w-[11/12] xl:w-[8/12] mx-auto">
                  <div className="flex flex-col">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-short text-gray-900 dark:text-white">
                      <span className="block xl:inline text-[#cbceeb]">Welcome to PayFlip</span>
                    </h1>
                    <p className="mt-3 sm:mt-5 md:mt-5 mx-auto sm:mx-0 mb-6 text-lg md:text-xl text-gray-500 leading-base">
                    Flip the script on payments: local currency in, stablecoins out with PayFlip.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center mb-4 md:mb-8 space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                      <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => toggleRoleSelectModal()}>
                      <FiUserPlus className="w-6 h-6 mr-1" />
                      Set Up Profile
                    </button>
                      <button className="bg-white text-gray-900 hover:bg-gray-300 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => logout()}>
                        <IoMdLogIn className="w-6 h-6 mr-1" />
                        Logout
                      </button>
                    </div>
                  </div>
                  {/* Avatar positioned at the top-right corner */}
                  <div className="absolute top-0 right-0 mt-4 mr-4">
                    <h1 className="flex flex-row  gap-4 text-sm leading-short text-gray-900 dark:text-white">
                      <FaUserCircle size={40} className="text-[#cbceeb]" />
                      <div className="flex flex-col">
                        <span className="block xl:inline text-[#cbceeb]">{user?.email}</span>
                        <span className="block xl:inline text-[#cbceeb]">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Wallet Address'}</span>
                      </div>
                    </h1>
                  </div>
                </div>
                // <ProfileCard />
              ) : (
                <LogInCard />
              )}
        </div>
      </div>
      {showRoleSelectModal && (
        <RoleSelectModal
          isOpen={showRoleSelectModal}
          onClose={() => setShowRoleSelectModal(false)}
        />
      )}
    </>
  );
};