import { ACTION, UpdateUserAction, UpdateChatAction, UpdateCurrentUserPayload, UpdateCurrentChatPayload, UpdateCurrentChatUUIDPayload, UpdateChatUUIDAction, SendNewChatMessageAction, SendNewChatMessagePayload } from "./types";

export const updateCurrentUser = (data: UpdateCurrentUserPayload): UpdateUserAction => ({
    type: ACTION.UPDATE_CURRENT_USER,
    payload: data
});

export const updateCurrentChatUUID = (data: UpdateCurrentChatUUIDPayload): UpdateChatUUIDAction => ({
    type: ACTION.UPDATE_CURRENT_CHAT_UUID,
    payload: data
});

export const updateCurrentChat = (data: UpdateCurrentChatPayload): UpdateChatAction => ({
    type: ACTION.UPDATE_CURRENT_CHAT,
    payload: data
});

export const sendNewChatMessage = (data: SendNewChatMessagePayload): SendNewChatMessageAction => ({
    type: ACTION.SEND_NEW_CHAT_MESSAGE,
    payload: data
});