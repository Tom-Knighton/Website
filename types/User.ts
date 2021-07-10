export default interface User {
    userUUID: string;
    userFullName: string,
    userSpanishName: string,
    userName: string,
    userProfileImageUrl: string,
    userQuote: string,
    userBio: string,
    userGender: string,
    notificationsMuted: boolean,
    userIsStaff: boolean,
    userIsAdmin: boolean,
    userStanding: string,
    isQueued: boolean,
    userCreatedAt: Date,
    userDateOfBirth: Date,
    isDeleted: boolean,
    userTeam: UserTeam,
    userRanks: UserRanks,
    userPoints: UserPoints
}

export interface UserPoints {
    userUUID: string,
    amigoPoints: number,
    positivityPoints: number,
    bowelsRelieved: number,
    prayers: number,
    meaningfulPrayers: number
}

export interface UserTeam {
    userUUID: string,
    teamId: number,
    team: Team
}

export interface Team {
    teamId: number,
    teamName: string,
    teamAccessLevel: number,
}

export interface UserRanks {
    userUUID: string,
    amigoRankId: number,
    positivityRankId: number,
    amigoRank: Rank,
    positivityRank: Rank,
}

export interface Rank {
    rankId: number,
    rankName: string,
    rankAccessLevel: number,
}

export interface UserDTO {
    userUUID: string,
    userFullName: string,
    userProfileImageUrl: string,
    userIsStaff: boolean,
    userIsAdmin: boolean
}