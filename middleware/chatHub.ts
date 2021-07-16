import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Dispatch } from "react";
import { MiddlewareAPI } from "redux";
import { AnyAction } from "redux";
import { ACTION, AppActions, SocketActions } from "../actions/types";

const connection = new HubConnectionBuilder()
  .withUrl("https://22abe19fab66.ngrok.io/chathub")
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect()
  .build();

export function chatHubRegistration(store: MiddlewareAPI) {
  connection
    .start()
    .then(() => {
      console.log("STARTED!*************");
    })
    .catch((error) => {
      console.log(error);
      console.log("ERROR^***********");
    });

  connection.on(
    "MessageReceived",
    (chatUUID: string, senderUUID: string, messageUUID: string) => {
      console.log(`${chatUUID} ${senderUUID} ${messageUUID}`);
    }
  );

  return (next: Dispatch<AnyAction>) => (action: SocketActions) => {
    switch (action.type) {
      case ACTION.SEND_NEW_CHAT_MESSAGE:
        connection.invoke(
          "SendMessage",
          action.payload.userUUID,
          action.payload.chatUUID,
          action.payload.messageUUID
        );
    }

    return next(action);
  };
}
