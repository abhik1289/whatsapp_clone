import SideBar from "./Left/SideBar";

export default function Home() {
  return (
    <div className="w-full flex flex-wrap bg-dark_bg_1 h-screen">
      <SideBar />
      <div className="w-8/12 md:block hidden">AA</div>
    </div>
  );
}
