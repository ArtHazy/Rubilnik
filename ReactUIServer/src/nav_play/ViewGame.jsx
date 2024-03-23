/* eslint-disable react-hooks/exhaustive-deps */
import { json, useLocation, useParams } from "react-router-dom";
import bg_w from '../assets/bg_w.png';
import bg_b from '../assets/bg_b.png';
import Lobby from "./Lobby";
import { useEffect, useState } from "react";
import Game from "./Game";
import Endgame from "./Endgame";
import { io } from "socket.io-client";
import { SERVER_URL } from "../main";
import { local_get_user, user } from "../data.mjs";
import { Header } from "../nav_app/Header";



const ViewGame = () => {
  //console.log('render');
  const [socket, setSocket] = useState(null)

  const [count, setCount] = useState(0)
  

  const { roomId } = useParams()
  const {state} = useLocation()
  const quiz = state?.quiz
  const isHost = state? true: false
  const [gameState, setGameState] = useState('lobby')
  const [scores, setScores] = useState(null)


  
  const [roommates, SetRoommates] = useState([])


  console.log(socket)
  useEffect(() =>{
    console.log('effect')

    

    let socket = io(SERVER_URL)
    console.log(socket)
    setSocket(socket)


    socket.emit(isHost? 'create' : 'join', {roomId, userName: user.name, userId: user.id} )

    socket.on('join', ({userName, userId, roommates})=>{
      alert(userId+" "+userName+' joined')
      SetRoommates(roommates)
      
    });
  
    socket.on('leave', ({userName, userId, socketId, roommates})=>{
      alert(userId|socketId +" "+userName+' left')
      SetRoommates(roommates)
    });
  
    socket.on('bark', ({msg}) => {alert(msg)});
    
    socket.on('create', ()=>{alert('room created')});

    socket.on('start',(args)=>{
      setGameState('in progress')
    })
    socket.on('result',({scores})=>{
      setScores(scores)
      setGameState('finished')
    })
    socket.on('next',()=>{
      setGameState('in progress')
    })
    

    isHost? socket.on('choice', ({userId, choiceInd, questionInd})=>{
      !revealed? calculateChoice(userId, choiceInd, questionInd) : null
    })
    : null

    return () => {
      socket.off();
      socket.disconnect();
    };

  }, []);



  

  console.log(socket);
  if (!socket || !socket.connected) return <div>failed to connect<button onClick={()=>{setCount(count+1)}}>{count}</button></div>
    
    return <div className="ViewGame">

      <Header>{socket.id}</Header>

      {gameState === 'lobby' ? <Lobby isHost={isHost} socket={socket} roomId={roomId}/> : null}
      {gameState === 'in progress' ? <Game isHost={isHost} socket={socket} roomId={roomId} quiz={quiz} setGameState={setGameState}/>: null}
      {gameState === 'finished' ? <Endgame scores={scores}/> : null}



      <button onClick={()=>socket.emit('bark', {userName: user.name})}>
        bark
      </button>
      <button onClick={()=>{setCount(count+1)}}>{count}</button>

      <div style={{left:0, right:0, margin:'auto' }}>connected players: {roommates?.length} </div>

      <div className="hstack" style={{overflow: 'scroll'}}>
        {roommates?.map((player)=>
          <div className="user_card hstack" style={{width:'fit-content'}}>
            <div>{player.userName}</div>
          </div>
        )}
      </div>

    </div>
}

export default ViewGame