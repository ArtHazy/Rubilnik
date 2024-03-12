import { useState } from "react"
import { ViewQuestionEdit } from "./ViewQuestionEdit"
import { ViewQuizEdit } from "./ViewQuizEdit"
import { Question } from "./classes.mjs"
import { SERVER_URL } from "./App"
import play_svg from  "./assets/play.svg"
import add_svg from  "./assets/add.svg"
import { Footer } from "./Footer"

/**
 * 
 * @param {{set_view, questions: Question[]}} args 
 */
export const ViewQuestionList = (args)=>{
    const [flag, set_flag] = useState(false)
    function update() {
        set_flag(!flag)
    }
    return(
        <div className="ViewQuestionList">
            {args.questions.map((question,index)=>
                <div className="hstack">
                    <button onClick={()=>{
                        args.set_view(()=>()=>ViewQuestionEdit({question, index})) 
                    }}>
                        <div className="listItem hstack">
                            {index+1}
                            <div className="spacer-default"></div>
                            {question.text}
                        </div>
                    </button>
                    <button onClick={()=>{
                        args.questions.splice(index, 1)
                        update()
                    }}><svg className='icon' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg></button>
                </div>
            )}

            

            <Footer bottom='1.5cm'>
                <div className="buttons-container">

                    <button onClick={()=>{
                        console.log(args.questions);
                        args.questions.push(new Question('new',[]))
                        update()
                    }}><img src={add_svg} className="icon"/></button>
                    <button onClick={()=>{
                        fetch(SERVER_URL+'/hi', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify({message: 'hi'})
                        }).then(res=>{
                            res.ok? alert('ok') : alert('fail')
                        }).catch(e=>{console.log(e.message);})
                    }}>Hi</button>
                    <button onClick={()=>{
                        fetch(SERVER_URL+'/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify({message: 'hi'})
                        }).then(res=>{
                            res.ok? alert('ok') : alert('fail')
                        }).catch(e=>{console.log(e.message);})
                    }}><img src={play_svg} className="icon"/></button>
                </div>
            </Footer>
        </div>
    )
}