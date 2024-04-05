/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { Quiz } from "../classes.mjs"

let user = JSON.parse(localStorage.getItem('self-user'))
  console.log('user', user);
let guest = JSON.parse(localStorage.getItem('self-guest'))
  console.log('guest', guest);

/**
 * 
 * @param {{quiz: Quiz}}
 * @returns 
 */
const ViewGame = ({isHost, quiz, socket, roomId}) => {
  const [isLayoutV, setIsLayoutV] = useState(window.innerWidth<window.innerHeight)
  window.onresize = () => {
    if (window.innerWidth<window.innerHeight) setIsLayoutV(true)
    else setIsLayoutV(false)
  }

  const colors = ["#709B95", "#F08A5D", "#B83B5E", "#D9D9D9"]
  const wrongColors = ["#4A605D", "#8A5741", "#6E3041", "#7F7F7F"]
  const letters = ["А", "Б", "В", "Г"]

  const [currentQuestionInd, setCurrrentQuestionInd] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)



  const [isRevealed, setIsRevealed] = useState(false)
  const isLastQ = (currentQuestionInd == quiz?.questions.length-1)

  // isHost
  // quiz

  useEffect(() => {
    console.log(socket);
    isHost? socket.emit('next',({roomId, questionInd: currentQuestionInd, question: quiz?.questions[currentQuestionInd]})) 
    : null

    socket.on('next',({questionInd, question})=>{
      setIsRevealed(false)
      setCurrrentQuestionInd(questionInd)
      setCurrentQuestion(question)
    })
    
    socket.on('reveal',({correctChoicesInd})=>{
      setIsRevealed(true);
      console.log('revealed', isRevealed);
    })

  },[])

  function renderChoices() {
    return currentQuestion?.choices.map((choice,choiceInd) => 
      isHost? 
        <div key={JSON.stringify(choice)} style={{backgroundColor: colors[choiceInd],}} className={"answer "+(!isLayoutV? "wide ":null)} >  
          {choice.text}
          <div className="letter">{letters[choiceInd]}</div>
        </div>
      :
        <button key={JSON.stringify(choice)} style={{backgroundColor: colors[choiceInd]}} className={"answer "+(!isLayoutV? "wide ":null)} onClick={()=>{
          socket.emit('choice', ({roomId, userId: user? user.id : (guest? guest.id : null), questionInd: currentQuestionInd, choices: [choiceInd] }))
        }}>  
          {choice.text}
          <div className="letter">{letters[choiceInd]}</div>
        </button>
    )}
    
  function renderRevealedChoices() {
    return currentQuestion?.choices.map((choice, ind)=>
      <div key={JSON.stringify(choice)} 
        style={(choice.isCorrect ? {backgroundColor: colors[ind]} : {backgroundColor: wrongColors[ind]})} className={"answer "+(!isLayoutV? "wide ":null)} >
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
        <div className={"question " + (isLayoutV? null : "wide ") }>{ isRevealed ? renderRevealedChoices() : renderChoices()}</div>
      </div>
      <div className="action-buttons">
        {isHost? <button onClick={()=>{
          setIsRevealed(true)
          let correctChoicesInd = []
          quiz.questions[currentQuestionInd].choices.forEach((choice, index)=>{
            choice.isCorrect? correctChoicesInd.push(index) : null
          })

          socket.emit('reveal', {roomId, correctChoicesInd})
        }}>reveal</button> 
        : null}

        {isHost? <button className="question_next_btn" onClick={()=>{
          !isLastQ? socket.emit('next', {roomId, questionInd: currentQuestionInd+1, question: quiz.questions[currentQuestionInd+1]})
          :         socket.emit('end', {roomId} )
        }}> {!isLastQ? 'Next' : 'End'} </button> 
        : null}
      </div>

    </div>
  )
}

export default ViewGame
