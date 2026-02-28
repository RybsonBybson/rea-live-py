import { useEffect, useRef, useState } from "react";
import Menu from "../templates/Menu";

export default function ReaperConsole() {
  const [isReaper, setIsReaper] = useState(false);
  const [isConnection, setIsConnection] = useState(false);

  const checkReaper = async () => {
    const isReaOn = await window.api.isReaperOn();
    setIsReaper(isReaOn);
  };

  const checkConnection = async () => {
    const isConnection = await window.api.isConnection();
    setIsConnection(isConnection);
  };

  useEffect(() => {
    setInterval(checkReaper, 1000);
    setInterval(checkConnection, 1000);
  }, []);

  return (
    <main>
      <Menu />
      <div className='area'>
        {isReaper && <div>Reaper on</div>}
        {isConnection && <div>Script on</div>}
      </div>
    </main>
  );
}
