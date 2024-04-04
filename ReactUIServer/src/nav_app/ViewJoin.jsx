import { limits, local_store_user } from '../data.mjs';
import { useState } from 'react';
import React from 'react';
import { json, useNavigate } from 'react-router-dom';


export const ViewJoin = (args) => {
    // console.log('render');

    const [flag, set_flag] = useState(false)
    let navigate = useNavigate()

    function rerender(){ 
        user? localStorage.setItem('self-user', JSON.stringify(user)) 
        :     localStorage.setItem('self-guest', JSON.stringify(guest))
        set_flag(!flag);
    }

    
    let user = JSON.parse(localStorage.getItem('self-user'))
    console.log('user', user);
    let guest = JSON.parse(localStorage.getItem('self-guest'))
    user || guest ? null : guest = {}
    user && guest ? guest = null : null


    return (
        <div className='ViewJoin vstack'>
            <div>Name</div>
            <div className="spacer-default" />

            <input value={user? user.name : guest.name} maxLength={limits.maxNameLength} onChange={(e)=>{
                user? user.name = e.target.value : guest.name = e.target.value
                rerender()
            }}/>
            <button onClick={()=> {rerender()}}>rerender</button>
            

            <div className="spacer-default" />
            <div>Room</div>
            <div className="spacer-default" />

            <input id='key-input' placeholder="room key" minLength={limits.roomKeyLength} maxLength={limits.roomKeyLength} />
            <div className="spacer-default" />

            <button onClick={()=>{
                guest?.name === ''? guest.name = 'faceless' : null
                rerender()
                navigate(`/play/${document.getElementById('key-input').value}`)
            }}>Join</button>
        </div>
    );
};
