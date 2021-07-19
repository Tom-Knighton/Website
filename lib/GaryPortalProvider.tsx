import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToUserChats, updateCurrentUser } from "../actions";
import ChatService from "../network/ChatService";
import { StoreState } from "../reducers";
import { Chat } from "../types/Chat";
import User from "../types/User";
import fetchJson from "./fetchJson";
import useUser from "./useUser";

const GaryPortalProvider = (props) => {

  const { user }: { user: User } = useUser();
  const [chats, setChats] = useState<string[]>([]);
  const dispatch = useDispatch();
  const appStore = useSelector((store: StoreState) => store.app);
  let { currentChat, currentUser } = appStore;

  useEffect(() => {
    currentUser = appStore.currentUser;
  }, [currentUser]);

  useEffect(() => {
    async function getChats() {
      const chats: Chat[] = await fetchJson(`/api/chats?uuid=${user.userUUID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      dispatch(subscribeToUserChats({ chatUUIDs: chats.flatMap(c => c.chatUUID) }))
    }
    if (user) {
      dispatch(updateCurrentUser({ user: user }));

      getChats();
    }
  }, [user]);

  return props.children;
};
export default GaryPortalProvider;
