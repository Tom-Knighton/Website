import withSession from "../../lib/session";
import AppService from "../../network/AppService";

export default withSession(async (req, res) => {
  const token = req.session.get("token");

  let data = await AppService.GetStickers(token);
  res.json(data);
});
