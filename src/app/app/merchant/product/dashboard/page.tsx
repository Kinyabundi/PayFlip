import Dashboard from "@/app/app/_components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Products",
};

export default function page() {
	return <Dashboard />;
}