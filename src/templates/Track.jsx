import { useEffect, useRef, useState } from "react";

const getTextColor = (r, g, b) => {
  const [R, G, B] = [r, g, b].map(c => c / 255);

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return luminance > 0.5 ? "black" : "white";
};

export default function Track({ i = 1, name, color = 0 }) {
  const [syncing, setSyncing] = useState(false);

  const enableTrackSync = async () => {
    const result = await window.api.setTrackSync(i - 1);
    setSyncing(result);
  };

  useEffect(() => {
    const isSyncing = async () => {
      setSyncing(await window.api.isTrackSyncing(i - 1));
    };

    isSyncing();
    const interval = setInterval(isSyncing, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [i]);

  const r = (color >> 16) & 255;
  const g = (color >> 8) & 255;
  const b = color & 255;

  const rgb = `${r}, ${g}, ${b}`;
  const text = getTextColor(r, g, b);

  return (
    <div className='track' style={color !== 0 ? { "--track-color": rgb, "--track-text-color": text } : {}}>
      <div className='number'>{i}</div>
      <div className='trackname'>
        <button onClick={enableTrackSync} className={syncing ? "on" : ""} />
        <div className='tracklabel' title={name}>
          {name}
        </div>
      </div>
    </div>
  );
}
