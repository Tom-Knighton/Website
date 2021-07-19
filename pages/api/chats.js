import withSession from "../../lib/session";
import ChatService from "../../network/ChatService";

export default withSession(async (req, res) => {
  const token = req.session.get("token");

  let data = await ChatService.GetChatsForUser(req.query.uuid, token);
  res.json(data);
});
