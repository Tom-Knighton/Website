export default async function GetTokensFromServer(req, res): Promise<TokenResponse> {
  const userUUID = req.session.get("userUUID");
  const token = req.session.get("token");
  const refresh = req.session.get("refresh");

  if (userUUID && token && refresh) {
    return { userUUID, token, refresh };
  } else {
    return null;
  }
}

interface TokenResponse {
  userUUID: string,
  token: string,
  refresh: string
}