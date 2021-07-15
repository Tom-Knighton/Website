import { ACTION, UpdateUserAction, UpdateChatAction, UpdateCurrentUserPayload, UpdateCurrentChatPayload, UpdateCurrentChatUUIDPayload, UpdateChatUUIDAction } from "./types";

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