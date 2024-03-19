import { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
import useSendMessage from "../../hookes/useSendMessage";
import EmojiPicker from 'emoji-picker-react';

const MessageInput = ({val}) => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const[open,setOpen]=useState(false);
	const[emojival,setEmojival]=useState(null);

	console.log(message);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
		setOpen(false)
	};
	const openPicker=()=>{
        if(open)
		{
			setOpen(false);
		}
		else{
			setOpen(true);
		}
	}

	
	return (
		<>
         {open && <EmojiPicker height={400} width={300}
		 onEmojiClick={(e,m)=>setMessage(message.concat(e.emoji))}
		 />}
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<div className='absolute inset-y-0 start-0 flex items-center p-3 z-10'>
					<FaRegSmile className="cursor-pointer" onClick={openPicker}/>
				</div>
				<label className="input input-bordered flex items-center gap-2">
  <svg xmlns="" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"></svg>
  <input type="text" className="grow" 
                    placeholder='Send a message'
					value={message}
					onChange={(e) => {setMessage(e.target.value);setOpen(false)}}
					/>
</label>        
				{/* <input
					type='text'
					className='border text-sm  rounded-lg block z-0 w-full p-2.5  bg-gray-700 border-gray-600 text-white'
				/> */}
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
		</>
	);
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
