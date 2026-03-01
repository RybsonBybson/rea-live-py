import { CardsIcon, DoorOpenIcon, GearIcon, HouseIcon, ListIcon, MinusIcon, XIcon } from "@phosphor-icons/react";
import { useContext } from "react";
import { SiteContext } from "../contexts/contexts";

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

      <div className='bottom'>
        <button onClick={window.api.destroy}>
          <DoorOpenIcon />
          Close App
        </button>
      </div>
    </menu>
  );
}
