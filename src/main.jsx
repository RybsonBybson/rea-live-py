import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Frame from "./templates/Frame";
import ReaperConsole from "./pages/ReaperConsole";
import SettingsPage from "./pages/SettingsPage";
import { SiteContext, ReaperContext } from "./contexts/contexts";
import settings from "settings";

function Main() {
  const [site, setSite] = useState("reaconsole");
  const [isReaper, setIsReaper] = useState(false);
  const [communication, setCommunication] = useState({});
  const [wsConn, setWsConn] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const isReaOn = await window.api.isReaperOn();
      const comms = await window.api.communication();
      const wsConn = await window.api.connect();

      setIsReaper(isReaOn);
      setCommunication(comms);
      setWsConn(wsConn);
    }, settings.prefs.refreshDelay);

    return () => clearInterval(interval);
  }, []);

  return (
    <SiteContext.Provider value={{ site, setSite }}>
      <ReaperContext.Provider value={{ isReaper, communication, wsConn }}>
        <Frame />
        {site === "reaconsole" && <ReaperConsole />}
        {site === "settings" && <SettingsPage />}
      </ReaperContext.Provider>
    </SiteContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
