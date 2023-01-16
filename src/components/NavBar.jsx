import React, { useRef, useState } from 'react'
import axios from 'axios'
import { usePlate } from '../plate-context'
import { deleteCookie } from './helpers/cookies'
import { BiLogOut, BiMenu, BiArrowToRight } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import './style/NavBar.css'

export const NavBar = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { dispatch, state: { session, user_name } } = usePlate();

    const logout = () => {
        setOpen(false)
        deleteCookie('autoLogin')
        dispatch({ type: 'logout' })
    }

    const go = (rout) => {
        setOpen(false)
        navigate(rout)
    }

    const migrateDataToV2 = async () => {
        const { data: old } = await axios('/history/migrate')
        console.log(old);
        if (old) {
            const { data } = await axios.post('/history/migrate2', { old: old.oldDays })
            console.log(data);
        }
    }

    const hour = () => {
        let aux = Math.round(new Date().getHours() * 4.16)
        // console.log(aux);
        return `${aux}%`
    }

    const elstyle = useRef(hour())

    return (
        <div className={`navbar-container fade-in ${session ? 'navbar' : ''}`}>

            <div className="testing-dynamic-color" style={{ backgroundPositionX: elstyle.current }}></div>

            <b className='navlogo' onClick={() => go('/')}>Diet mate</b>
            <button className='icon-button' onClick={() => setOpen(!open)}>
                {open
                    ? <BiArrowToRight className='icon i-white' />
                    : <BiMenu className='icon i-white' />
                }
            </button>
            <div className={`navmenu-closer ${open ? 'navmenu-closer-on' : ''}`}
                onClick={() => setOpen(!open)}></div>
            <div className={`navbar-menu ${open && 'navbar-menu-open'}`}>
                <div>
                    <p onClick={() => go('/history')}>Historal</p>
                    <p onClick={() => go('/checkpoint')}>Controles</p>
                    <p onClick={() => go('/customFoods')}>Mis preparaciones</p>
                    <p className='nav-disabled' onClick={() => undefined}>Configuración</p>
                </div>

                <div>
                    <p onClick={() => go('/testing')}>Testing</p>
                    {/* <p onClick={migrateDataToV2}>migrar datos a V2</p> */}

                    <i>usuario:</i>
                    <i>{user_name}</i>
                    <p onClick={logout}>
                        <BiLogOut className='icon i-margin-r' />
                        Cerrar sesión
                    </p>
                </div>
            </div>
        </div>
    )
}
