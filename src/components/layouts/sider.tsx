
"use client";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@nextui-org/react";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


interface LinkItemProps {
	title: string;
	icon?: ReactNode;
	href?: string;
	onClick?: () => void;
}



const LinkItem = ({ title, icon, href }: LinkItemProps) => {
	const pathname = usePathname();

	const selected = useMemo(() => {
		if (href && pathname !== "/") {
			return pathname === `/app/${href}` ? true : false;
		}

		return false;
	}, [href, pathname]);


	return (
		<Link href={href ? `/app/${href}` : "/"}>
			<div className={`flex flex-col mt-2 text-[#cbceeb] ${selected ? 'text-[#B5D0FF] text-2xl' : ''}`}>
				<div className={cn("text-sm flex space-x-3 items-center", { "text-primary-500 font-bold": selected })}>
					<div className="mr-1">{icon}</div>
					<span className="text-[14px]">{title}</span>
				</div>
			</div>
		</Link>
	);
};


const LogOutBtn = () => {

	const router = useRouter()

	const { logout } = useAuth()

	const handleLogout = async () => {
		await logout();
		router.push('/');
	};

	return (
		<div className="flex flex-col mt-4 cursor-pointer mb-auto" onClick={handleLogout}>
			<div className={cn("text-sm flex space-x-3 items-center")}>
				<div className="mr-1">
					<LogOut className="text-primary-500" size={18} />
				</div>
				<span className="text-[14px]">LogOut</span>
			</div>
		</div>
	)
}

const Sider = () => {
	return (
		<div className="hidden md:flex flex-col w-[14rem]  border-r border-gray-200 h-screen overflow-y-auto">
			<div className="flex flex-row gap-4 items-center">
				<div className="flex items-center gap-2 p-4 ">
					<p className="text-[#cbceeb] text-4xl font-bold">PayFlip</p>
				</div>
			</div>
			<div className="flex flex-col mt-8 space-y-6 p-6">
				<LinkItem title="Products" icon={<LayoutDashboard className="text-[#cbceeb]" size={18} />} href="/buyer/products/view" />
				<LogOutBtn />
			</div>
		</div>
	);
};



export default Sider;
