import { useEffect, useRef, useState } from "react";
import Menu from "../templates/Menu";
import settings from "settings";
import { GearIcon, PaintBrushIcon } from "@phosphor-icons/react";

export default function SettingsPage() {
  return (
    <main>
      <Menu />
      <div className='area'>
        <h3>
          <GearIcon /> General
        </h3>
        <div className='settings-item'>
          <p>Connect to Google</p>
          
        </div>
        <hr />
        <h3>
          <PaintBrushIcon /> Look
        </h3>
        <div className='settings-item'></div>
      </div>
    </main>
  );
}
