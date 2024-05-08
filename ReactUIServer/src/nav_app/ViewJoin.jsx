import { limits, local_store_user } from '../data.mjs';
import { useState } from 'react';
import React from 'react';
import { json, useNavigate } from 'react-router-dom';


export const ViewJoin = (args) => {
    // console.log('render');

    const [flag, set_flag] = useState(false)
    const [focus, set_focus] = useState(null)
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

    let keyInputContainer = document.createElement('div')
    let inputs = new Array(limits.roomKeyLength).fill( function(){
        return <input type="text" maxLength={1} style={{textTransform:'uppercase', margin:'.1cm',width:'.9cm', height:'1.3cm', fontSize:'.6cm'}} onChange={(e)=>{
            e.target.value.length==1? e.target.nextElementSibling?.focus() : null
            e.target.value.length==0? e.target.previousElementSibling?.focus() : null
        }}/>
    }())
    keyInputContainer.append(inputs)

    console.log(inputs);
    let inputl = new Array(4).fill(null)
    return (
        <div className='ViewJoin vstack'>
            
            <div>Name</div>
            <div className="spacer-default" />

            <input value={user? user.name : guest.name} maxLength={limits.maxNameLength} onChange={(e)=>{
                user? user.name = e.target.value : guest.name = e.target.value
                rerender()
            }}/>            

            <div className="spacer-default" />
            <div>Room</div>
            <div className="spacer-default" />

            <div id="roomKeyInputs" className='hstack'>{inputs}</div>

            {/* <input id='key-input' placeholder="room key" minLength={limits.roomKeyLength} maxLength={limits.roomKeyLength} /> */}
            <div className="spacer-default" />

            <button className='big' onClick={()=>{
                guest?.name === ''? guest.name = 'faceless' : null
                rerender()
                // retrieve key
                let roomKey = '';
                let keyInputs = document.getElementById('roomKeyInputs').childNodes
                keyInputs.forEach((val)=>{roomKey+=val.value})
                if (roomKey.length != limits.roomKeyLength) { alert('Invalid room key length')}
                else {navigate(`/play/${roomKey}`)}

                
                //navigate(`/play/${document.getElementById('key-input').value}`)
            }}>Join</button>
        </div>
    );
};
