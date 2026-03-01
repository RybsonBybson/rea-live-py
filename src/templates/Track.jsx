import { useEffect, useRef, useState } from "react";

const getTextColor = (r, g, b) => {
  const [R, G, B] = [r, g, b].map(c => c / 255);

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return luminance > 0.5 ? "black" : "white";
};

export default function Track({ i = 1, hasName = false, name = "Track 1", hasColor = false, r = 0, g = 0, b = 0, hasIcon = false, icon = "" }) {
  const [syncing, setSyncing] = useState(false);
  const [iconPath, setIcon] = useState(false);

  const enableTrackSync = async () => {
    const result = await window.api.setTrackSync(i - 1);
    setSyncing(result);
  };

  useEffect(() => {
    console.log(icon);
    const isSyncing = async () => {
      setSyncing(await window.api.isTrackSyncing(i - 1));
    };
    const getIcon = async () => {
      if (hasIcon) setIcon(await window.api.imageFromOutside(icon));
    };

    isSyncing();
    getIcon();
    const sync_interval = setInterval(isSyncing, 1000);
    const icon_interval = setInterval(getIcon, 1000);

    return () => {
      clearInterval(sync_interval);
      clearInterval(icon_interval);
    };
  }, [i, icon]);

  const rgb = `${r}, ${g}, ${b}`;
  const text = getTextColor(r, g, b);

  return (
    <div className='track' style={hasColor ? { "--track-color": rgb, "--track-text-color": text } : {}}>
      <div className='number'>{i}</div>
      <div className='trackname'>
        <button onClick={enableTrackSync} className={syncing ? "on" : ""} />
        <div className='tracklabel' title={hasName ? name : ""}>
          {name}
        </div>
        {hasIcon && iconPath !== "" && <img src={iconPath} />}
      </div>
    </div>
  );
}
