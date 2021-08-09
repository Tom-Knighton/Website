import withSession from "../../lib/session";
import ChatService from "../../network/ChatService";
import FeedService from "../../network/FeedService";
import UserService from "../../network/UserService";

export default withSession(async (req, res) => {
  const token = req.session.get("token");
  const type = req.query.type ?? "profile";
  switch (type) {
    case "profile":
      await UserService.reportUser(
        req.query.uuidToReport,
        req.query.reportedByUUID,
        req.query.reason,
        token
      );
      break;
    case "chatmessage":
      ChatService.ReportChatMessage(
        req.query.uuidToReport,
        req.query.reportedByUUID,
        req.query.reason,
        token
      );
      break;
    case "feed":
      FeedService.ReportFeedPost(
        Number(req.query.uuidToReport),
        req.query.reportedByUUID,
        req.query.reason,
        token
      );
    default:
      res.status(400);
      return;
  }

  res.status(200).end();
});
