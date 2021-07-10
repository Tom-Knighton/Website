import UserService from "../network/UserService";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import User from "../types/User";

type NextIronRequest = NextApiRequest & { session: Session };

export default async function GetUserFromServer(req: NextIronRequest, res: NextApiResponse): Promise<User> {
  const userUUID = req.session.get("userUUID");
  const token = req.session.get("token");
  const refresh = req.session.get("refresh");

  if (userUUID && token && refresh) {
    return await UserService.getUser(userUUID, token)
      .then((resp) => {
          return resp;
      })
      .catch(() => {
        return null;
      });
  } else {
    return null;
  }
}