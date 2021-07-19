import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Dispatch } from "react";
import { MiddlewareAPI } from "redux";
import { AnyAction } from "redux";
import { setNewIncomingChatMessage } from "../actions";
import { ACTION, AppActions, SocketActions } from "../actions/types";

const connection = new HubConnectionBuilder()
  .withUrl("https://f2b5d0197184.ngrok.io/chathub")
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect()
  .build();

let chatUUIDs: string[] = [];

export function chatHubRegistration(store: MiddlewareAPI) {
  connection
    .start()
    .then(() => {
      console.log("STARTED!*************");
      setupChatHubListener(connection, store);
      chatUUIDs.forEach((uuid) => {
        connection.invoke("SubscribeToGroup", uuid);
      });
    })
    .catch((error) => {
      console.log(error);
      console.log("ERROR^***********");
    });

  return (next: Dispatch<AnyAction>) => (action: SocketActions) => {
    switch (action.type) {
      case ACTION.SEND_NEW_CHAT_MESSAGE:
        connection.invoke(
          "SendMessage",
          action.payload.userUUID,
          action.payload.chatUUID,
          action.payload.messageUUID
        );
        break;
      case ACTION.SUBSCRIBE_TO_CHATS:
        chatUUIDs = action.payload.chatUUIDs;
        action.payload.chatUUIDs.forEach((uuid) => {
          connection.invoke("SubscribeToGroup", uuid);
        });
        break;
    }

    return next(action);
  };
}

function setupChatHubListener(hub: HubConnection, store: MiddlewareAPI) {

  hub.onreconnected(() => {
    console.log('reconnected signalr');
    chatUUIDs.forEach((uuid) => {
      hub.invoke("SubscribeToGroup", uuid);
    });
  });


  hub.on(
    "MessageReceived",
    (chatUUID: string, senderUUID: string, messageUUID: string) => {
      store.dispatch(setNewIncomingChatMessage({ chatUUID: chatUUID, messageUUID: messageUUID}));
    }
  );
}
