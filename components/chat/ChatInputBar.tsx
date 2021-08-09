import { useEffect } from "react";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import { ChatBarResult } from "../../types/Chat";
import StickerPicker from "../StickerPicker";

export default function ChatInputBar({
  onSubmitMessage,
}: {
  onSubmitMessage: (message: ChatBarResult) => void;
}) {
  const [messageText, setMessageText] = useState<string>("");
  const [stickerBarOpen, setStickerBarOpen] = useState<boolean>(false);

  const appStore = useSelector((state: StoreState) => state.app);
  let { currentChatUUID } = appStore;

  useEffect(() => {
    setStickerBarOpen(false);
    setMessageText("");
  }, [currentChatUUID]);

  function updateMessageText(e) {
    setMessageText(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmitMessage({ rawText: messageText, messageTypeId: 1 });
    setMessageText("");
  }

  function sendStickerMessage(stickerUrl: string) {
    onSubmitMessage({ rawText: stickerUrl, messageTypeId: 8 });
    setStickerBarOpen(false);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative rounded-xl w-full focus:border-blue-500"
      >
        <input
          className="w-full mt-1 p-3 border-t-2 rounded-xl focus:border-blue-500 outline-none"
          type="text"
          placeholder="Type something..."
          value={messageText}
          onChange={updateMessageText}
        ></input>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-5 mt-0.5 h-8 w-8 rounded-full bg-gray-300 dark:bg-darkgray p-1 hover:scale-110 cursor-pointer"
          onClick={() => { setStickerBarOpen(!stickerBarOpen) }}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 416.402 416.402"
            className="w-6 h-6 rounded-full text-blue-500 "
          >
            <defs />
            <path d="M415.153 179.294a7.56 7.56 0 00-2.72-5.4 7.6 7.6 0 00-10.718.798l-.002.002c-33.36 38.76-56.88 20-83-.6-19.76-15.68-40.84-32.36-68.56-32.36a64.27 64.27 0 00-27 5.8 57.148 57.148 0 00-15 9.96 57.172 57.172 0 00-15-10 64.27 64.27 0 00-27-5.8c-28 0-52.6 16.84-75.4 32.36-7.56 5.16-14.88 10.2-21.84 14.2-20 11.48-37.72 14.8-53.4-12a7.56 7.56 0 00-14.2 2.56 115.671 115.671 0 00.92 40 64.72 64.72 0 0024.24 39.04 87.356 87.356 0 0041.68 15.76 199.695 199.695 0 0067.48-4.48 180.022 180.022 0 0047.48-16.88 98.023 98.023 0 0025.04-19 98.085 98.085 0 0025.04 19 179.996 179.996 0 0047.4 16.92 199.668 199.668 0 0067.56 4.44 87.36 87.36 0 0041.76-15.72 64.72 64.72 0 0024.24-39.04 115.117 115.117 0 001-39.56zm-15.88 36.281a49.96 49.96 0 01-18.6 30.16 72.515 72.515 0 01-34.56 12.84 184.714 184.714 0 01-62.28-4.28 165.029 165.029 0 01-43.44-15.44 74.606 74.606 0 01-26.04-21.96 7.6 7.6 0 00-12.56 0 74.719 74.719 0 01-25.96 21.84 165.077 165.077 0 01-43.44 15.44 184.713 184.713 0 01-62.28 4.28 72.49 72.49 0 01-34.56-12.84 49.96 49.96 0 01-18.6-30.16 81.029 81.029 0 01-1.8-14.68c18.68 18.64 39.04 13.28 61.28.48 7.44-4.32 15-9.44 22.76-14.76 20.96-14.24 43.68-29.6 66.96-29.6a49.17 49.17 0 0120.68 4.36 40.916 40.916 0 0115.36 12 7.56 7.56 0 0012 0 40.958 40.958 0 0115.28-12 49.17 49.17 0 0120.68-4.36c22.48 0 41.36 14.96 59.12 29.04 29.04 23 55.44 44 92 11.16a84.518 84.518 0 01-2 18.48z" />
          </svg>
        </div>
      </form>
      {stickerBarOpen && (
        <StickerPicker
          onCancel={() => {}}
          onStickerSelected={(stickerUrl: string) => {
            sendStickerMessage(stickerUrl);
          }}
        />
      )}
    </div>
  );
}
