import { alert_limit, limits, quiz_gl, local_store_user, user } from '../data.mjs';
import { useState, useLayoutEffect } from 'react';
import { Quiz } from '../classes.mjs';
import React from 'react';
import { ViewActions } from './Controls';
import add_svg from '../assets/add.svg'
import delete_svg from '../assets/delete.svg'
import { ViewEditQuiz } from './ViewEditQuiz';
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

                {user.quizzes?.map((quiz, qInd) => {
                    return (
                        <div className='tile' style={{width:'100%'}}>
                            <button className='quiz-button'  onClick={()=>{
                                console.log(quiz);
                                navigate('/edit-quiz', {state: {quiz, qInd}})

                                // set_view(callView(()=>ViewEditQuiz( {set_view, quiz, quizInd: qInd} ), `Edit quiz`) )
                            }} style={{flexGrow:1}}> {quiz.title}

                                

                            </button>

                            <div className="dropdown">
                                ...
                                <div className="content">
                                    <button className='b-delete'  onClick={()=>{
                                        user.quizzes.splice(qInd, 1);
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

            <ViewActions>
                <button onClick={() => {
                    !user.quizzes ? user.quizzes = [] : null
                    user.quizzes.length < limits.maxQuizes ? user.quizzes.push(new Quiz('new', [])) : alert_limit()
                    update()
                }}>
                    <img className='icon' src={add_svg} alt="add icon" />
                </button>
            </ViewActions>

        </div>
    );
};
