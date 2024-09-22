'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object, string } from "yup";
import { useSendUserOperation, useSmartAccountClient } from "@alchemy/aa-alchemy/react";
import { encodeFunctionData } from 'viem';
import {
    gasManagerConfig,
    accountClientOptions as opts,
} from "@/lib/config";
import toast from "react-hot-toast";
import { Controller } from 'react-hook-form';
import { profileABI } from "@/abi/contract";
import { useRouter } from 'next/navigation';
import { useState } from 'react';


// Define the schema for personal details validation
const personalDetailsSchema = object({
    productName: string().required('Name is required'),
    description: string().required(),
    price: string().required(),
    imageUrl: string().required(),

}).required();



const AddProduct = () => {
    const formMethods = useForm({ resolver: yupResolver(personalDetailsSchema) });
    const { handleSubmit, control } = formMethods;
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
        isSendingUserOperation,
    } = useSendUserOperation({ client, waitForTxn: true });



    const onSubmit = async (data: InferType<typeof personalDetailsSchema>) => {
        const id = toast.loading("Creating account...");

        try {
            setLoading(true);

            const uoCallData = encodeFunctionData({
                abi: profileABI,
                functionName: 'addProduct',
                args: [data.productName, data.description, data.imageUrl, data.price ]
            });

            console.log(uoCallData)

            const uoResponse = await sendUserOperation({
                uo: {
                    target: '0x3578966a427236C326bCd72244de9F8456141F9B',
                    data: uoCallData,
                }
            }, {
                onSuccess: ({ hash }) => {
                    toast.success("Product Added")
                    console.log(hash);
                console.log(uoResponse)
                    router.push("/app/merchant/product/view");

                },
                onError: (error) => {
                    toast.error("Failed to Add Product",)
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
                                Add Product
                            </div>
                            <div className="flex flex-col justify-between gap-6">
                                

                                <Controller
                                    control={control}
                                    name="productName"
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            placeholder="product Name"
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            placeholder="Short Descrption ..."
                                            {...field}
                                        />
                                    )}
                                />
                                 <Controller
                                    control={control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            placeholder="Image"
                                            {...field}
                                        />
                                    )}
                                />
                                 <Controller
                                    control={control}
                                    name="price"
                                    render={({ field }) => (
                                        <Input
                                            type="num"
                                            placeholder="price"
                                            {...field}
                                        />
                                    )}
                                />

                                <Button type="submit" disabled={isSendingUserOperation}>
                                    {loading && isSendingUserOperation ? "Adding..." : "Add Product"}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>

    );
};

export default AddProduct;
