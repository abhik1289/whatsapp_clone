import { MdOutlineDone } from "react-icons/md";

export default function Steps4() {
  return (
    <div className="complete_step">
      <div className="round_box my-5 w-[80px] h-[80px] rounded-full border border-green_1 flex justify-center items-center">
        <MdOutlineDone size={30} color="green" />
      </div>
      <p className="font-font1 italic my-2 text-dark_text_2">
        Congratulations on completing your registration process in our chat app!
        Enjoy our exclusive features and explore the app.
      </p>
    </div>
  );
}
