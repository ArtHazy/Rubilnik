import { limits } from './data.mjs';

export const ViewLogin = () => {
    return (
        JSON.parse(localStorage.getItem('self-user'))? window.location.href='/app' :
        <div className='ViewLogin'>
            <div>
                <div style={{ fontSize: '2em' }}>LOGIN</div>

                <div>
                    <input id="email-input" type="email" value='0000' placeholder='email' maxLength={limits.maxEmailLength} />
                    <div className='spacer-default'></div>
                    <input id="password-input" type="password" placeholder='password' maxLength={limits.maxPasswordLength} />
                </div>
                <button onClick={() => {
                    let email = document.getElementById('email-input').value;
                    let password = document.getElementById('password-input').value;


                    fetch('http://192.168.0.103:3000/user/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: email, 
                            password: password
                        })

                    }).then(res => {
                        res.json().then(json => {
                            res.ok ? (localStorage.setItem('self-user', JSON.stringify(json)), window.location.href='/app') : alert('failure')
                        })
                    })
                }}>login</button>
                <div className='spacer-default'></div>
                <a href="/register">
                    <button>register</button>
                </a>

            </div>
        </div>
    )
}
export const ViewRegister = () => {
    return (
        <div className='ViewRegister'>
            <div>
                <div style={{ fontSize: '2em' }}>REGISTER</div>

                <div>
                    <input id="username-input" type="text" placeholder='username' maxLength={limits.maxNameLength} />
                    <div className='spacer-default'></div>
                    <input id="email-input" type="email" placeholder='email' maxLength={limits.maxEmailLength} />
                    <div className='spacer-default'></div>
                    <input id="password-input" type="password" placeholder='password' maxLength={limits.maxPasswordLength} />
                </div>
                <button onClick={() => {
                    let username = document.getElementById('username-input').value;
                    let password = document.getElementById('password-input').value;
                    let email = document.getElementById('email-input').value;

                    
                    fetch('http://192.168.0.103:3000/user', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: username, email: email, password: password
                        })
                    }).then(res => {
                        res.json().then(json =>{
                            console.log(json);
                            res.ok ? (
                                localStorage.setItem('self-user', JSON.stringify(json)), window.location.href='/app',
                                alert ('registered')
                                ) : alert('error')
                        })
                    })

                }}>Register</button>
                <div className='spacer-default'></div>

                <a href="/">
                    <button>Login</button>
                </a>

            </div>
        </div>
    )
}
