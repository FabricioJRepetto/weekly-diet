import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { usePlate } from '../plate-context'
import { setCookie } from './helpers/cookies'
import { Spinner } from './Spinner'
import LoadingHints from './LoadingHints'

import './style/LogInScreen.css'

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env

const LogInScreen = () => {
    const { dispatch, state: { loading } } = usePlate()
    const [message, setmessage] = useState('')
    const [loginin, setLoginin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPw, setRepeatPw] = useState('')

    const login = async (e) => {
        e.preventDefault()
        if (!loginin && password !== repeatPw) {
            setmessage(() => 'las contraseñas no coinciden')
            return
        }
        dispatch({ type: 'loading', payload: true })
        const { data } = await axios.post(`/user/${loginin ? 'login' : 'signup'}`,
            {
                password,
                email
            }
        )
        if (data.error) setmessage(() => data.error)
        else {
            setmessage(() => 'Bienvenido!')
            setCookie('autoLogin', data.token, 7)
            setTimeout(() => {
                dispatch({ type: 'login', payload: data.user_id })
            }, 2000);
        }
    }

    const handleGoogleLogin = async (res) => {
        dispatch({ type: 'loading', payload: true })
        const token = res.credential
        //const userData = jwtDecode(res.credential)

        const { data } = await axios.post(`/user/googlelogin`, { token })
        if (!data.error) {
            //? guarda token en cookies?
            setCookie('autoLogin', data.token, 7)
            dispatch({
                type: 'login',
                payload: data.id
            })
        } else {
            setmessage(data.message)
        }
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: REACT_APP_GOOGLE_CLIENT_ID,
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
        <div className='login-container'>
            <h1 className='logo'>Diet Mate</h1>
            {loading &&
                <>
                    <Spinner />
                    <LoadingHints />
                </>}
            <div className={loading ? 'transparent' : ''}>
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
        </div>
    )
}

export default LogInScreen