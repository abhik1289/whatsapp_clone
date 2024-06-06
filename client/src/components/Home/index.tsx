
import LeftSide from "./Left";
import RightSide from "./Right";

export default function Home() {
  return (
    <div className="w-full flex flex-wrap bg-dark_bg_1 h-screen">
      <LeftSide />
      <RightSide/>
   
    </div>
  );
}
