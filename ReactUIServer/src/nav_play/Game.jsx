/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"


const Game = ({question, passNext, passReveal, length}) => {
    const colors = ["#709B95", "#F08A5D", "#B83B5E", "#D9D9D9"]
    const wrongColors = ["#4A605D", "#8A5741", "#6E3041", "#7F7F7F"]
    const letters = ["А", "Б", "В", "Г"]
    const [num, setNum] = useState(0)
  const [revealed, setRevealed] = useState(false)

    function renderAnswers() {
        let temp = []
        console.log('answers', question);
        for (let i = 0; i < question.choices.length; i++) {
          temp.push(<div key={JSON.stringify(question.choices[i])} 
          //(i == 2 && question.choices.length == 3) ? {backgroundColor: colors[i], left: "300px"} : 
          style={{backgroundColor: colors[i]}} className="answer">  
            {question.choices[i].text}
            <div className={i == 0 ? "letter" : i == 1 ? "letter" : i == 2 ? "letter" : "letter"}>{letters[i]}</div>
            </div>)
        }
        return temp
      }

      function renderRevealed() {
        let tempRev = []
        for (let i = 0; i < question.choices.length; i++) {
          tempRev.push(<div key={JSON.stringify(question.choices[i])} 
          style={(question.choices[i].isCorrect ? {backgroundColor: colors[i]} : {backgroundColor: wrongColors[i]})} className="answer">
            {question.choices[i].text}
            <div className={i == 0 ? "letter" : i == 1 ? "letter" : i == 2 ? "letter" : "letter"}>{letters[i]}</div>
            </div>)
        }
        return tempRev
      }

      const toPass = () => {
        setRevealed(true)
        passReveal(true)
        setTimeout(() => passNext(true), 4000)
      }

      useEffect(() => {
        setRevealed(false)
        setNum(num + 1)
      }, [question])
      

      // const toPassReveal = () => {
      //   setRevealed(true)
      //   passReveal(true)
      // }

  return (
    <div className="game_geometry">
      <div className="head">
        {/* {revealed ? answers.choices[answers.validIndex].text : ""} */}
        <div className="question_title">{question.text}</div>
        <div className="question_numbers">{num}/{length}</div>
      </div>
      <div className="body">
        <div className={"question " + (window.innerWidth>window.innerHeight? "wide ":null) }>{ revealed ? renderRevealed() : renderAnswers()}</div>
        {/*<div className="clock">120</div>*/}
        {/* <button className="absolute_tr space_top a_to_normal black" onClick={() => {toPassReveal()}}>ПОКАЗАТЬ</button> */}
      </div>
      <button className={"question_next_btn"} onClick={() => {toPass()}}>СЛЕДУЮЩИЙ</button>
    </div>

  )
}

export default Game
