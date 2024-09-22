import { Metadata } from "next";
import AddProduct from "@/app/app/_components/AddProduct";

export const metadata: Metadata = {
	title: "AddProduct",
};

export default function page() {
	return <AddProduct/>;
}