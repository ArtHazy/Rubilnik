import { useState } from "react"
import { ViewEditQuestion } from "./ViewEditQuestion"
import { Question, Quiz } from "../classes.mjs"
import play_svg from  "../assets/play.svg"
import add_svg from  "../assets/add.svg"
import back_svg from "../assets/back.svg"
import { ViewActions } from "./Controls"
import { local_store_user, user } from "../data.mjs"
import { json, useLocation, useNavigate } from "react-router-dom"
import { Denied } from "../Denied"
import { downloadObj } from "../load"


/**
 * 
 * @param {{set_view, quiz:Quiz, quizInd:number}} args 
 */
export const ViewEditQuiz = ({set_view,quiz,quizInd})=>{
    const [flag, set_flag] = useState(false)
    const [focus, set_focus] = useState(-1)
    const {state} = useLocation()
    quiz = state?.quiz

    if (!quiz) {
        return <Denied/>
    } else {
        let navigate = useNavigate()

        function update() {
            console.log('qqq',user.quizzes[quizInd]);
            user.quizzes[quizInd] = quiz
            console.log('qqq1',user.quizzes[quizInd]);
            local_store_user(user)
            set_flag(!flag)
        }
        console.log('quiz',quiz);
    
        return(
            <div className="ViewQuestionList">
                <input value={quiz.title} onChange={v=>{
                    quiz.title = v.target.value
                    update()
                }} style={{width:'100%'}}/>
                <h3 style={{width:'100%', textAlign:'center'}}>Questions</h3>
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
    
                <ViewActions>
                    
                    <button onClick={()=>{
                        console.log(quiz.questions);
                        quiz.questions.push(new Question('new',[]))
                        update()
                    }}><img src={add_svg} className="icon"/></button>
                    
                    <button onClick={()=>{ // start host
                        navigate(`/play/${user.id}`, {state: {quiz, ind: quizInd}})
                    }}><img src={play_svg} className="icon"/></button>
                    <button onClick={()=>{
                        downloadObj(quiz)
                    }}>
                        download
                    </button>
                    <label htmlFor="file-input">
                        upload
                    </label>
                    <input style={{display:"none"}} id="file-input" type="file" onChange={(e)=>{
                        let input = e.target;
                        alert('file changed')
                        let fr = new FileReader();
                        fr.readAsText(e.target.files[0])
                        fr.onload = (e) => {
                            let ft = e.target.result
                            try {
                                console.log(ft);
                                let json = JSON.parse(ft);
                                console.log('loaded json',json);
                                let q = new Quiz();
                                q.loadData(json)
                                quiz = q;
                                console.log('formed quiz',quiz);
                                input.value = null
                                update()
                            } catch (e) {
                                alert('invalid json');
                            }
                            
                        }
                        
                    }}>
                    </input>
                </ViewActions>
            </div>
        )
    }
    

    
}