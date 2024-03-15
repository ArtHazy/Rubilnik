import { alert_limit, limits, quiz_gl, local_store_user, user } from '../data.mjs';
import add_svg from '../assets/add.svg'
import delete_svg from '../assets/delete.svg'
import play_svg from '../assets/play.svg'
import React, {useState} from 'react';
import { Question, Quiz } from '../classes.mjs';
import { Footer } from './Footer';
import { ViewQuestionEdit } from './ViewQuestionEdit';
import { useNavigate } from 'react-router-dom';

/**
 * @param {{quiz:Quiz, set_view_name}} args 
 * @returns 
 */
export const ViewQuizEdit = (args) => {
    const [flag, update_flag] = useState(false)
    let navigate = useNavigate()
    const [question_ind, set_question_ind] = useState(0)
    function update() { local_store_user(user); update_flag(!flag)}
    let questions = args.quiz.questions

    return (
        <div className='ViewQuizEdit'>
            <div className="view" style={{width:'50%'}}>
                <div className='view'>
                    <div>Quiz title</div>
                    <div className='spacer-default'></div>
                    <input value={args.quiz.title} maxLength={limits.maxTextLength} onClick={(e) => {
                    }} onChange={(e) => {
                        args.quiz.title = e.target.value
                        update()
                    }} />
                </div>

                <div style={{minWidth:'90vw', minHeight:'max-content'}}>
                    {questions[question_ind]? <ViewQuestionEdit question={questions[question_ind]} quiz={args.quiz} questionInd={question_ind} updateQuizEditView={update} /> : null}
                </div>

                {questions[question_ind]? 
                <div className='hstack'>
                    <select id='select-question' value={question_ind} onChange={(e)=>{
                        set_question_ind(e.target.value)
                    }}>
                        {questions.map((question, index) =>{
                            return <option value={index}>Question {index}</option>
                        })}
                    </select>
                </div> : null}
            </div>

            <Footer bottom='3em'>
                <div className='buttons-container'>
                    <button onClick={() => {
                        quiz_gl.index != null ? user.quizzes?.splice(quiz_gl.index, 1) : null
                        update()
                        args.set_view_name(views.library.name)
                    }}>
                        <img className='icon' src={delete_svg} alt="delete icon" />
                    </button>
                    <button onClick={() => {
                        let questions = quiz_gl.quiz.questions
                        !questions ? questions = [] : null
                        questions.length < limits.maxQuestions ? questions.push(new Question('new', [])) : alert_limit()
                        update()
                    }}>
                        <img className='icon' src={add_svg} alt="add icon"/>
                    </button>
                    <button onClick={() => {
                        alert('start')
                    }}>
                        <img className='icon' src={play_svg} alt="play icon" />
                    </button>
                </div>
            </Footer>
        </div>
    );
};

