import ApiClient from "./apiclient";
import { Chat, ChatMessage } from "../types/Chat";

class ChatService {
  static async GetChatsForUser(userUUID: string, auth: string) {
    return ApiClient.get(`chat/chats/${userUUID}`, auth)
      .then((resp) => {
        return resp.data;
      })
      .catch();
  }

  static async GetChatByUUID(chatUUID: string, auth: string): Promise<Chat> {
    return ApiClient.get(`chat/${chatUUID}`, auth)
      .then((resp) => {
        return resp.data as Chat;
      })
      .catch();
  }

  static async GetMessagesForChat(
    chatUUID: string,
    startfrom: number = new Date().getTime(),
    limit: number = 20,
    auth: string
  ): Promise<ChatMessage[]> {
    return ApiClient.get(
      `chat/messages/${chatUUID}?chatUUID=${chatUUID}&startfrom=${startfrom}&limit=${limit}`,
      auth
    )
      .then((resp) => {
        return resp.data as ChatMessage[];
      })
      .catch(() => {
        return [];
      });
  }

  static async SendChatMessage(
    message: ChatMessage,
    toChat: string,
    auth: string
  ): Promise<ChatMessage> {
    return ApiClient.post(`chat/${toChat}/newmessage`, message, auth)
      .then((resp) => {
        return resp.data as ChatMessage;
      })
      .catch(() => {
        return null;
      });
  }
}

export default ChatService;
