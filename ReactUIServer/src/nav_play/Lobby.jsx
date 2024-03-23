/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"


const Lobby = ({users, isHost, passStartFlag, roomId, socket}) => {
  console.log('socket', socket);

  if (socket && socket.connected){
    return (
      <div className="lobby game_geometry">
        <div className="user_count"> <div className="room_id">{roomId}</div><div className="room_helptext">connection code</div></div>
        {isHost? <button className="start_button" onClick={() => {
          socket.emit('start', {roomId})
        }}>START</button> : null} 
      </div>
    )
  } else {
    return <div>
      Failed to connect socket
    </div>
  }
  

}

export default Lobby