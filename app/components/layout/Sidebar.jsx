import {
	LayoutDashboard,
	DollarSign,
	BarChart2,
	Settings,
	HelpCircle,
	LogOut,
} from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";

export default function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		const id = localStorage.getItem("id");
		setIsLogin(!!id);
	}, [location]);

	const def = "flex flex-col items-center hover:text-white ";
	const active = def + "text-white";
	const notActive = def + "text-[#afafb2]";

	function signout() {
		localStorage.removeItem("id");
		localStorage.removeItem("jwt");
		navigate("/auth");
	}

	return (
		<>
			{!isLogin ? (
				<></>
			) : (
				<aside className="h-full w-40 bg-[#1b2055] flex flex-col justify-between py-8 px-8 col-end-1 row-start-1 text-white">
					<div className="space-y-12">
						<NavLink
							to="/"
							className={({ isActive }) => (isActive ? active : notActive)}
						>
							<LayoutDashboard className="w-6 h-6 p-0" />
							<span className="text-lg">Dashboard</span>
						</NavLink>

						<NavLink
							to="/my-budget"
							className={({ isActive }) => (isActive ? active : notActive)}
						>
							<DollarSign className="w-6 h-6" />
							<span className="text-lg font-semibold">My Budget</span>
						</NavLink>

						<NavLink
							to="/analytics"
							className={({ isActive }) => (isActive ? active : notActive)}
						>
							<BarChart2 className="w-6 h-6" />
							<span className="text-lg">Analytics</span>
						</NavLink>

						{/* <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          <Settings className="w-6 h-6" />
          <span className="text-lg">Settings</span>
        </NavLink> */}
					</div>

					<div className="space-y-6">
						<div className={notActive}>
							<HelpCircle className="w-6 h-6" />
							<span className="text-lg">Help</span>
						</div>
						<div
							className="flex flex-col items-center text-red-500 cursor-pointer"
							onClick={signout}
						>
							<LogOut className="w-6 h-6" />
							<span className="text-lg font-semibold">Sign out</span>
						</div>
					</div>
				</aside>
			)}
		</>
	);
}
