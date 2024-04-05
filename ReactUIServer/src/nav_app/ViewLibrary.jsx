import { alert_limit, limits, quiz_gl, local_store_user, user } from '../data.mjs';
import { useState, useLayoutEffect } from 'react';
import { Quiz } from '../classes.mjs';
import React from 'react';
import { Footer } from './Footer';
import add_svg from '../assets/add.svg'
import delete_svg from '../assets/delete.svg'
import { ViewQuestionList } from './ViewQuestionList';
import { useNavigate } from 'react-router-dom';
import { callView } from "./App";

/**
 * @param {{set_view}} 
 * @returns 
 */
export const ViewLibrary = ({set_view}) => {

    const [flag, set_flag] = useState(false)
    const [focus, set_focus] = useState(null)

    function update() {local_store_user(user);set_flag(!flag)}
    let navigate = useNavigate()
    
    // useLayoutEffect(() => {
    //     let scrollView = document.getElementById('view-container')
    //     console.log('scroll height ' + scrollView?.scrollHeight);
    //     scrollView ? scrollView.scrollTop = scrollView.scrollHeight : null
    // }, [flag])


    return (
        <div className='ViewLibrary'>
            <div className='grid-tile-container'>

                {user.quizzes?.map((quiz, index) => {
                    return (
                        <div className='tile' style={{width:'100%'}}>
                            <button className='quiz-button'  onClick={()=>{
                                set_view(callView(()=>ViewQuestionList( {set_view, quiz, quizInd: index} ), `Edit quiz: ${quiz.title} `) )
                            }} style={{flexGrow:1}}> {quiz.title}

                                

                            </button>

                            <div className="controls-dropdown">
                                ...
                                <div className="content">
                                    <button className='b-delete'  onClick={()=>{
                                        user.quizzes.splice(index, 1);
                                        update()
                                    }}>
                                        delete
                                        {/* <img src={delete_svg} className='icon'></img> */}
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    )
                })}

            </div>
            <Footer bottom='3em'>
                <div className='buttons-container view-actions'>
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
