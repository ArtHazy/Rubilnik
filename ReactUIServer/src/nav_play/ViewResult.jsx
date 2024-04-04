/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { Quiz } from "../classes.mjs"

/**
 * 
 * @param {{usersChoices:{}, quiz:Quiz}} param0 
 * @returns 
 */
const ViewResult = ({usersChoices: usersQuestionsChoices, isHost, roomId, socket, quiz, roommates}) => {

  const [usersScores, setUsersScores] = useState([])

  useEffect(() => {

    socket.on('scores',({usersScores})=>{
      console.log('scores received', usersScores);
      setUsersScores(usersScores)
    })


    if (isHost) {
    
      // [questionInd: [0, 3, correct choices]]
      let questionsCorrectChoices = quiz.questions.map((question)=> {
        
        // [0, 3 correct choices indexes of the question] 
        let questionCorrectChoices = []
        
        question.choices.forEach((choice, index)=>{
          if (choice.isCorrect) questionCorrectChoices.push(index)
        })
        return questionCorrectChoices
      }) 
      console.log('questionsCorrectChoices', questionsCorrectChoices);
  
      
      // calculate and sort users scores
      let usersScores = []
      Object.keys(usersQuestionsChoices).forEach(userId => {
        // [questionInd: [0, 3, choices]]
        let userQuestionsChoices = usersQuestionsChoices[userId]
        console.log(userQuestionsChoices);
        let userScore = 0
  
        if (Array.isArray(userQuestionsChoices)){
          userQuestionsChoices.forEach((userQuestionChoices, index)=>{
            let questionCorrectChoices = questionsCorrectChoices[index]
            console.log('questionCorrectChoices', questionCorrectChoices);
            if (Array.isArray(userQuestionChoices)) {
              let userCorrectQuestionChoices = userQuestionChoices.filter((value,index)=>questionCorrectChoices.includes(value))
              console.log('userCorrectQuestionChoices', userCorrectQuestionChoices);
              userScore += userCorrectQuestionChoices.length / questionCorrectChoices.length
            }
          })
        }
        usersScores.push({userId, userScore})
      })
      usersScores.sort((a,b)=>a.userScore - b.userScore)
      console.log(usersScores);
      socket.emit('scores', {roomId, usersScores})
    }
  },[])



  

  return (
    <div className="game_geometry">
      <div className="user-scores">
        <div className="user-score">
          <div>place</div>
          <div>name</div>
          <div>score</div>
        </div>
        {console.log('roommates', roommates)}
        
        {
        // display scores for all users
        usersScores.map((entry, index)=>
          <div key={index} className="user-score">
            <div className={index == 0 ? "index first" : "index"}>{index + 1}</div>
            <div className={index == 0 ? "name first" : "name"}>{roommates[entry.userId]?.id + " : " + roommates[entry.userId]?.name}</div>
            <div className={index == 0 ? "score first" : "score"}>{entry.userScore}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewResult