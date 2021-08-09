import Sticker from "../types/Sticker";
import ApiClient from "./apiclient";

class AppService {
    static async GetStickers(auth: string): Promise<Sticker[]> {
        return ApiClient.get(`app/getstickers/`, auth)
          .then((resp) => {
            return resp.data as Sticker[];
          })
          .catch();
      }
}

export default AppService;