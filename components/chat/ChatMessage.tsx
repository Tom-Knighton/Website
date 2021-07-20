import { ChatMessage } from "../../types/Chat";
import { DateTime } from "luxon";
import { JSXElementConstructor, ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      Math.floor(
        Math.abs(
          new Date(chatMessage.messageCreatedAt).getTime() -
            new Date(previousChatMessage.messageCreatedAt).getTime()
        ) /
          100 /
          60
      ) <= 7
    );
  }

  const isWithin = isWithinPreviousMessage();
  const adjustForUTCOffset = (date) => {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  };

  function messageContent(): ReactElement {
    if (!chatMessage.messageContent) {
      return null;
    }
    switch (chatMessage.messageTypeId) {
      case 1:
        // Text Message
        return <ReactMarkdown remarkPlugins={[remarkGfm]} children={chatMessage.messageContent}></ReactMarkdown>;
      case 2:
        // Image Message
        return <p><img src={chatMessage.messageContent} className="max-h-96 rounded-md"/></p>;
      case 8:
        // Sticker Message
        return <p><img src={chatMessage.messageContent} className="w-16 h-16" /></p>;
      default:
        return <ReactMarkdown>{chatMessage.messageContent}</ReactMarkdown>;
    }
  }

  return (
    <div
      className={`flex flex-row w-full ${
        isWithin ? "" : "mt-3"
      } hover:bg-gray-100`}
    >
      <div className={`mr-4 ${isWithin ? "hidden" : "block"}`}>
        <img
          src={chatMessage.userDTO.userProfileImageUrl}
          className="w-12 h-12 rounded-full shadow"
        />
      </div>
      <div className={`flex-1 flex flex-col ${isWithin ? "ml-16" : ""}`}>
        <h3 className={`font-bold ${isWithin ? "hidden" : "block"}`}>
          {chatMessage.userDTO.userFullName}{" "}
          <span className="font-extralight">
            {DateTime.fromSQL(chatMessage.messageCreatedAt).toRelative({
              base: DateTime.fromJSDate(adjustForUTCOffset(new Date())),
            })}
          </span>
        </h3>
        {messageContent()}
      </div>
    </div>
  );
}
