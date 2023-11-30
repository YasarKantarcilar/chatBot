import MessagesListItem from "./Components/MessagesListItem";
import Message from "./Components/Message";
import { useEffect, useRef, useState } from "react";
import { MessageType } from "./Types";
import {
	greetingConditions,
	greetingResponses,
	helpConditions,
	helpResponses,
	productConditions,
	productResponses,
	returnConditions,
	returnResponses,
	orderConditions,
	orderResponses,
	exchangeConditions,
	exchangeResponses,
} from "./botData";

function App() {
	const [message, setmessage] = useState<string>("");
	const unknownCommand = (param?: string): void => {
		setchat((prev) => [
			...prev,
			{
				from: "bot",
				message:
					param === "cancel"
						? "Lütfen tam ve doğru bir şekilde giriniz, noktalama işaretlerine dikkat ediniz"
						: "Lütfen anahtar kelimeleri kullanarak konuşunuz. Örnek: Yardım, Sipariş, Ürün, İade",
			},
		]);
	};
	const botCondition = () => {
		[
			{ condition: greetingConditions, response: greetingResponses },
			{ condition: helpConditions, response: helpResponses },
			{ condition: orderConditions, response: orderResponses },
			{ condition: returnConditions, response: returnResponses },
			{ condition: productConditions, response: productResponses },
			{ condition: exchangeConditions, response: exchangeResponses },
		].forEach((eachCondition) => {
			if (eachCondition.condition.some((condition) => message.toLowerCase().includes(condition))) {
				setchat((prev) => [
					...prev,
					{
						from: "bot",
						message: eachCondition.response[Math.floor(Math.random() * eachCondition.response.length)],
					},
				]);
				throw new Error("Break the loop.");
			}
		});
	};

	const botResponseHandler = (message: string) => {
		if (
			message.toLowerCase().includes("ürün iptal numarası") ||
			message.toLowerCase().includes("ürün iptal numarasi")
		) {
			if (!message.split(":")[1]) return unknownCommand("cancel");
			setchat((prev) => [
				...prev,
				{
					from: "bot",
					message:
						"Siparişiniz başarıyla iptal edilmiştir. SİPARİŞ İPTALİ ONAY NO: 123456789, İPTAL EDİLEN URUN NUMARASI: " +
						message.split(":")[1].trim(),
				},
			]);
			return true;
		} else {
			botCondition();

			unknownCommand();
		}
	};

	const handleSendMessageClick = () => {
		if (message.length > 0) {
			setchat((prev) => [...prev, { from: "customer", message }]);
			setmessage("");
			botResponseHandler(message);
		}
	};
	const [chat, setchat] = useState<MessageType[]>([
		{
			from: "bot",
			message: "Merhaba, ben size yardımcı olmak için buradayım. Nasıl yardımcı olabilirim?",
		},
	]);
	const chatRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		chatRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chat]);
	return (
		<div className="min-h-screen bg-[#f0f1f2]">
			<div className="w-0 md:w-[20%] h-screen overflow-y-scroll overflow-x-hidden fixed flex flex-col items-center justify-start bg-white left-0 top-0">
				<MessagesListItem />
			</div>
			<div className="w-[100%] md:w-[80%] md:ml-[20%] min-h-screen relative">
				<div className="min-h-[90vh] w-full flex flex-col gap-2 pt-2 overflow-scroll pb-[20%] md:pb-[10%]">
					{chat?.map((message, index) => {
						return <Message key={index} index={index} from={message.from} message={message.message} />;
					})}
					<div ref={chatRef} />
				</div>
				<div className="w-full md:w-[80%] bg-white h-[10vh] flex justify-between items-center fixed bottom-0 right-0">
					<input
						value={message}
						onChange={(e) => setmessage(e.target.value)}
						placeholder="Mesajınız"
						onKeyDown={(e) => (e.key === "Enter" ? handleSendMessageClick() : null)}
						type="text"
						className="w-[80%] pl-8 placeholder:font-bold text-xl h-12 border border-gray-400 rounded-xl"
					/>
					<button
						className="w-[18%] h-12 bg-[#2c52d3] text-white rounded-xl"
						onClick={handleSendMessageClick}
					>
						Gönder
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
