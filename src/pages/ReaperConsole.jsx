import { useContext, useEffect, useRef, useState } from "react";
import Menu from "../templates/Menu";
import { ReaperContext } from "../contexts/contexts";
import Track from "../templates/Track";
import Chat from "../templates/Chat";

export default function ReaperConsole() {
  const { isReaper, communication, wsConn } = useContext(ReaperContext);

  return (
    <main>
      <Menu />
      <div className='area'>
        {isReaper && communication.connection && (
          <div className='console'>
            <div className='col'>
              <h3>Choose which tracks to send</h3>
              <hr />
              <div className='tracks'>
                <div className='container'>
                  {communication.tracks.map((track, index) => (
                    <Track
                      key={index}
                      i={index + 1}
                      hasName={track.name.hasName}
                      name={track.name.name}
                      hasColor={track.color.hasColor}
                      r={track.color.r}
                      g={track.color.g}
                      b={track.color.b}
                      hasIcon={track.icon.hasIcon}
                      icon={track.icon.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='col'>{wsConn && <Chat />}</div>
          </div>
        )}
      </div>
    </main>
  );
}
