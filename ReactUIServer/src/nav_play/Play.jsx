/* eslint-disable react-hooks/exhaustive-deps */
import { json, useLocation, useParams } from "react-router-dom";
import bg_w from '../assets/bg_w.png';
import bg_b from '../assets/bg_b.png';
import ViewLobby from "./ViewLobby";
import { useEffect, useState } from "react";
import ViewResult from "./ViewResult";
import { io } from "socket.io-client";
import { SERVER_URL } from "../main";
import { Header } from "../nav_app/Header";
import ViewGame from "./ViewGame";



const Play = () => {
  const {state} = useLocation()
  //console.log('render');

  const [gameState, setGameState] = useState('lobby')
  const isHost = state? true: false
  
  
  const [socket, setSocket] = useState(null)
  const [count, setCount] = useState(0)
  
  const { roomId } = useParams()
  
  const quiz = state?.quiz
  const [roommates, setRoommates] = useState({})

  const [usersChoices, setUsersChoices] = useState({})
  const [joined, setJoined] = useState(false)
  



  let user = JSON.parse(localStorage.getItem('self-user'))
  console.log('user', user);
  let guest = JSON.parse(localStorage.getItem('self-guest'))

  
  
  


  console.log(socket)
  useEffect(() =>{

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
      alert(userId|socketId +" "+userName+' left')
      setRoommates(roommates)
    });
  
    socket.on('bark', ({msg}) => {alert(msg)});
    
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
    socket.on('joined',({roommates})=>{
      guest? guest.id = socket.id : null
      localStorage.setItem('self-guest', JSON.stringify(guest))
      //alert('joined')
      setRoommates(roommates)
      setJoined(true)
    })

    guest? socket.on('disconnect',()=>{
      delete guest.id 
      localStorage.setItem('self-guest', JSON.stringify(guest))
    }) : null
    


    // map player's choices for later evaluation
    isHost? 
      socket.on('choice',({userId, questionInd, choices})=>{
        console.log('usersChoices:', usersChoices)
        !usersChoices[userId] ? usersChoices[userId] = [] : usersChoices[userId][questionInd] = choices
      })
    : null


    return () => {
      socket.off();
      socket.disconnect();
    };

  }, []);



  

  console.log(socket);
  if (!socket || !socket.connected) return <div>failed to connect<button onClick={()=>{setCount(count+1)}}>{count}</button></div>
    
    return <div className="Play">

      {/* <Header>{(gameState!=='lobby'? roomId+" " : null) + socket.id}</Header> */}


      {!joined? <div> failed to join the room. Maybe it doesn't exist </div> : null}
      {joined && gameState === 'lobby' ? <ViewLobby isHost={isHost} socket={socket} roomId={roomId}/> : null}
      {joined && gameState === 'in progress' ? <ViewGame isHost={isHost} socket={socket} roomId={roomId} quiz={quiz} setGameState={setGameState}/>: null}
      {joined && gameState === 'finished' ? <ViewResult isHost={isHost} socket={socket} roomId={roomId} quiz={quiz} usersChoices={usersChoices} roommates={roommates} /> : null}

      



      {/* <button onClick={()=>socket.emit('bark', {userName: user?.name | guest?.name })}>
        bark
      </button>
      <button onClick={()=>{setCount(count+1)}}>{count}</button> */}

      <div className="connected-counter"> connected players: { Object.keys(roommates).length } </div>

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

export default Play