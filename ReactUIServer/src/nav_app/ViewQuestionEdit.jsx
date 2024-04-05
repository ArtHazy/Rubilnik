import { Choice, Question, Quiz } from '../classes.mjs';
import { useState } from 'react';
import React from 'react';
import { alert_limit, limits,local_store_user,user } from '../data.mjs';
import { ViewQuestionList } from './ViewQuestionList';
import { Footer } from './Footer';
import addSvg from '../assets/add.svg'
import backSvg from '../assets/back.svg'
import deleteSvg from '../assets/delete.svg'
import { useNavigate } from 'react-router-dom';
import { callView } from "./App";

/**
 * @param {{set_view, question:Question, quiz:Quiz}} args 
 * @returns 
 */
export const ViewQuestionEdit = ({set_view, question, quiz}) => {
    const [flag, set_flag] = useState(false)
    let navigate = useNavigate()
    function update() {
        local_store_user(user)
        set_flag(!flag)
    }

    return (
        <div className='ViewQuestionEdit'>

            <div>Edit Title</div>

            <input value={question?.text} maxLength={limits.maxTextLength} onChange={(e) => {
                question.text = e.target.value
                update()
            }} style={{width:'100%'}} />

            <div>Choices</div>
            <div className="choice-grid">
                {question.choices.map((choice, index) => [
                    <input id={`checkbox ${index}`} type="checkbox" style={{width:'1.3em', flexShrink:0}} name={'correct-selection'} checked={choice.isCorrect} onClick={() => {
                        choice.isCorrect = !choice.isCorrect;
                        update()
                        console.log(question.choices);
                    }} />,
                    <input className={'choice ' + (choice.isCorrect? "correct":null) } value={choice.text} maxLength={limits.maxTextLength} onChange={(e) => {
                        choice.text = e.target.value
                        update()
                        console.log(choice.text);
                        console.log(choice);
                    }}/>,
                    <button onClick={() => {
                        question.choices.splice(index, 1)
                        update()
                    }}>
                        <img src={deleteSvg} className='icon' alt="delete" />
                    </button>
                ])}
            </div>

            <button onClick={() => {
                question.choices.length < limits.maxChoices ? question.choices.push(new Choice('new', false)) : alert_limit()
                update()
            }}>
                <img src={addSvg} alt='add' className='icon' />
            </button>


            {/* <Footer bottom={'3em'}>
                <div className="buttons-container">
                    <button onClick={()=>{
                        set_view(callView(()=>ViewQuestionList({set_view, quiz}), `Edit quiz: ${quiz.title}`))
                    }}>
                        <img src={backSvg} alt="back" className='icon'/>
                    </button>
                    <button onClick={() => {
                        question.choices.length < limits.maxChoices ? question.choices.push(new Choice('new', false)) : alert_limit()
                        update()
                    }}>
                        <img src={addSvg} alt='add' className='icon' />
                    </button>
                </div>
            </Footer> */}

        </div>
    );
};
