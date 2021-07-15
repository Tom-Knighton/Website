import { Chat } from "../types/Chat";
import User from "../types/User";

export enum ACTION {
    UPDATE_CURRENT_USER,
    UPDATE_CURRENT_CHAT_UUID,
    UPDATE_CURRENT_CHAT
}

export type AppActions = | UpdateUserAction | UpdateChatAction | UpdateChatUUIDAction;

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