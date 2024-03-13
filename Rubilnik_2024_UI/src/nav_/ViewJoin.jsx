import { limits, local_store_user, user } from '../data.mjs';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


export const ViewJoin = (args) => {

    const [flag, set_flag] = useState(false)
    let navigate = useNavigate()
    function update(){ local_store_user(user); set_flag(!flag);}

    return (
        <div className='ViewJoin vstack'>
            <div>Name</div>
            <div className="spacer-default" />
            <input value={user.name} maxLength={limits.maxNameLength} onChange={(e)=>{
                user.name = e.target.value;
                update()
            }}/>

            <div className="spacer-default" />
            <div>Room</div>
            <div className="spacer-default" />
            <input placeholder="room key" minLength={limits.roomKeyLength} maxLength={limits.roomKeyLength} />
            <div className="spacer-default" />
            <button>Join</button>
        </div>
    );
};
