import clsx from "clsx";
import { Montserrat } from "next/font/google";
import { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const montserrant = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

const AppLayout: FC<IProps> = ({ children }) => {
	return <div className={clsx("min-h-screen antialiased font-montserrat", montserrant.variable)}>{children}</div>;
};

export default AppLayout;