import { ChatMessage, ChatReplyDTO } from "../../types/Chat";
import { DateTime } from "luxon";
import React, { JSXElementConstructor, ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ChatMessageView({
  chatMessage,
  previousChatMessage,
}: {
  chatMessage: ChatMessage;
  previousChatMessage: ChatMessage | null;
}) {

  let { systemTheme } = useTheme();

  useEffect(() => { systemTheme = systemTheme; }, [systemTheme]);

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
  const adjustForUTCOffset = (date: Date) => {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  };

  const messageProfilePicUrl: string =
    chatMessage.messageTypeId === 5
      ? "/bot.png"
      : chatMessage.userDTO.userProfileImageUrl;

  function messageTitle(
    chatMessage?: ChatMessage,
    reply?: ChatReplyDTO
  ): ReactElement {
    if (!chatMessage && !reply) {
      return (
        <h3 className={`font-bold ${isWithin ? "hidden" : "block"}`}>
          <span className={`font-bold ${"text-current"}`}>[Deleted User]</span>{" "}
          <span className="font-extralight">
            {DateTime.fromSQL(chatMessage.messageCreatedAt).toRelative({
              base: DateTime.fromJSDate(adjustForUTCOffset(new Date())),
            })}
          </span>
        </h3>
      );
    }

    if (!chatMessage && reply) {
      chatMessage = {
        chatMessageUUID: reply.chatMessageUUID,
        chatUUID: "",
        messageContent: reply.messageContent,
        messageCreatedAt: new Date(),
        messageHasBeenEdited: false,
        messageIsDeleted: reply.messageIsDeleted,
        messageTypeId: 1,
        user: null,
        userDTO: reply.userDTO,
        replyingToDTO: null,
        replyingToUUID: null,
        userUUID: reply.userUUID
      };
    }

    const isBot = chatMessage.messageTypeId === 5;
    const isAdmin = chatMessage.messageTypeId === 7;
    const name = `${reply ? '@' : ''}${!isBot
      ? chatMessage.userDTO.userFullName ?? "[Deleted User]"
      : "Gary Portal Bot"}${reply ? ':' : ''}`;

    return (
      <h3 className={`font-bold ${isWithin ? "hidden" : "block"}`}>
        <span
          className={`font-bold ${
            isBot
              ? "text-yellow-500"
              : isAdmin
              ? "text-red-500"
              : "text-current"
          }`}
        >
          {name}
        </span>{" "}
        <span className="font-extralight">
          {DateTime.fromSQL(chatMessage.messageCreatedAt).toRelative({
            base: DateTime.fromJSDate(adjustForUTCOffset(new Date())),
          })}
        </span>
      </h3>
    );
  }

  function messageContent(): ReactElement {
    if (!chatMessage.messageContent) {
      return null;
    }
    switch (chatMessage.messageTypeId) {
      case 1:
        // Text Message
        return (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={chatMessage.messageContent}
          ></ReactMarkdown>
        );
      case 2:
        // Image Message
        return (
          <p>
            <img
              src={chatMessage.messageContent}
              className="max-h-96 rounded-md"
            />
          </p>
        );
      case 3:
        return (
          <video
            controls
            controlsList="nodownload"
            className="max-h-65vh m-auto ml-0 rounded-md shadow-xl object-scale-down"
          >
            <source
              src={chatMessage.messageContent}
              type="video/mp4"
              className="rounded-md"
            ></source>
          </video>
        );
      case 5:
        // Bot Message
        return chatMessage.messageContent.trim().endsWith(".gif") ? (
          <p>
            <img
              src={chatMessage.messageContent}
              className="max-h-64 rounded-md"
            ></img>
          </p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={chatMessage.messageContent}
          ></ReactMarkdown>
        );
      case 7:
        // Admin Message
        return (
          <ReactMarkdown
            className="border-2 rounded-md shadow-xl text-red-500 shadow p-1 mr-3 mt-1 border-red-500"
            remarkPlugins={[remarkGfm]}
            children={chatMessage.messageContent}
          ></ReactMarkdown>
        );
      case 8:
        // Sticker Message
        return (
          <p>
            <img src={chatMessage.messageContent} className="w-16 h-16" />
          </p>
        );
      default:
        return (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={chatMessage.messageContent}
          ></ReactMarkdown>
        );
    }
  }

  return (
    <div className="flex flex-col">
      {chatMessage.replyingToDTO && (
        <div className="flex flex-row mt-1 text-gray-500">
          <img src={`${systemTheme === 'light' ? 'replyarrow.png' : 'replyarrowdark.png'}`} className="w-6 h-6 ml-5 mr-3" />
          <span className="mr-2 text-sm flex-none">
            {messageTitle(null, chatMessage.replyingToDTO)}
          </span>
          <span className="text-sm max-h-6 truncate overflow-ellipsis mr-10">
            {chatMessage.replyingToDTO.messageContent}
          </span>
        </div>
      )}
      <div
        className={`flex flex-row w-full ${
          isWithin ? "" : "mt-3"
        } hover:bg-gray-100`}
      >
        <div className={`mr-4 ${isWithin ? "hidden" : "block"}`}>
          <img
            src={messageProfilePicUrl}
            className="w-12 h-12 rounded-full shadow"
          />
        </div>
        <div className={`flex-1 flex flex-col ${isWithin ? "ml-16" : ""}`}>
          {messageTitle(chatMessage)}
          {messageContent()}
        </div>
      </div>
    </div>
  );
}
