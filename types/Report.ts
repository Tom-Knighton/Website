import { ChatMessage } from "./Chat";
import { FeedPost } from "./Feed";
import User from "./User";

export enum ReportType {
  Feed,
  FeedComment,
  Profile,
  ChatMessage,
}

export interface ReportOption {
  reportName: string;
  reportDescription: string;
}

export interface UserReport {
  userReportId: number;
  userUUID: string;
  reportReason: string;
  reportIssuedAt: Date;
  reportbyUUID: string;
  isDeleted: boolean;
  reportedUser?: User | null;
  reporter?: User | null;
}

export interface ChatMessageReport {
  chatMessageReportId: number;
  chatMessageUUID: string;
  reportReason: string;
  reportIssuedAt: Date;
  reportByUUID: string;
  isDeleted: boolean;
  reportedMessage?: ChatMessage | null;
  reporter?: User | null;
}

export interface FeedPostReport {
  feedReportId: number;
  feedPostId: number;
  reportReason: string;
  reportIssuedAt: Date;
  reportByUUID: string;
  isDeleted: boolean;
  reportedPost?: FeedPost | null;
  reporter?: User | null;
}