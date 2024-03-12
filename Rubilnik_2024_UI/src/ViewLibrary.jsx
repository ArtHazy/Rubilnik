import { alert_limit, limits, quiz_gl, store_user, user } from './data.mjs';
import { useState, useLayoutEffect } from 'react';
import { Quiz } from './classes.mjs';
import React from 'react';
import { Footer } from './Footer';
import add_svg from './assets/add.svg'
import delete_svg from './assets/delete.svg'
import { ViewQuestionList } from './ViewQuestionList';

/**
 * @param {{set_view}} args 
 * @returns 
 */
export const ViewLibrary = (args) => {

    const [flag, set_flag] = useState(false)
    function update() {
        store_user(user)
        set_flag(!flag)
    }

    // useLayoutEffect(() => {
    //     let scrollView = document.getElementById('view-container')
    //     console.log('scroll height ' + scrollView?.scrollHeight);
    //     scrollView ? scrollView.scrollTop = scrollView.scrollHeight : null
    // }, [flag])


    return (
        <div style={{alignItems:'normal'}} className='ViewLibrary'>
            <div className='grid-tile-container'>

                {user.quizzes?.map((quiz, index) => {
                    return (
                        <div className='hstack' style={{width:'100%'}}>
                            <button onClick={()=>{
                                args.set_view( ()=>()=>ViewQuestionList( {set_view: args.set_view, questions: quiz.questions, quiz} ) )
                            }} className='tile'> {quiz.title}
                            </button>
                            <button onClick={()=>{
                                user.quizzes.splice(index, 1);
                                update()
                            }}><img src={delete_svg} className='icon'></img></button>
                            
                        </div>
                    )
                })}

            </div>
            <Footer bottom='3em'>
                <div className='buttons-container'>
                    <button onClick={() => {
                        !user.quizzes ? user.quizzes = [] : null
                        user.quizzes.length < limits.maxQuizes ? user.quizzes.push(new Quiz('new', [])) : alert_limit()
                        update()
                    }}>
                        <img className='icon' src={add_svg} alt="add icon" />
                    </button>
                </div>
            </Footer>
        </div>
    );
};
