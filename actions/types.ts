import { Chat, ReceiveNewChatMessageDTO } from "../types/Chat";
import User from "../types/User";

export enum ACTION {

    /* App */
    UPDATE_CURRENT_USER,
    UPDATE_CURRENT_CHAT_UUID,
    UPDATE_CURRENT_CHAT,

    /* Chat */
    SET_NEW_INCOMING_CHAT_MESSAGE,

    /* Socket */
    SEND_NEW_CHAT_MESSAGE,
    SUBSCRIBE_TO_CHATS
}

export type AppActions = | UpdateUserAction | UpdateChatAction | UpdateChatUUIDAction | NewIncomingMessage;

export type SocketActions = | SendNewChatMessageAction | SubscribeToChats;

/* Action Types */

export type UpdateUserAction = {
    type: ACTION.UPDATE_CURRENT_USER,
    payload: UpdateCurrentUserPayload
}

export type UpdateChatUUIDAction = {
    type: ACTION.UPDATE_CURRENT_CHAT_UUID,
    payload: UpdateCurrentChatUUIDPayload
}

export type UpdateChatAction = {
    type: ACTION.UPDATE_CURRENT_CHAT,
    payload: UpdateCurrentChatPayload
}

export type SendNewChatMessageAction = {
    type: ACTION.SEND_NEW_CHAT_MESSAGE,
    payload: SendNewChatMessagePayload
}

export type SubscribeToChats = {
    type: ACTION.SUBSCRIBE_TO_CHATS,
    payload: SubscribeToChatsPayload
}

export type NewIncomingMessage = {
    type: ACTION.SET_NEW_INCOMING_CHAT_MESSAGE,
    payload: ReceiveNewChatMessageDTO
}

/* Interfaces for data coming in to action creators */

export interface UpdateCurrentUserPayload {
    user: User
}

export interface UpdateCurrentChatUUIDPayload {
    chatUUID: string
}

export interface UpdateCurrentChatPayload {
    chat: Chat
}

export interface SendNewChatMessagePayload {
    userUUID: string,
    chatUUID: string,
    messageUUID: string,
}

export interface SubscribeToChatsPayload {
    chatUUIDs: string[]
}