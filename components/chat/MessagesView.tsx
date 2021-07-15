import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chat, ChatMessage } from "../../types/Chat";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatMessageView from "./ChatMessage";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { StoreState } from "../../reducers";
import SelectChatCover from "./SelectChatCover";

export default function MessagesView() {
  const appStore = useSelector((state: StoreState) => state.app);
  const { currentChatUUID, currentChat } = appStore;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastDate, setLastDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const scrollRef = useRef<HTMLDivElement>();
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    getMessages();
    scrollRef.current?.scrollIntoView();
  }, []);

  useEffect(() => {
    if (inView) {
      getMessages();
    }
  }, [inView, messages]);

  useEffect(() => {
    setMessages([]);
    setLastDate(new Date());
  }, [currentChatUUID, currentChat]);

  function toggleModal() {
    setModalOpen(true);
  }

  function getMessages() {
    fetch(
      `/api/chatMessages?chatUUID=${currentChatUUID}&startfrom=${lastDate.getTime()}&limit=${30}`
    )
      .then((response) => response.json())
      .then((resp) => {
        addNewMessages(resp);
      });
  }

  function addNewMessages(newMessages: ChatMessage[]) {
    let shouldScroll = messages.length === 0;

    newMessages = newMessages.filter(
      (m) =>
        messages.find((om) => om.chatMessageUUID === m.chatMessageUUID) == null
    );

    if (newMessages.length > 0) {
      setMessages(messages.concat(newMessages));
      setLastDate(
        new Date(newMessages[newMessages.length - 1].messageCreatedAt)
      );
      setCanLoadMore(true);
      document.getElementById(newMessages[0].chatMessageUUID).scrollIntoView();
    } else {
      setCanLoadMore(false);
    }

    if (shouldScroll) {
      scrollRef.current?.scrollIntoView();
    }
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className="w-full h-full flex-1 overflow-y-scroll rounded-b-md"
    >
      {currentChatUUID !== null && (
        <InfiniteScroll
          className={`${currentChatUUID === null ? "hidden" : "block"}`}
          dataLength={messages.length >= 1 ? messages.length : 1}
          next={closeModal}
          hasMore={canLoadMore}
          loader={<p>Loading more messages...</p>}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse={true}
        >
          <div ref={scrollRef}></div>
          {messages?.map((message) => (
            <div id={message.chatMessageUUID}>
              <ChatMessageView chatMessage={message}></ChatMessageView>
            </div>
          ))}
          <div ref={ref}></div>
        </InfiniteScroll>
      )}
      <div className={`${currentChatUUID === null ? "block" : "hidden"} h-full`}>
        <SelectChatCover />
      </div>
    </div>
  );
}
