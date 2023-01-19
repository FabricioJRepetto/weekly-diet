import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { usePlate } from '../plate-context'
import { setCookie } from './helpers/cookies'
import { Spinner } from './Spinner'
import LoadingHints from './LoadingHints'
import { hour } from './helpers/hour'

import './style/LogInScreen.css'

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env

const LogInScreen = () => {
    const { dispatch, state: { loading } } = usePlate()
    const [message, setmessage] = useState('')

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
                payload: data
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
            <h1 className={`logo ${hour()}`}>Diet Mate</h1>
            {loading &&
                <>
                    <Spinner />
                    <LoadingHints />
                </>}
            <div className={loading ? 'transparent' : ''}>
                {message && <b>{message}</b>}
                <div id='googleButtonDiv'></div>
            </div>
        </div>
    )
}

export default LogInScreen