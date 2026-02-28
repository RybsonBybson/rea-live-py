import { useEffect, useRef, useState } from "react";
import Menu from "../templates/Menu";

export default function ReaperConsole() {
  const scriptId = useRef(null);
  const [isReaper, setIsReaper] = useState(false);

  const checkReaper = async () => {
    const isReaOn = await window.api.isReaperOn();
    setIsReaper(isReaOn);
  };

  useEffect(() => {
    setInterval(checkReaper, 1000);
  }, []);

  return (
    <main>
      <Menu />
      {isReaper && (
        <div className='area'>
          <label>script id</label>
          <hr />
          <input type='text' ref={scriptId} />
          <button>Run script</button>
        </div>
      )}
    </main>
  );
}
