import { limits } from '../data.mjs';
import { SERVER_URL } from '../nav_/App';

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
                <button id='submit' onClick={() => {
                    let submit = document.getElementById('submit');
                    submit.hidden = true;
                    let load = document.createElement('div');
                    load.innerHTML = '/..'
                    submit.after(load)

                    let username = document.getElementById('username-input').value;
                    let password = document.getElementById('password-input').value;
                    let email = document.getElementById('email-input').value;

                    
                    fetch(SERVER_URL+'/user', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: username, email: email, password: password
                        })
                    }).then(res => {
                        res.json().then(json =>{
                            console.log(json);
                            res.ok ? (
                                localStorage.setItem('self-user', JSON.stringify(json)), window.location.href='/',
                                alert ('registered')
                                ) : alert('error')
                        })
                    }).catch(e => {
                        alert(e.message)
                        load.remove()
                        submit.hidden = false
                    })

                }}>Register</button>
                <div className='spacer-default'></div>

                <a href="/login">
                    <button>Login</button>
                </a>

            </div>
        </div>
    )
}
