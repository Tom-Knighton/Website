import { FormEvent, useState } from "react";

export default function ChatInputBar({
  onSubmitMessage,
}: {
  onSubmitMessage: (message: string) => void;
}) {
  const [messageText, setMessageText] = useState("");

  function updateMessageText(e) {
    setMessageText(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmitMessage(messageText);
    setMessageText("");
  }

  return (
    <div className="w-full">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
        className="w-full mt-1 p-3 border-t-2 rounded-xl focus:border-blue-500 outline-none"
          type="text"
          placeholder="send msg bby"
          value={messageText}
          onChange={updateMessageText}
        ></input>
      </form>
    </div>
  );
}
