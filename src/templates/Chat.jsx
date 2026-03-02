import { useContext, useEffect, useRef } from "react";
import { ReaperContext } from "../contexts/contexts";
import settings from "settings";
import Message from "./Message";

export default function Chat() {
  const messageInput = useRef(null);
  const { wsConn } = useContext(ReaperContext);

  useEffect(() => {
    const sendMessage = () => {
      const mess = messageInput.current.value.trim();
      if (!mess || mess === "") return false;
      window.api.send({ message: mess, user: settings.user.name, type: "" });
      return true;
    };

    messageInput.current.addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      const success = sendMessage();
      if (success) messageInput.current.value = "";
    });

    window.api.onData(data => {});
  }, []);

  return (
    wsConn && (
      <div className='chatcontainer'>
        <div className='chatbox'>
          <div className='chat'>
            <Message message='User Ryba joined' type='join' />
          </div>
          <div className='inputsbox'>
            <input type='text' placeholder='Message...' ref={messageInput} />
          </div>
        </div>
      </div>
    )
  );
}
