import React from "react";
import { MessageType } from "../Types";
import { motion } from "framer-motion";

const Message: React.FC<MessageType> = ({ from, message }) => {
	const extraMessageClasses = from === "customer" ? "bg-[#2c52d3]" : "bg-[white]";
	const extraContainerClasses =
		from === "customer" ? "text-white justify-end" : " text-black justify-start";

	return (
		<motion.div className={`w-full min-h-16 px-8 flex ${extraContainerClasses} overflow-x-hidden`}>
			<motion.div
				initial={{ opacity: 0, x: from === "customer" ? 100 : -100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
				className={`${extraMessageClasses} h-auto w-auto p-4 rounded-md max-w-[50%] break-words`}
			>
				{message}
			</motion.div>
		</motion.div>
	);
};

export default Message;
