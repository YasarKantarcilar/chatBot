import { FC, useState } from "react";

type MessagesListItemProps = {
	value: Object[];
	setValue: React.Dispatch<React.SetStateAction<{ condition: string[]; response: string[] }[]>>;
};

const MessagesListItem: FC<MessagesListItemProps> = ({ setValue }) => {
	const [conditionValue, setconditionValue] = useState<string>();
	const [responseValue, setresponseValue] = useState<string>();
	return (
		<div className="w-[90%] min-h-[60px] bg-white mt-4 rounded-lg flex flex-col items-center justify-center">
			<p className="font-semibold text-lg text-black">[MESAJ KONUSU]</p>
			<input
				className="w-[90%] h-12 border-2 pl-2 mt-8"
				value={conditionValue}
				onChange={(e) => {
					setconditionValue(e.target.value);
				}}
				placeholder="Condition"
			/>
			<input
				className="w-[90%] h-12 border-2 pl-2 mt-8"
				value={responseValue}
				onChange={(e) => {
					setresponseValue(e.target.value);
				}}
				placeholder="Response"
			/>
			<button
				onClick={() => {
					setconditionValue("");
					setresponseValue("");
					setValue((prev) => [
						...prev,
						{
							condition: conditionValue?.split(", ") || [""],
							response: responseValue?.split(", ") || [""],
						},
					]);
				}}
				className="w-[90%] h-12 border-2 text-white bg-[#2c52d3] mt-8"
			>
				EKLE
			</button>
		</div>
	);
};

export default MessagesListItem;
