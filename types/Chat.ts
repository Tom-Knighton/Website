import User, { UserDTO } from "./User";

export interface Chat {
  chatUUID: string;
  chatName: string;
  chatIsProtected: boolean;
  chatIsPublic: boolean;
  chatIsDeleted: boolean;
  chatCreatedAt: Date;
  chatMembers?: ChatMember[] | null;
  chatMessages?: ChatMessage[] | null;
  lastChatMessage?: ChatMessage | null;
}

export interface ChatMessage {
  chatMessageUUID: string;
  chatUUID: string;
  userUUID: string;
  messageContent: string;
  messageCreatedAt: Date;
  messageHasBeenEdited: boolean;
  messageTypeId: number;
  messageIsDeleted: boolean;
  replyingToUUID: string;
  user: User;
  userDTO: UserDTO;
  replyingToDTO: ChatReplyDTO;
}

export interface ChatMember {
  chatUUID: string;
  userUUID: string;
  isInChat: boolean;
  lastReadAt: Date;
  user: User;
  userDTO: UserDTO;
}

export interface ReceiveNewChatMessageDTO {
  chatUUID: string;
  messageUUID: string;
}

export interface ChatReplyDTO {
  chatMessageUUID: string;
  userUUID: string;
  messageContent: string;
  messageIsDeleted: boolean;
  userDTO: UserDTO;
}

export interface ChatBarResult {
  messageTypeId: number;
  rawText: string;
}
