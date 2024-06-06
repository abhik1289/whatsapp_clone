import MessageBox from "../MessageBox";
import ChatHeader from "./ChatHeader";
import MainChatArea from "./MainChatArea";

export default function ChatArea() {
  return (
    <div>
      <ChatHeader />
      <MainChatArea />
      <MessageBox />
    </div>
  );
}
