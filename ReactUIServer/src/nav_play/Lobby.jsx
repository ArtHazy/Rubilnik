/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

const Lobby = ({users, passStartFlag, roomId, socket}) => {
  console.log('socket', socket);

  if (socket){
    return (
      <div className="lobby game_geometry">
        <div className="user_count"> <div className="room_id">{roomId}</div><div className="room_helptext">connection code</div></div>
        {/* <div className="user_card_wrapper gray_scroll">{renderUsers()}</div> */}
        <button className="start_button" onClick={() => passStartFlag(true)}>START</button>
      </div>
    )
  } else {
    return <div>
      Failed to connect socket
    </div>
  }
  

}

export default Lobby