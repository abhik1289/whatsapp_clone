import { FaRegSmileBeam } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdKeyboardVoice } from "react-icons/md";

import { IoMdSend } from "react-icons/io";
import { ChangeEvent, useState } from "react";
export default function MessageBox() {
  const [message, setMessage] = useState<string>("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <div className="w-full bg-dark_bg_3 py-5 px-4  gap-3 flex">
      <div className="left flex gap-4 items-center ">
        <FaRegSmileBeam className="text-dark_svg_1" size={30}/>
        <FaPlus className="text-dark_svg_1" size={30}/>
      </div>
      <div className="middle">
        <input
        className="w-[650px] px-2 py-3 rounded-[7px] focus:outline-none"
          value={message}
          onChange={handleInputChange}
          placeholder="Type a message"
          type="text"
        />
      </div>
      <div className="right flex items-center">
        {message && message.length > 0 ? <IoMdSend  size={30}className="text-dark_svg_1" /> : <MdKeyboardVoice className="text-dark_svg_1" size={30} />}
      </div>
    </div>
  );
}
