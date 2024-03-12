import { Choice, Question, Quiz } from './classes.mjs';
import { useState } from 'react';
import React from 'react';
import { alert_limit, limits,store_user,user } from './data.mjs';
import { ViewQuestionList } from './ViewQuestionList';
import { Footer } from './Footer';
import addSvg from './assets/add.svg'
import deleteSvg from './assets/delete.svg'

/**
 * @param {{set_view, question:Question, quiz:Quiz}} args 
 * @returns 
 */
export const ViewQuestionEdit = ({set_view, question, quiz}) => {
    const [flag, set_flag] = useState(false)
    function update() {
        store_user(user)
        set_flag(!flag)
    }
    return (
        <div className='ViewQuestionEdit'>

            <h3>Edit Title</h3>

            <input value={question?.text} maxLength={limits.maxTextLength} onChange={(e) => {
                question.text = e.target.value
                update()
            }} style={{width:'100%'}} />

            <h3>Choices</h3>
            {question.choices.map((choice, index) => {
                return (
                    <div className='hstack' style={{width: '50%'}}>
                        <input type="checkbox" style={{width:'1.3em', flexShrink:0}} name={'correct-selection'} checked={choice.isCorrect} onClick={() => {
                            choice.isCorrect = !choice.isCorrect;
                            update()
                            console.log(question.choices);
                        }} />
                        <input value={choice.text} maxLength={limits.maxTextLength} onChange={(e) => {
                            choice.text = e.target.value
                            update()
                            console.log(choice.text);
                            console.log(choice);
                        }} style={{flexGrow:1}}/>
                        <button onClick={() => {
                            question.choices.splice(index, 1)
                            update()
                        }}>
                            <img src={deleteSvg} className='icon' alt="" />
                        </button>
                    </div>
                )
            })}

            <Footer bottom={'1.5cm'}>
                <div className="buttons-container">
                    <button onClick={()=>{
                        set_view(()=>()=>ViewQuestionList({set_view, quiz}))
                    }}>Back</button>
                    <button onClick={() => {
                        question.choices.length < limits.maxChoices ? question.choices.push(new Choice('new', false)) : alert_limit()
                        update()
                    }}>
                        <img src={addSvg} className='icon' />
                    </button>
                </div>
            </Footer>

        </div>
    );
};
