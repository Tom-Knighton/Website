import withSession from "../../lib/session";
import ChatService from "../../network/ChatService";

export default withSession(async (req, res) => {
  const token = req.session.get("token");

  let data = await ChatService.GetMessagesForChat(req.query.chatUUID, req.query.startfrom, req.query.limit, token);
  console.log(data);
  res.json(data);
  // function getRandomNumber() { return Math.random(); }
  // res.json([getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()]);
});
