'use client';

import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ethers } from 'ethers';
import { useAuth } from '@/context/AuthContext';
import { profileABI } from '@/abi/contract';

interface ProductData {
    productName: string;
    description: string;
    price: string;
    merchantAddress: string;
}

const MyProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const provider = new ethers.JsonRpcProvider('https://base-sepolia.g.alchemy.com/v2/XJjEhlbtuCP5a6aZvpacjn16Aqd9G0z1');
            const contract = new ethers.Contract("0x6Bf0fcAD09AD26F59b53095F1bF605e417e5eb79", profileABI, provider);

            try {
                const productDetails = await contract.getProductsByMerchant(user?.address);
                const formattedProducts = productDetails.map((product: any) => ({
                    productName: product[0],
                    description: product[1],
                    price: product[3].toString(), // Keep price as provided
                    // merchantAddress: product[4]
                }));
                setProducts(formattedProducts);
            } catch (err) {
                console.error("Error fetching product details:", err);
            }
        };

        if (user?.address) {
            fetchData();
            const intervalId = setInterval(fetchData, 10000); // Fetch every 10 seconds
            return () => clearInterval(intervalId);
        }
    }, [user]);

    const handleBuy = (product: ProductData) => {
        // Implement buy functionality here
        console.log('Buying product:', product);
        // You might want to call a smart contract method or open a modal here
    };

    return (
        <div>
            <div className='mt-10 flex flex-row space-x-4 items-center justify-center'>
                <h1 className='font-bold text-lg'>Products</h1>
                <div className="flex-grow"></div>
            </div>
            <div className='mt-8'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={index} className='hover:bg-gray-200'>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleBuy(product)}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MyProducts;