import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import { ChatMessage } from "../../types/Chat";
import ChannelHeader from "./ChannelHeader";
import ChatInputBar from "./ChatInputBar";
import MessagesView from "./MessagesView";
import fetchJson from "../../lib/fetchJson";
import { sendNewChatMessage } from "../../actions";

export default function ChannelView() {
  const appStore = useSelector((state: StoreState) => state.app);
  const { currentChatUUID, currentChat, currentUser } = appStore;
  const dispatch = useDispatch();

  async function sendMessage(message: string) {
    let newMessage: ChatMessage = {
      chatMessageUUID: "",
      chatUUID: currentChat.chatUUID,
      messageContent: message,
      messageCreatedAt: new Date(),
      messageHasBeenEdited: false,
      messageIsDeleted: false,
      messageTypeId: 1,
      replyingToUUID: null,
      user: null,
      userUUID: currentUser.userUUID,
      userDTO: null,
    };

    let finalMessage: ChatMessage = await fetchJson("/api/sendChatMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });

    dispatch(sendNewChatMessage({ chatUUID: finalMessage.chatUUID, messageUUID: finalMessage.chatMessageUUID, userUUID: finalMessage.userUUID }));
  }

  return (
    <div className="col-span-4 rounded-t-md overflow-y-scroll flex flex-col border-2">
      <ChannelHeader />
      <MessagesView />
      <ChatInputBar onSubmitMessage={(message) => sendMessage(message)} />
    </div>
  );
}
