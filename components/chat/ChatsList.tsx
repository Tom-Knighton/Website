import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentChat } from "../../actions";
import chat from "../../pages/api/chat";
import { Chat } from "../../types/Chat";
import User from "../../types/User";
import { MailIcon } from "@heroicons/react/outline";

export default function ChatsList({ user }: { user: User }) {
  const [chats, setChatState] = useState<Chat[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadData() {
      await loadChats();
    }
    loadData();
  }, []);

  async function loadChats() {
    await fetch(`/api/chats?uuid=${user.userUUID}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setChatState(resp);
      });
  }

  function getImageUrlForChat(chat: Chat): string {
    let uuid = user.userUUID;
    if (
      chat.chatMembers.length >= 3 ||
      chat.chatName.startsWith("GP$AG_") == false
    ) {
      return "https://i.natgeofe.com/n/4bf47147-ce80-49c6-98ae-52f63349045f/67655.jpg?w=636&h=424";
    } else if (chat.chatMembers.length == 2) {
      return chat.chatMembers.find((cm) => cm.userUUID !== uuid).userDTO
        .userProfileImageUrl;
    } else {
      return user.userProfileImageUrl;
    }
  }

  function getTitleForChat(chat: Chat): string {
    let uuid = user.userUUID;
    if (
      chat.chatMembers.length >= 3 ||
      chat.chatName.startsWith("GP$AG_") == false
    ) {
      return chat.chatName ?? "Group Chat";
    } else if (chat.chatMembers.length == 2) {
      return chat.chatMembers.find((cm) => cm.userUUID !== uuid).userDTO
        .userFullName;
    } else {
      return "Lonely Chat :(";
    }
  }

  const hasUnreadMessages = (chat: Chat): boolean  => {
    if (!chat.lastChatMessage || !chat.chatMembers.some(cm => cm.userUUID === user.userUUID)) {
      return false;
    }

    return chat.chatMembers.filter(cm => cm.userUUID == user.userUUID)[0].lastReadAt < chat.lastChatMessage.messageCreatedAt;
  }

  function clickOnChat(chat: Chat) {
    console.log(chat);
    dispatch(updateCurrentChat({ chat: chat }));
  }

  return (
    <div className="select-none">
      <div className="flex flex-row md:flex-col h-28">
        <div className="flex flex-row bg-gray-100 dark:bg-darkgraylight shadow-lg rounded-xl top-0 m-5 ml-0 md:ml-5 md:mt-0 justify-center items-center p-5 place-items-center">
          <h1 className="pageSubtitle">Chats:</h1>
        </div>
        {chats.map((chat) => (
          <div
            key={chat.chatUUID}
            onClick={() => clickOnChat(chat)}
            className="flex flex-row bg-gray-100 dark:bg-darkgraylight shadow-lg rounded-xl top-0 m-auto m-5 justify-center items-center p-5 place-items-center cursor-pointer hover:bg-gray-200"
          >
            <img
              src={getImageUrlForChat(chat)}
              className="ml-5 md:ml-0 w-12 h-12 rounded-full shadow-xl"
            />
            <h1 className="ml-2 font-bold mr-5 min-w-40 text-sm md:text-sm">{getTitleForChat(chat)}</h1>
            <span className="flex-1"></span>
            { hasUnreadMessages(chat) && <div><MailIcon className="text-blue-500 w-6 h-6 mr-5 md:mr-1"/></div> }
          </div>
        ))}
      </div>
    </div>
  );
}
