import { useContext, useEffect, useRef, useState } from "react";
import { ReaperContext } from "../contexts/contexts";
import settings from "settings";

export default function Chat() {
  const messageInput = useRef(null);
  const { messages } = useContext(ReaperContext);

  useEffect(() => {
    const onKeyDown = event => {
      if (event.key !== "Enter") return;
      const sendMessage = () => {
        const mess = messageInput.current.value.trim();
        if (!mess || mess === "") return false;
        window.api.send({ message: mess, username: settings.user.name, type: "" });
        return true;
      };
      const success = sendMessage();
      if (success) messageInput.current.value = "";
    };

    messageInput.current.addEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className='chatcontainer'>
      <div className='chatbox'>
        <div className='chat'>{messages}</div>
        <div className='inputsbox'>
          <input type='text' placeholder='Message...' ref={messageInput} />
        </div>
      </div>
    </div>
  );
}
