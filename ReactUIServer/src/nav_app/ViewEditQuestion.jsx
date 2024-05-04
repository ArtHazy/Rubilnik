import { Choice, Question, Quiz } from '../classes.mjs';
import { useState } from 'react';
import React from 'react';
import { alert_limit, limits,local_store_user,user } from '../data.mjs';
import addSvg from '../assets/add.svg'
import deleteSvg from '../assets/delete.svg'
import { useNavigate } from 'react-router-dom';

/**
 * @param {{set_view, question:Question, quiz:Quiz}} args 
 * @returns 
 */
export const ViewEditQuestion = ({set_view, question, quiz}) => {
    const [flag, set_flag] = useState(false)
    let navigate = useNavigate()
    function update() {
        local_store_user(user)
        set_flag(!flag)
    }

    return (
        <div className='ViewQuestionEdit'>

            <input value={question?.text} maxLength={limits.maxTextLength} onChange={(e) => {
                question.text = e.target.value
                update()
            }} style={{width:'100%'}} />

            <h4 style={{textAlign:'center'}}>Choices</h4>
            {question.choices.map((choice, index) => 
                <div className="choice">
                    <input id={`checkbox ${index}`} type="checkbox" style={{width:'1.3em', flexShrink:0}} name={'correct-selection'} checked={choice.isCorrect} onClick={() => {
                        choice.isCorrect = !choice.isCorrect;
                        update()
                        console.log(question.choices);
                    }} />
                    <input className={'choice-text ' + (choice.isCorrect? "correct":null) } value={choice.text} maxLength={limits.maxTextLength} onChange={(e) => {
                        choice.text = e.target.value
                        update()
                        console.log(choice.text);
                        console.log(choice);
                    }}/>
                    <button onClick={() => {
                        question.choices.splice(index, 1)
                        update()
                    }}>
                        <img src={deleteSvg} className='icon' alt="delete" />
                    </button>
                </div>
            )}

            {question.choices.length < limits.maxChoices? 
                <button onClick={() => {
                    question.choices.length < limits.maxChoices ? question.choices.push(new Choice('new', false)) : alert_limit()
                    update()
                }} className='add-question'>
                    <img src={addSvg} alt='add' className='icon' />
                </button>
                :null
            }
                
        </div>
    );
};
