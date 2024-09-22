'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import React, { FormEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InferType, object, string } from "yup";
import { ethers } from 'ethers';
import { useSendUserOperation, useSignMessage, useSmartAccountClient } from "@alchemy/aa-alchemy/react";
import { encodeFunctionData } from 'viem';
import {
    chain,
    accountType,
    gasManagerConfig,
    accountClientOptions as opts,
} from "@/lib/config";
import toast from "react-hot-toast";
import { Controller } from 'react-hook-form';
import { useChain } from "@alchemy/aa-alchemy/react";
import { profileABI } from "@/abi/contract";
import { useRouter } from 'next/navigation';



// Define the schema for personal details validation
const personalDetailsSchema = object({
    name: string().required('Name is required'),
    phone: string().matches(/^[0-9]+$/, 'Phone number must only contain numbers').required('Phone number is required'),
}).required();

interface RoleProps {
    role: "Buyer" | "Merchant";
}

const PersonalDetails = ({ role }: RoleProps) => {
    const { chain, setChain } = useChain();
    const formMethods = useForm({ resolver: yupResolver(personalDetailsSchema) });
    const { handleSubmit, reset, control } = formMethods;
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    // Initialize the Smart Account Client
    const { client } = useSmartAccountClient({
        type: "MultiOwnerModularAccount",
        gasManagerConfig,
        opts,
    });

    const {
        sendUserOperation,
        sendUserOperationResult,
        isSendingUserOperation,
        error: isSendUserOperationError,
    } = useSendUserOperation({ client, waitForTxn: true });



    const onSubmit = async (data: InferType<typeof personalDetailsSchema>) => {
        const id = toast.loading("Creating account...");

        try {
            setLoading(true);

            const roleMapping = {
                Buyer: 0,
                Merchant: 1,
            };

            //@ts-ignore
            const numericRole = roleMapping[role];

            const uoCallData = encodeFunctionData({
                abi: profileABI,
                functionName: 'createUser',
                args: [data.name, numericRole]
            });

            console.log(uoCallData)
            const contractAddress = process.env.CONTRACT_ADDRESS!;

            const uoResponse = await sendUserOperation({
                uo: {
                    target: '0x6Bf0fcAD09AD26F59b53095F1bF605e417e5eb79',
                    data: uoCallData,
                }
            }, {
                onSuccess: ({ hash }) => {
                    toast.success("Account Created")
                    console.log(hash);
                    router.push("/app/merchant/product/dashboard");

                },
                onError: (error) => {
                    toast.error("Failed to Created Account",)
                    console.error(error);
                },
            });

        } catch (error) {
            console.error("Detailed Error", error)
        } finally {
            setLoading(false)
            toast.dismiss(id)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-[#FFFFFF] border rounded-xl w-full lg:w-1/2 space-y-4 p-8 flex items-center justify-center ">
                <div className="px-1 pt-8 flex flex-col items-center justify-center ">
                    <FormProvider {...formMethods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full max-w-xs">
                            <div className="text-[18px] font-semibold mb-4">
                                Create Account
                            </div>
                            <div className="flex flex-col justify-between gap-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={user?.email}
                                    readOnly
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />

                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            placeholder="Enter your Name"
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="phone"
                                    render={({ field }) => (
                                        <Input
                                            type="tel"
                                            placeholder="Enter your PhoneNumber"
                                            {...field}
                                        />
                                    )}
                                />

                                <Button type="submit" disabled={isSendingUserOperation}>
                                    {isSendingUserOperation ? "Creating..." : "Create Account"}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>

    );
};

export default PersonalDetails;
