import User, { Team, UserDTO } from "./User";

// Feed post DTO interface
export interface FeedPostDTO {
    postId: number,
    posterUUID: string,
    postType: string,
    postUrl: string,
    isVideo: boolean
}

export interface FeedAditLog {
    aditLogId: number,
    aditLogUrl: string,
    aditLogThumbnailUrl: string,
    posterUUID: string,
    aditLogTeamId: number,
    isVideo: boolean,
    datePosted: Date,
    aditLogViews: number,
    caption: string,
    isDeleted: boolean,
    posterDTO: UserDTO
}

export interface FeedPost {
    postId: number,
    posterUUID: string,
    teamId: number,
    postIsGlobal: boolean,
    postType: string,
    postCreatedAt: Date,
    postDescription: boolean,
    postLikeCount: number,
    isDeleted: boolean,
    poster: User,
    posterDTO: UserDTO,
    postTeam: Team,
    likes?: FeedLike[] | null,
    comments?: FeedComment[] | null
}

export interface FeedPollPost extends FeedPost {
    pollQuestion: string,
    pollAnswers?: FeedPollAnswer[] | null
}

export interface FeedMediaPost extends FeedPost {
    postUrl: string,
    isVideo: boolean
}

export interface FeedPollAnswer {
    pollAnswerId: number,
    pollId: number,
    answer: string,
    votes?: FeedAnswerVote[] | null
}

export interface FeedAnswerVote {
    pollAnswerId: number,
    userUUID: number,
    isDeleted: number,
    user: User,
    userDTO: UserDTO
}

export interface FeedLike {
    userUUID: string,
    postId: number,
    isLiked: boolean
}

export interface FeedComment {
    feedCommentId: number,
    userUUID: string,
    postId: number,
    comment: string,
    isAdminComment: boolean,
    isDeleted: boolean,
    datePosted: Date,
    user: User,
    userDTO: UserDTO
}