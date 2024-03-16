import { limits,local_store_user,user } from '../data.mjs';
import { useState } from 'react';
import React from 'react';
import { SERVER_URL } from '../main';
import { useNavigate } from 'react-router-dom';


export const ViewProfile = (args) => {
    const [flag, set_flag] = useState(false)
    let navigate = useNavigate()
    function update(){ set_flag(!flag)}

    return <div className='ViewProfile'>
        <div>edit name</div>
        <div className='spacer-default'></div>
        <input value={user.name} maxLength={limits.maxNameLength} onChange={(e)=>{
            user.name = e.target.value
            local_store_user(user)
            update();
        }}/>
        <div className='spacer-default'></div>
        <button id='logoutB' onClick={v=>{
            document.getElementById('logoutB').hidden = true
            let load = document.createElement('div')
            load.innerHTML = '...'

            document.getElementById('logoutB').after(load);


            let user = JSON.parse(localStorage.getItem('self-user') || '{}') 
            console.log(user);
            
            fetch(SERVER_URL+'/user', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            }).then(res=>{
                if (res.ok){ 
                    localStorage.removeItem('self-user'),
                    window.location.href = '/'
                } else if (confirm('Failed to put data\nLeave without saving?')) {
                    localStorage.removeItem('self-user')
                }
            }).catch(e => {
                if (confirm("Can't connect to the server\nLog out without saving?")) {
                    localStorage.removeItem('self-user')
                }
            }).finally(() => {
                if (localStorage.getItem('self-user')) {
                    document.getElementById('logoutB').hidden = false
                    load.remove()
                } else {
                    window.location.href = '/login'
                }
            })
        }}>log out</button>
    </div>;
};