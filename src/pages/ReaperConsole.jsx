import { useContext, useEffect, useRef, useState } from "react";
import Menu from "../templates/Menu";
import { ReaperContext } from "../contexts/contexts";
import Track from "../templates/Track";
import Chat from "../templates/Chat";

export default function ReaperConsole() {
  const { isReaper, isConnection, communication } = useContext(ReaperContext);

  return (
    <main>
      <Menu />
      <div className='area'>
        {isReaper && isConnection && (
          <div className='console'>
            <div className='col'>
              <h3>Choose which tracks to send</h3>
              <hr />
              <div className='tracks'>
                {communication.tracks.map((track, index) => (
                  <Track key={index} i={index + 1} name={track.name} color={track.color} />
                ))}
              </div>
            </div>
            <div className='col'>
              <Chat />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
