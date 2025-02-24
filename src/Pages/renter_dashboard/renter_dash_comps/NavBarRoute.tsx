import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavFilters from "./NavFilters";
import NavBarLinks from "./NavBarLinks";

function NavBarRoute() {
	let [currentScreen, setCurrentScreen] = useState<0 | 1>(0);

	return (
		<div className="duration-0">
			<button
				className="btn p-2 text-xs bg-purple-500 rounded-md bg-opacity-50"
				onClick={() => setCurrentScreen(currentScreen ? 0 : 1)}
			>
				{!currentScreen ? "Show Filters" : "Hide Filters"}
			</button>
			<div className="h-2 border-b mb-2"></div>

			{/* Animate Presence ensures smooth entry/exit animations */}
			<AnimatePresence mode="wait">
				{currentScreen ? (
					<motion.div
						key="filters"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<NavFilters />
					</motion.div>
				) : (
					<motion.div
						key="links"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						transition={{ duration: 0.3 }}
					>
						<NavBarLinks />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default NavBarRoute;
