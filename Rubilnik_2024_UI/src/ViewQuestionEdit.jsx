import { Choice, Question, Quiz } from './classes.mjs';
import { useState } from 'react';
import React from 'react';
import { alert_limit, limits,store_user,user } from './data.mjs';
import { ViewQuestionList } from './ViewQuestionList';

/**
 * @param {{set_view, question:Question, questionInd: number}} args 
 * @returns 
 */
export const ViewQuestionEdit = (args) => {
    const [flag, set_flag] = useState(false)
    function update() {
        store_user(user)
        set_flag(!flag)
    }
    return (
        <div className='ViewQuestionEdit'>
            <div>{args.question.text || 'untitled'}</div>
            <div className='spacer-default'></div>
            <input value={args.question?.text} maxLength={limits.maxTextLength} onChange={(e) => {
                args.question.text = e.target.value
                update()
            }} />

            <div className='spacer-default'></div>

            {args.question.choices.map((choice, index) => {
                return (
                    <div className='hstack'>
                        <input type="checkbox" name={args.questionInd + '-correct-selection'} checked={choice.isCorrect} onClick={() => {
                            choice.isCorrect = !choice.isCorrect;
                            update()
                            console.log(args.question.choices);
                        }} />
                        <input value={choice.text} maxLength={limits.maxTextLength} onChange={(e) => {
                            choice.text = e.target.value
                            update()
                            console.log(choice.text);
                            console.log(choice);

                        }} />
                        <button style={{ border: 0, padding: 0, margin: 0, height: 'fit-content', width: 'fit-content', boxSizing: 'border-box', background: 'transparent' }} onClick={() => {
                            args.question.choices.splice(index, 1)
                            update()
                        }}>
                            <svg className='icon' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
                        </button>
                    </div>
                )
            })}

            <div className='buttons-container'>

                <button style={{ border: 0, padding: 0, margin: 0, height: 'fit-content', width: 'fit-content', boxSizing: 'border-box', background: 'transparent' }} onClick={() => {
                    args.question.choices.length < limits.maxChoices ? args.question.choices.push(new Choice('new', false)) : alert_limit()
                    update()
                }}>
                    <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                </button>
                

                <div></div>

            </div>
        </div>
    );
};
