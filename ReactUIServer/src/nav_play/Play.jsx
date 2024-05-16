/* eslint-disable react-hooks/exhaustive-deps */
import { json, useLocation, useParams } from "react-router-dom";
import bg_w from '../assets/bg_w.png';
import bg_b from '../assets/bg_b.png';
import ViewLobby from "./ViewLobby";
import { useEffect, useState } from "react";
import {ViewResult} from "./ViewResult";
import { io } from "socket.io-client";
import { SERVER_URL } from "../main";
import ViewGame from "./ViewGame";



export const Play = () => {
  const {state} = useLocation()
  const isHost = state? true: false
  const [gameState, setGameState] = useState('lobby')
  const [socket, setSocket] = useState(null)
  const { roomId } = useParams()
  const quiz = state?.quiz
  const [roommates, setRoommates] = useState({})
  const [joined, setJoined] = useState(false)
  let user = JSON.parse(localStorage.getItem('self-user'))
  let guest = JSON.parse(localStorage.getItem('self-guest'))


  console.log(socket)
  useEffect(() =>{
    let usersChoices = {}
    let socket = io(SERVER_URL)
    setSocket(socket)

    let userName = user? user.name : guest?.name
    let userId = user? user.id : guest?.id
    socket.emit(isHost? 'create' : 'join', {roomId, userName, userId} )

    socket.on('join', ({userName, userId, roommates})=>{
      //alert(userId+" "+userName+' joined')
      console.log(roommates);
      setRoommates(roommates)
      
    });
  
    socket.on('leave', ({userName, userId, socketId, roommates})=>{
      setRoommates(roommates)
    });
  
    socket.on('bark', ({msg}) => { setTimeout( ()=>{alert(msg)},1 ) });
    
    socket.on('create',()=>{
      //alert('room created')
    });

    socket.on('start',()=>{
      setGameState('in progress')
    })
    socket.on('end',({})=>{
      setGameState('finished')
    })
    socket.on('next',()=>{
      setGameState('in progress')
    })
    socket.on('joined',({roommates, guestId})=>{
      console.log('guestId', guestId);
      guest? guest.id = guestId : null
      console.log(guest);
      localStorage.setItem('self-guest', JSON.stringify(guest))
      console.log(localStorage.getItem('self-guest'));
      //alert('joined')
      setRoommates(roommates)
      setJoined(true)
    })

    guest? socket.on('disconnect',()=>{
      delete guest.id 
      localStorage.setItem('self-guest', JSON.stringify(guest))
    }) : null

    // map player's choices for later evaluation
    if (isHost){
      socket.on('choice',({userId, questionInd, choices})=>{
        !usersChoices[userId]? usersChoices[userId] = [] : null
        usersChoices[userId][questionInd] = choices
        console.log('usersChoices:', usersChoices)
      })
    }

    return () => {
      socket.off();
      socket.disconnect();
    };

  }, []);


  console.log(socket);
  if (!socket || !socket.connected) 
  return <div>
    failed to connect
    <button onClick={()=>{window.location.reload()}}>retry</button>
  </div>
    
    return <div className="Play">

      {!joined? <div> failed to join the room. Maybe it doesn't exist </div> : null}
      {joined && gameState === 'lobby' ? <ViewLobby isHost={isHost} socket={socket} roomId={roomId}/> : null}
      {joined && gameState === 'in progress' ? <ViewGame isHost={isHost} socket={socket} roomId={roomId} quiz={quiz} setGameState={setGameState}/>: null}
      {joined && gameState === 'finished' ? <ViewResult isHost={isHost} socket={socket} roomId={roomId} quiz={quiz} usersChoices={usersChoices} roommates={roommates} /> : null}

      
      <button onClick={()=>{
        socket.emit('bark', {userName: user?.name, guestName: guest?.name})
      }}>bark</button>
      <div className="connected-counter"> 
        connected players: { Object.keys(roommates).length } 
      </div>
      <div className="hstack display-connected">
        { Object.keys(roommates).map((userId) =>
          <div className="hstack user_card ">
            <div> {roommates[userId]?.name}</div>
          </div>
        )}
        {console.log(roommates)}
      </div>
    </div>
}