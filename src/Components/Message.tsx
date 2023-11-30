import React from "react";
import { MessageType } from "../Types";

const Message: React.FC<MessageType> = ({ from, message }) => {
	const extraMessageClasses = from === "customer" ? "bg-[#2c52d3]" : "bg-[white]";
	const extraContainerClasses =
		from === "customer" ? "text-white justify-end" : " text-black justify-start";

	return (
		<div className={`w-full min-h-16 px-8 flex ${extraContainerClasses}`}>
			<div className={`${extraMessageClasses} h-auto w-auto p-4 rounded-md max-w-[50%] break-words`}>
				{message}
			</div>
		</div>
	);
};

export default Message;
