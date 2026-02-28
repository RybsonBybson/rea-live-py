import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Frame from "./templates/Frame";
import ReaperConsole from "./pages/ReaperConsole";
import SettingsPage from "./pages/SettingsPage";
import { SiteContext } from "./SiteContext";

function Main() {
  const [site, setSite] = useState("reaconsole");

  return (
    <SiteContext.Provider value={{ site, setSite }}>
      <Frame />
      {site === "reaconsole" && <ReaperConsole />}
      {site === "settings" && <SettingsPage />}
    </SiteContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
