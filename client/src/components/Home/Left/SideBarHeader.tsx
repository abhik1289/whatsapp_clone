
import { IoMdMore } from "react-icons/io";

import { LuUsers2 } from "react-icons/lu";
import { FiMessageCircle } from "react-icons/fi";
export default function SideBarHeader() {
  const size: number = 28;


  return (
    <div className="px-2 py-3 flex bg-dark_bg_3 justify-between items-center">
      <div className="profile w-[40px] h-[40px] bg-black rounded-full"></div>
      <div className="icons_area flex gap-4">
        <div className="icon cursor-pointer">
          <LuUsers2  className="text-dark_svg_1" size={size} />
        </div>
        <div className="icon cursor-pointer">
          <FiMessageCircle className="text-dark_svg_1" size={size} />
        </div>
        <div className="icon cursor-pointer">
          <IoMdMore className="text-dark_svg_1"  size={size} />
        </div>
      </div>
    </div>
  );
}
