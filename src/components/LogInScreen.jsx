import React, { useState } from 'react'
import axios from 'axios'
import { BACK_URL } from '../constants'
import { usePlate } from '../plate-context'

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
        if (password !== repeatPw) {
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
        </div>
    )
}

export default LogInScreen