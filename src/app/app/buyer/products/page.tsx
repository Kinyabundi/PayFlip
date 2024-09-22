import { Metadata } from "next";
import Products from "../../_components/Products";

export const metadata: Metadata = {
	title: "Products",
};

export default function page() {
	return <Products />;
}