/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { Quiz } from "../classes.mjs"

/**
 * 
 * @param {{quiz: Quiz}}
 * @returns 
 */
const Game = ({isHost, quiz, socket, roomId}) => {
  const colors = ["#709B95", "#F08A5D", "#B83B5E", "#D9D9D9"]
  const wrongColors = ["#4A605D", "#8A5741", "#6E3041", "#7F7F7F"]
  const letters = ["А", "Б", "В", "Г"]

  const [currentQuestionInd, setCurrrentQuestionInd] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)

  const [revealed, setRevealed] = useState(false)
  const isLastQ = (currentQuestionInd == quiz?.questions.length-1)

  // isHost
  const scores = []
  // quiz

  useEffect(() => {
    console.log(socket);
    isHost? socket.emit('next',({roomId, questionInd: currentQuestionInd, question: quiz?.questions[currentQuestionInd]})) 
    : null

    socket.on('next',({questionInd, question})=>{
      console.log(questionInd);
      alert('next')
      setCurrentQuestion(question)
      console.log(question);
      setCurrrentQuestionInd(questionInd)
    })
    
    socket.on('reveal',(args)=>{
      setRevealed(true);
    })

  },[])

  function renderChoices() {
    return currentQuestion?.choices.map((choice,ind) => 
      <div key={JSON.stringify(choice)} style={{backgroundColor: colors[ind]}} className="answer">  
        {choice.text}
        <div className="letter">{letters[ind]}</div>
      </div>)
    }
    
  function renderRevealedChoices() {
    return currentQuestion?.choices.map((choice, ind)=>
      <div key={JSON.stringify(choice)} 
        style={(choice.isCorrect ? {backgroundColor: colors[ind]} : {backgroundColor: wrongColors[ind]})} className="answer">
        {choice.text}
        <div className="letter">{letters[ind]}</div>
      </div>)
  }

    

  return (
    <div className="game_geometry">
      <div className="head">
        <div className="question_title">{currentQuestion?.text}</div>
        <div className="question_numbers">{currentQuestionInd+1}/{quiz?.questions.length}</div>
      </div>
      <div className="body">
        <div className={"question " + (window.innerWidth>window.innerHeight? "wide ":null) }>{ revealed ? renderRevealedChoices() : renderChoices()}</div>
      </div>

      {isHost? <button onClick={()=>{
        setRevealed(true)
      }}>reveal</button> 
      : null}

      {isHost? <button className="question_next_btn" onClick={()=>{
        console.log('click');
        console.log(socket);
        console.log(roomId);
        console.log(socket.id);

        if (!isLastQ){
          console.log(socket.emit('next', {roomId, questionInd: currentQuestionInd+1, question: quiz.questions[currentQuestionInd+1]}))
        } else {
          socket.emit('result', {roomId, scores} )
        }

        // !isLastQ? (console.log(hi), socket.emit('next', {roomId, questionInd: currentQuestionInd+1, question: quiz.questions[currentQuestionInd+1], choices}) )
        // : socket.emit('result', {roomId, scores} )
      }}> {!isLastQ? 'Next' : 'Finish'} </button> 
      : null}
    </div>
  )
}

export default Game
