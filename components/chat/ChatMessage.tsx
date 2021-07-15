import { ChatMessage } from "../../types/Chat";
import { DateTime } from "luxon";

export default function ChatMessageView({
  chatMessage,
  previousChatMessage,
}: {
  chatMessage: ChatMessage;
  previousChatMessage: ChatMessage | null;
}) {
  function isWithinPreviousMessage(): boolean {
    if (!previousChatMessage) {
      return false;
    }
    const isSameSender = previousChatMessage?.userUUID === chatMessage.userUUID;
    const isBotOrAdminMessage =
      previousChatMessage.messageTypeId == 5 ||
      previousChatMessage.messageTypeId == 7 ||
      chatMessage.messageTypeId == 5 ||
      chatMessage.messageTypeId == 7;
    const isReply = chatMessage.replyingToUUID !== null;

    return (
      previousChatMessage !== null &&
      isSameSender &&
      !isBotOrAdminMessage &&
      !isReply &&
      Math.floor((Math.abs(new Date(chatMessage.messageCreatedAt).getTime() - new Date(previousChatMessage.messageCreatedAt).getTime())/100)/60) <= 7
    );
  }

  const isWithin = isWithinPreviousMessage();

  return (
    <div className={`flex flex-row w-full ${isWithin ? '': 'mt-3'} hover:bg-gray-100`}>
      <div className={`mr-4 ${isWithin ? 'hidden' : 'block'}`}>
        <img
          src={chatMessage.userDTO.userProfileImageUrl}
          className="w-12 h-12 rounded-full shadow"
        />
      </div>
      <div className={`flex-1 flex flex-col ${isWithin ? 'ml-16' : ''}`}>
        <h3 className={`font-bold ${isWithin ? 'hidden' : 'block'}`}>
          {chatMessage.userDTO.userFullName} at{" "}
          {DateTime.fromMillis(
            new Date(chatMessage.messageCreatedAt).getTime()
          ).toRelative()}
        </h3>
        <p>
          {chatMessage.messageContent}
        </p>
      </div>
    </div>
  );
}
