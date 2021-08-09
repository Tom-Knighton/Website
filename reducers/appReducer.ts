import { ACTION, AppActions } from "../actions/types";
import { Chat, ReceiveNewChatMessageDTO } from "../types/Chat";
import Sticker from "../types/Sticker";
import User from "../types/User";

export interface AppStore {
  currentUser?: User;
  currentChat?: Chat;
  currentChatUUID?: string;
  latestChatMessage?: ReceiveNewChatMessageDTO;
  stickerCache: Sticker[];
}

const initialState = {
  currentUser: null,
  currentChatUUID: null,
  latestChatMessage: null,
  stickerCache: [],
};

export const appReducer = (
  state: AppStore = initialState,
  action: AppActions
): AppStore => {
  switch (action.type) {
    case ACTION.UPDATE_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload.chat,
        currentChatUUID: action.payload.chat.chatUUID,
      };
    case ACTION.UPDATE_CURRENT_USER:
      return { ...state, currentUser: action.payload.user };
    case ACTION.UPDATE_CURRENT_CHAT_UUID:
      return { ...state, currentChatUUID: action.payload.chatUUID };
    case ACTION.UPDATE_STICKER_CACHE:
      return { ...state, stickerCache: action.payload.stickers };
    case ACTION.SET_NEW_INCOMING_CHAT_MESSAGE:
      return { ...state, latestChatMessage: action.payload };
    default:
      return state;
  }
};
