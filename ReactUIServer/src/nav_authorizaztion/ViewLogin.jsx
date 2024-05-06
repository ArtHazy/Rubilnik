import { useState } from 'react';
import { limits } from '../data.mjs';
import { SERVER_URL } from '../main';

//import banner from '../assets/banner/banner.html'


export const ViewLogin = () => {

    const [flag, setFlag] = useState(false)
    function update() {
        setFlag(!flag)
    }

    return (
        JSON.parse(localStorage.getItem('self-user'))? window.location.href='/' :
        <div className='ViewLogin'>
            {/* <img width='250' height='125' src="https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/61f35a8548933c4ce4cc0daa/1643338381475/HelloLight_Mac.png?format=1500w" alt="welcome banner" /> */}
            {/* <iframe src={banner} ></iframe> */}

                {/* <iframe src={SERVER_URL+'/banner.html'} style={{marginBottom:'2cm', width:'100%', maxWidth:'500px' , height:'300px', borderRadius:'.5cm' , flexShrink:0}} ></iframe> */}
            
            <div className='login-block'>
                <div className='hstack'>
                    <div className='log accent'>LOG</div>
                    <div className='in accent'>IN</div>     
                </div>
                <div>
                    <input id="email-input" type="email" placeholder='email' maxLength={limits.maxEmailLength} />
                    <div className='spacer-default'></div>
                    <input id="password-input" type="password" placeholder='password' maxLength={limits.maxPasswordLength} />
                </div>
                <div className='spacer-default'></div>
                <button id='submit' onClick={() => {
                    let submit = document.getElementById('submit');
                    submit.hidden = true;
                    let load = document.createElement('div')
                    load.innerHTML = '/..'
                    submit.after(load)

                    let email = document.getElementById('email-input').value;
                    let password = document.getElementById('password-input').value;


                    fetch(SERVER_URL+'/user/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: email, 
                            password: password
                        })
                    }).then(res => {
                        res.json().then(json => {
                            res.ok ? (localStorage.setItem('self-user', JSON.stringify(json)), window.location.href='/') : alert('failure')
                        })
                    }).catch(e=>{
                        alert(e.message)
                    }).finally(()=>{
                        load.remove()
                        submit.hidden = false
                    })
                }}>login</button>
                <div className='spacer-default'></div>
                <a href="/register">
                    <small>register</small>
                </a>
                <div className="spacer-default"></div>
                <a href="/join">
                    <small>join the game</small>
                </a>

            </div>


            

            
        </div>

    )
}