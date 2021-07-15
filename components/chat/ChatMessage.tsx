import { ChatMessage } from "../../types/Chat";
import { DateTime } from "luxon";

export default function ChatMessageView({
  chatMessage,
}: {
  chatMessage: ChatMessage;
}) {
  return (
    <div className="flex flex-row w-full mt-3">
      <div className="mr-4">
        <img
          src={chatMessage.userDTO.userProfileImageUrl}
          className="w-12 h-12 rounded-full shadow"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold">
          {chatMessage.userDTO.userFullName} at{" "}
          {DateTime.fromMillis(
            new Date(chatMessage.messageCreatedAt).getTime()
          ).toRelative()}
        </h3>
        <p>{chatMessage.messageContent}</p>
      </div>
    </div>
  );
}
