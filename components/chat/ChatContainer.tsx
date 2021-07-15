import { Component, useEffect, useState } from "react";
import Modal from "react-modal";

import MessagesView from "./MessagesView";
import ChatsList from "./ChatsList";
import User from "../../types/User";
import ChannelView from "./ChannelView";

export default function ChatContainer({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-y-5 gap-x-0 md:gap-x-5 pb-3 h-full">
      <div className="col-span-1 overflow-y-scroll">
        <ChatsList user={user} />
      </div>

      <ChannelView />
    </div>
  );
}
