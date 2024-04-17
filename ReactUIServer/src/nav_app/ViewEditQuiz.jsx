import { useState } from "react"
import { ViewEditQuestion } from "./ViewEditQuestion"
import { Question, Quiz } from "../classes.mjs"
import play_svg from  "../assets/play.svg"
import add_svg from  "../assets/add.svg"
import back_svg from "../assets/back.svg"
import { ViewActions } from "./Controls"
import { local_store_user, user } from "../data.mjs"
import { useNavigate } from "react-router-dom"
import { callView } from "./App";
import { ViewLibrary } from "./ViewLibrary"



/**
 * 
 * @param {{set_view, quiz:Quiz, quizInd:number}} args 
 */
export const ViewEditQuiz = ({set_view,quiz,quizInd})=>{
    const [flag, set_flag] = useState(false)
    const [focus, set_focus] = useState(-1)

    let navigate = useNavigate()
    
    function update() {
        local_store_user(user)
        set_flag(!flag)
    }

    return(
        
        <div className="ViewQuestionList">
            <input value={quiz.title} onChange={v=>{
                quiz.title = v.target.value
                update()
            }} style={{width:'100%'}}/>

            <h3>Questions</h3>
            <div className="grid-questionList">
                {quiz.questions.map((question,index)=>[
                    <button className="question" onClick={()=>{ focus == index ? set_focus(-1) : set_focus(index) }}>  
                        <div className="index">{index}</div>
                        <div className="text">{question.text}</div>
                        <button className="b-delete" onClick={()=>{
                            focus == index ? set_focus(-1) : null
                            quiz.questions.splice(index, 1)
                            update()
                        }}>delete</button>
                    </button>,

                    <div className={"choices "+ (focus==index? null : "hidden") }>
                        <ViewEditQuestion set_view={set_view} question={question} quiz={quiz} />
                    </div>
                    ]
                )}
            </div>


            <button onClick={()=>{
                set_view(callView(()=>ViewLibrary({set_view}), 'Library'))
            }}>
                <img src={back_svg} alt="back" className='icon'/>
            </button>

            <ViewActions>
                
                <button onClick={()=>{
                    console.log(quiz.questions);
                    quiz.questions.push(new Question('new',[]))
                    update()
                }}><img src={add_svg} className="icon"/></button>
                
                <button onClick={()=>{ // start host
                    navigate(`/play/${user.id}`, {state: {quiz, ind: quizInd}})
                }}><img src={play_svg} className="icon"/></button>
            </ViewActions>
        </div>
    )
}