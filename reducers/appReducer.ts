import { ACTION, AppActions } from "../actions/types";
import { Chat } from "../types/Chat";
import User from "../types/User";

export interface AppStore {
  currentUser?: User;
  currentChat?: Chat;
  currentChatUUID?: string;
}

const initialState = {
  currentUser: null,
  currentChatUUID: null,
};

export const appReducer = (
  state: AppStore = initialState,
  action: AppActions
): AppStore => {
  switch (action.type) {
    case ACTION.UPDATE_CURRENT_CHAT:
      return { ...state, currentChat: action.payload.chat, currentChatUUID: action.payload.chat.chatUUID };
    case ACTION.UPDATE_CURRENT_USER:
      return { ...state, currentUser: action.payload.user };
    case ACTION.UPDATE_CURRENT_CHAT_UUID:
      return { ...state, currentChatUUID: action.payload.chatUUID };
    default:
      return state;
  }
};
