/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"


const ViewLobby = ({users, isHost, passStartFlag, roomId, socket}) => {
  console.log('socket', socket);

  if (socket && socket.connected){
    return (
      <div className="lobby game_geometry">
        <div className="room_id">{roomId}</div><div className="room_helptext">connection code</div>
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

export default ViewLobby