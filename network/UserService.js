import ApiClient from "./apiclient.js";

class UserService {
  static async getUser(userUUID, auth) {
    return ApiClient.get(`Users/${userUUID}`, auth)
      .then((resp) => {
        return resp.data;
      })
      .catch(() => {});
  }

  static async authenticate(authenticator, password, auth) {
    return ApiClient.post(
      "Auth/Authenticate",
      { authenticatorString: authenticator, password },
      auth
    )
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => { console.log(error)});
  }

  static async getCurrentUser(auth) {
    return ApiClient.get("Users/CurrentUser", auth)
      .then((resp) => {
        return resp.data;
      })
      .catch(() => {});
  }

  static async updateUserPoints(uuid, newPoints, auth) {
    return ApiClient.put(
      `Users/UpdatePointsForUser/${uuid}`,
      JSON.parse(newPoints),
      auth
    )
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {});
  }
}

export default UserService;
