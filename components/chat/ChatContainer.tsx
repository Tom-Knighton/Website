import { Component, useEffect, useState } from "react";
import Modal from "react-modal";

import MessagesView from "./MessagesView";
import ChatsList from "./ChatsList";
import User from "../../types/User";
import ChannelView from "./ChannelView";

export default function ChatContainer({ user }: { user: User }) {
  return (
    <div className="flex flex-col md:flex-row pb-3 h-full">
      <div className="overflow-y-scroll max-w-screen md:w-20vw">
        <ChatsList user={user} />
      </div>

      <ChannelView />
    </div>
  );
}
