import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentChat } from "../../actions";
import { Chat } from "../../types/Chat";
import User from "../../types/User";

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

  function clickOnChat(chat: Chat) {
    console.log(chat);
    dispatch(updateCurrentChat({ chat: chat }));
  }

  return (
    <div>
      <div className="bg-gray-100 dark:bg-darkgraylight shadow-lg rounded-xl p-5 max-h-50 top-0 self-start text-center mb-5 mr-5 ml-5">
        <h1 className="pageSubtitle">Chats:</h1>
      </div>
      {chats.map((chat) => (
        <div onClick={() => clickOnChat(chat)} className="bg-gray-100 dark:bg-darkgraylight shadow-lg rounded-xl p-5 max-h-50 top-0 self-start text-center m-5 flex flex-row place-items-center cursor-pointer hover:bg-gray-200">
          <img
            src={getImageUrlForChat(chat)}
            className="w-12 h-12 rounded-full shadow-xl"
          />
          <h1 className="ml-2 font-bold">{getTitleForChat(chat)}</h1>
        </div>
      ))}
    </div>
  );
}