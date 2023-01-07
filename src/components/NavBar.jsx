import React, { useState } from 'react'
import { usePlate } from '../plate-context'
import { deleteCookie } from './helpers/cookies'
import { BiLogOut, BiMenu, BiArrowToRight } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import './style/NavBar.css'

export const NavBar = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { dispatch, state: { session } } = usePlate();

    const logout = () => {
        setOpen(false)
        deleteCookie('autoLogin')
        dispatch({ type: 'logout' })
    }

    const go = (rout) => {
        setOpen(false)
        navigate(rout)
    }

    return (
        <div className={`navbar-container ${session ? 'navbar' : ''}`}>
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
                    <p onClick={() => go('/customFoods')}>Mis preparaciones</p>
                    <p onClick={() => go('/checkpoint')}>Controles</p>
                    <p className='nav-disabled' onClick={() => undefined}>Configuración</p>
                </div>
                <p onClick={logout}>
                    <BiLogOut className='icon i-margin' />
                    Cerrar sesión
                </p>
            </div>
        </div>
    )
}
