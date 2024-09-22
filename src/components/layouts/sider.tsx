
"use client";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { LayoutDashboard, FileUp, Users, UploadCloud, LogOut } from "lucide-react";
import { cn } from "@nextui-org/react";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { SiSwarm } from "react-icons/si";
import { useAuth } from "@/context/AuthContext";

interface LinkSectionProps {
	title: string;
	render: () => ReactNode;
}

interface LinkItemProps {
	title: string;
	icon?: ReactNode;
	href?: string;
	onClick?: () => void;
}

const LinkSection = ({ title, render }: LinkSectionProps) => {
	return (
		<div className="px-4 py-5">
			<p className="font-medium text-sm text-gray-400">{title}</p>
			<div className="flex space-y-2 flex-col mt-2">{render()}</div>
		</div>
	);
};

const LinkItem = ({ title, icon, href, onClick }: LinkItemProps) => {
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
					<SiSwarm size={50} className="text-[#cbceeb]" />
					<p className="text-[#cbceeb] text-4xl font-bold">Quiza</p>
				</div>
			</div>
			<div className="flex flex-col mt-8 space-y-6 p-6">
				<LinkItem title="Profile" icon={<LayoutDashboard className="text-[#cbceeb]" size={18} />} href="/freelancer/profile" />
				<LinkItem title="Jobs" icon={<LayoutDashboard className="text-[#cbceeb]" size={18} />} href="/freelancer/jobs" />
				<LinkItem title="My Jobs" icon={<LayoutDashboard className="text-[#cbceeb]" size={18} />} href="profile" />
				<LogOutBtn />
			</div>
		</div>
	);
};



export default Sider;
