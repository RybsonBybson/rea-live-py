import { AppWindowIcon, CardsIcon, ListIcon, MinusIcon, PushPinIcon, RectangleIcon, UserCircleIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function Frame() {
  const [menuExists, setMenuExists] = useState(false);
  // const [menuVisible, setMenuVisible] = useState(false);
  const [status, setStatus] = useState("restored");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const menuExists = document.querySelector("menu") !== null;
    setMenuExists(menuExists);

    window.api.onWindowState(state => {
      setStatus(state);
    });

    window.api.onPinned(state => {
      setPinned(state);
    });
  });

  const showHideMenu = () => {
    const menu = document.querySelector("menu");
    const hidden = menu.classList.contains("hide");
    if (hidden) menu.classList.remove("hide");
    else menu.classList.add("hide");

    // setMenuVisible(!hidden);
  };

  return (
    <div className='frame'>
      <div className='left'>
        {menuExists && (
          <button onClick={showHideMenu}>
            <ListIcon />
          </button>
        )}
        <button onClick={window.api.pin}>{!pinned ? <PushPinIcon /> : <PushPinIcon weight='fill' />}</button>
        <button className='account'>
          <UserCircleIcon />
        </button>
      </div>
      <div className='right'>
        <button onClick={window.api.minimalize}>
          <MinusIcon />
        </button>
        <button onClick={window.api.minmax}>{status === "maximized" ? <CardsIcon /> : <RectangleIcon />}</button>
        <button className='close' onClick={window.api.close}>
          <XIcon />
        </button>
      </div>
    </div>
  );
}
