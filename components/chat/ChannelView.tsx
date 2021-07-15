import ChannelHeader from "./ChannelHeader";
import ChatInputBar from "./ChatInputBar";
import MessagesView from "./MessagesView";

export default function ChannelView() {

  function sendMessage(message: string) {
    alert(message);
  }

  return <div className="col-span-4 rounded-t-md overflow-y-scroll flex flex-col border-2">
      <ChannelHeader/>
      <MessagesView/>
      <ChatInputBar onSubmitMessage={(message) => sendMessage(message)}/>
  </div>;
}
