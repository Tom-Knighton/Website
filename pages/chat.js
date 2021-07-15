import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GetTokensFromServer from "../lib/getTokens";
import GetUserFromServer from "../lib/getUser";
import withSession from "../lib/session";
import { updateCurrentChat, updateCurrentUser } from "../actions";
import { setTimeout } from "timers";
import ChatContainer from "../components/chat/ChatContainer";

export const getServerSideProps = withSession(async function ({ req, res }) {
  let user = await GetUserFromServer(req, res);
  let { token, refresh } = await GetTokensFromServer(req, res);

  if (!user || !token || !refresh) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user,
    },
  };
});

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const Chat = (props) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [items, setItems] = useState([1, 2, 3]);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(updateCurrentUser({ user: props.user }));
    getChats();
  }, []);

  function getImageUrlForChat(chat) {
    let uuid = props.user.userUUID;
    if (
      chat.chatMembers.length >= 3 ||
      chat.chatName.startsWith("GP$AG_") == false
    ) {
      return "https://i.natgeofe.com/n/4bf47147-ce80-49c6-98ae-52f63349045f/67655.jpg?w=636&h=424";
    } else if (chat.chatMembers.length == 2) {
      return chat.chatMembers.find((cm) => cm.userUUID !== uuid).userDTO
        .userProfileImageUrl;
    } else {
      return props.user.userProfileImageUrl;
    }
  }

  function getTitleForChat(chat) {
    let uuid = props.user.userUUID;
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

  function getChats() {
    fetch(`/api/chats?uuid=${props.user.userUUID}`)
      .then((response) => response.json())
      .then((resp) => {
        setChats(resp);
      });
  }

  function clickChat(chat) {
    setSelectedChat(chat);
    dispatch(updateCurrentChat({ chatUUID: chat.chatUUID }));
  }

  function fetchMoreData() {
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 1500);
  }

  return (
    <div className="pageContainer">
        <ChatContainer user={props.user}/>
    </div>
  );
};

export default Chat;
