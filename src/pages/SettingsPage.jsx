import Menu from "../templates/Menu";
import settings from "settings";
import { HardDrivesIcon, PaintBrushIcon, UserIcon } from "@phosphor-icons/react";

export default function SettingsPage() {
  const save = () => {
    window.api.saveSettings(settings);
  };

  const setName = e => {
    settings.user.name = e.target.value;
    save();
  };

  const setPort = e => {
    settings.server.port = e.target.value;
    save();
  };

  return (
    <main>
      <Menu />
      <div className='area'>
        <h3>
          <UserIcon /> Account
        </h3>
        <hr />
        <div className='settings-item'>
          <label>Nickname</label>
          <input type='text' placeholder='Your nickname...' defaultValue={settings.user.name} onInput={setName} />
        </div>
        <h3>
          <PaintBrushIcon /> Look
        </h3>
        <hr />
        <h3>
          <HardDrivesIcon /> Server
        </h3>
        <hr />
        <div className='settings-item'>
          <label>Port</label>
          <input type='number' placeholder='Port...' defaultValue={settings.server.port} onInput={setPort} />
        </div>

        <div className='settings-item'></div>
      </div>
    </main>
  );
}
