import { Metadata } from "next";
import { LogInCard } from "@/app/app/_components/LoginCard";

export const metadata: Metadata = {
	title: "Login",
};

export default function page() {
	return <LogInCard />;
}