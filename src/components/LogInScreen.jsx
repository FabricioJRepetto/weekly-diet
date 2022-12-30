import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import jwtDecode from 'jwt-decode'
import { BACK_URL } from '../constants'
import { usePlate } from '../plate-context'
import { setCookie } from './helpers/cookies'

import './style/LogInScreen.css'

const LogInScreen = () => {
    const { dispatch } = usePlate()
    const [loginin, setLoginin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPw, setRepeatPw] = useState('')
    const [message, setmessage] = useState('')

    const login = async (e) => {
        e.preventDefault()
        if (!loginin && password !== repeatPw) {
            setmessage(() => 'las contraseñas no coinciden')
            return
        }
        const { data } = await axios.post(`${BACK_URL}/user/${loginin ? 'login' : 'signup'}`,
            {
                password,
                email
            }
        )
        console.log(data)
        if (data.error) setmessage(() => data.error)
        else {
            setmessage(() => 'Bienvenido!')
            setTimeout(() => {
                dispatch({ type: 'login', payload: data.user_id })
            }, 2000);
        }
    }

    const handleGoogleLogin = async (res) => {
        const token = res.credential
        //const userData = jwtDecode(res.credential)

        const { data } = await axios.post(`${BACK_URL}/user/googlelogin`, { token })
        if (!data.error) {
            //: guardar token?
            setCookie('autoLogin', token, 7)
            dispatch({
                type: 'login',
                payload: data.id
            })
        }
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleGoogleLogin
        });
        google.accounts.id.renderButton(
            document.getElementById("googleButtonDiv"),
            // { theme: "outline", size: "large" }  // customization attributes
            {
                type: "standard",
                size: "large",
                width: 240,
                text: "continue_with",
                theme: "outline",
                shape: "square"
            }
        );
        // google.accounts.id.prompt(); // also display the One Tap dialog

        // eslint-disable-next-line
    }, [])


    return (
        <div>
            <h3>{`hola :)`}</h3>
            {<form onSubmit={login} className='login-form' >
                <input type="text"
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password"
                    autoComplete='off'
                    onChange={(e) => setPassword(e.target.value)} />
                {!loginin &&
                    <input type="password"
                        autoComplete='off'
                        onChange={(e) => setRepeatPw(e.target.value)} />}
                <button>{loginin ? 'iniciar sesion' : 'crear cuenta'}</button>
            </form>}
            {message && <b>{message}</b>}
            <br />
            <b onClick={() => setLoginin(!loginin)}>{!loginin ? '...o iniciar sesion' : '...o crear cuenta'}</b>
            <br />
            <br />
            <p>o inicia con google</p>
            <div id='googleButtonDiv'></div>
        </div>
    )
}

export default LogInScreen