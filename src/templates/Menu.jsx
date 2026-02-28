import { CardsIcon, GearIcon, HouseIcon, ListIcon, MinusIcon, XIcon } from "@phosphor-icons/react";
import { useContext } from "react";
import { SiteContext } from "../SiteContext";

export default function Menu() {
  const { setSite } = useContext(SiteContext);

  return (
    <menu className='hide'>
      <div className='top'>
        <button
          onClick={() => {
            setSite("reaconsole");
          }}>
          <HouseIcon />
          Home
        </button>
        <button
          onClick={() => {
            setSite("settings");
          }}>
          <GearIcon />
          Settings
        </button>
      </div>

      <div className='bottom'></div>
    </menu>
  );
}
