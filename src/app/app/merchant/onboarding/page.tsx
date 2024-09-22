import { Metadata } from "next";
import  CreateAccount  from "@/app/app/_components/CreateAccount";

export const metadata: Metadata = {
	title: "CreateAccount",
};

export default function page() {
	return <CreateAccount role={"Merchant"} />;
}