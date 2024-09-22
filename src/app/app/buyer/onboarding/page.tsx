import { Metadata } from "next";
import CreateBuyerAccount from "../../_components/CreateBuyerAccount";

export const metadata: Metadata = {
	title: "CreateAccount",
};

export default function page() {
	return <CreateBuyerAccount  role={"Buyer"}/>;
}