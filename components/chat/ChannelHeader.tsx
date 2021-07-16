import { useSelector } from "react-redux";
import { StoreState } from "../../reducers";

export default function ChannelHeader() {
  const appStore = useSelector((store: StoreState) => store.app);
  const { currentChat, currentUser } = appStore;

  function getImageUrlForChat(): string {
    if (!currentChat || !currentUser) {
      return "";
    }
    let uuid = currentUser.userUUID;
    if (
      currentChat.chatMembers.length >= 3 ||
      currentChat.chatName.startsWith("GP$AG_") == false
    ) {
      return "https://i.natgeofe.com/n/4bf47147-ce80-49c6-98ae-52f63349045f/67655.jpg?w=636&h=424";
    } else if (currentChat.chatMembers.length == 2) {
      return currentChat.chatMembers.find((cm) => cm.userUUID !== uuid).userDTO
        .userProfileImageUrl;
    } else {
      return currentUser.userProfileImageUrl;
    }
  }

  function getTitleForChat(): string {
    if (!currentChat || !currentUser) {
      return "";
    }

    let uuid = currentUser.userUUID;
    if (
      currentChat.chatMembers.length >= 3 ||
      currentChat.chatName.startsWith("GP$AG_") == false
    ) {
      return currentChat.chatName ?? "Group Chat";
    } else if (currentChat.chatMembers.length == 2) {
      return currentChat.chatMembers.find((cm) => cm.userUUID !== uuid).userDTO
        .userFullName;
    } else {
      return "Lonely Chat :(";
    }
  }

  return (
    <div className="flex flex-row h-12 sticky rounded-t-md bg-gray-100 dark:bg-darkgraylight shadow-b-xl w-full gap-5 align-middle items-center">
      <div className="flex-1 text-center font-bold align-middle flex flex-row h-full place-items-center justify-center">
        <img src={getImageUrlForChat()} className="h-8 w-8 rounded-full align-middle mr-3"/>
        <h1 className="font-bold">
          {getTitleForChat()}
        </h1>
      </div>

      <button className="h-8 pl-3 pr-3 mr-3 rounded-md  bg-gray-300 dark:bg-gray-500">
        Options
      </button>
    </div>
  );
}
