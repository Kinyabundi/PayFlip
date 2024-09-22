'use client'

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Currency, Loader2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { API_URL, API_KEY, WALLET_ID } from '@/env';

interface RoleSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    merchantAddress: string;
}

const Pay: React.FC<RoleSelectModalProps> = ({ isOpen, onClose, merchantAddress }) => {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [currency, setCurrency] = useState<string>('');

    if (!isOpen) return null;


    const router = useRouter();

    const reset = () => {
        setName('')
        setPhone('')
        setAmount(0)
    }


    const sendToMerchantWallet = async () => {
        try {
            const response = await fetch(`${API_URL}/onramp/fiat-to-crypto/wallet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    source_wallet: "65245a75f38cafb8ea703883",
                    receivers_address: merchantAddress,
                    amount: amount/130,
                    chain: "BASE",
                    token: "USDC"
                })
            });
            console.log(response)
            if (!response.ok) {
                const responseBody = await response.json();
                console.error('Server error:', responseBody);
                toast.error(responseBody.message || 'Failed to submit');
                return;
            }
            toast.success("Payment transferred to merchant successfully");
        } catch (error) {
            console.error('Error while transferring to merchant', error);
            toast.error("Failed to transfer payment to merchant. Please contact support.");
        }
    }

    const onSubmit = async () => {
        setLoading(true);
        console.log(API_URL)

        try {
            const response = await fetch('https://sandbox-api.kotanipay.io/api/v3/deposit/bank/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ1c2VyX2lkIjoiNjRlNzFhNjg4NWRiZDQ2MjkzN2JhZWJiIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDktMjFUMTI6NDg6MzIuMjgyWiJ9.95d13e5d5547a9c2f86e44f4f58c2b7869e26ac0d72918cfd6a037d689312810'
                },
                body: JSON.stringify({
                    phoneNumber: phone,
                    fullName: name,
                    amount: amount,
                    currency: currency,
                    wallet_id: "65245a75f38cafb8ea703883",
                    reference_id: "65245a75f38cafb",
                }),
            });

            console.log(response)
            if (!response.ok) {
                const responseBody = await response.json();
                console.error('Server error:', responseBody);
                toast.error(responseBody.message || 'Failed to submit');
                return;
            }

            const responseData = await response.json();
            toast.success("Payment was send successfully")
            console.log(responseData)
            await sendToMerchantWallet();

        } catch (error) {
            console.error('Error while making payment', error);
        }
        finally {
            // reset()
            setLoading(false);
        }

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className='bg-[#110D1F] border rounded-xl flex items-center justify-center p-10 shadow-2xl w-full lg:w-1/3'>
                <div className="w-full space-y-6">
                    <h1 className='flex items-center justify-center text-[#FFFFFF] font-semibold text-xl'>Make Payment</h1>
                    <div className="space-y-1">
                        <Label>Account Name</Label>
                        <Input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='John Doe'
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder='+254768685444'
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Amount</Label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder='100'
                            required
                        />
                    </div>
                    <div className='space-y-1'>
                        <Label>Currency</Label>
                        <Select value={currency} onValueChange={(val) => setCurrency(val)}>
                            <SelectTrigger >
                                <SelectValue placeholder="Network" />
                            </SelectTrigger>
                            <SelectContent className='bg-gray-100'>
                                <SelectItem value='KES'>KES</SelectItem>
                                <SelectItem value='ZAR'>ZAR</SelectItem>

                            </SelectContent>
                        </Select>

                    </div>
                    <div>
                    </div>
                    <Button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4' onClick={onSubmit} disabled={loading}>
                        {loading && <Loader2 className="w-6 h-6 mr-2 animate-spin" />}
                        {loading ? 'Paying...' : 'Pay'}
                    </Button>

                    <button
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Pay
