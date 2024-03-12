import { limits,store_user,user } from './data.mjs';
import { useState } from 'react';
import React from 'react';


export const ViewProfile = (args) => {
    
    const [flag, set_flag] = useState(false)
    function update(){ set_flag(!flag)}

    return <div className='ViewProfile'>
        <div>edit name</div>
        <div className='spacer-default'></div>
        <input value={user.name} maxLength={limits.maxNameLength} onChange={(e)=>{
            user.name = e.target.value
            store_user(user)
            update();
        }}/>
        <div className='spacer-default'></div>
        <button onClick={()=>{
            let user = JSON.parse(localStorage.getItem('self-user') || '{}') 
            console.log(user);
            
            
            fetch('http://192.168.0.103:3000/user', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            }).then(res=>{
                res.ok? (
                    ocalStorage.removeItem('self-user'),
                    window.location.href = '/'
                ) : alert('res not')
            }).catch(error => {
                alert("Can't connect to the server\nYou can log out without saving")
                console.log('error ',error);
            })
        }}>log out</button>
    </div>;
};