import { FeedPostReport } from "../types/Report";
import ApiClient from "./apiclient";

class FeedService {
    static async GetPostDTOs(userUUID, auth) {
        return ApiClient.get(`feed/GetPostDTOs?uuid=${userUUID}`, auth).then((resp) => { return resp.data }).catch(() => { return null});
    }

    static async GetFeedPosts(teamId, startFrom = new Date(), limit = 10, auth) {
        return ApiClient.get(`feed?startfrom=${startFrom}&limit=${limit}&teamId=${teamId}&includeComments=true`, auth).then((resp) => { return resp.data }).catch((error) => { console.log(error)});
    }

    static async GetAditLogs(teamId, auth) {
        return ApiClient.get(`feed/aditlogs?teamId=${teamId}`, auth).then((resp) => { return resp.data ?? [] }).catch(() => {});
    }

    static async ReportFeedPost(postId: number, reporterUUID: string, reason: string, auth: string) {
        const feedReport: FeedPostReport = {
            feedPostId: postId,
            feedReportId: 0,
            isDeleted: false,
            reportByUUID: reporterUUID,
            reportIssuedAt: new Date(),
            reportReason: reason,
            reportedPost: null,
            reporter: null
        };
        return ApiClient.post(`feed/reportpost/${postId}`, feedReport, auth);
    }
}

export default FeedService;