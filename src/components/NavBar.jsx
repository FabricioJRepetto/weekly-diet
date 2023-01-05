import React, { useState } from 'react'
import { usePlate } from '../plate-context'
import { deleteCookie } from './helpers/cookies'
import { BiLogOut, BiMenu, BiArrowToRight } from 'react-icons/bi'

import './style/NavBar.css'

export const NavBar = () => {
    const [open, setOpen] = useState(false)
    const { dispatch, state: { session } } = usePlate();

    const logout = () => {
        setOpen(false)
        deleteCookie('autoLogin')
        dispatch({ type: 'logout' })
    }

    const test = () => {
        setOpen(!open)
    }

    return (
        <div className={`navbar-container ${session ? 'navbar' : ''}`}>
            <b>Diet mate</b>
            <button className='icon-button' onClick={() => setOpen(!open)}>
                {open
                    ? <BiArrowToRight className='icon i-white' />
                    : <BiMenu className='icon i-white' />
                }
            </button>
            <div className={`navmenu-closer ${open ? 'navmenu-closer-on' : ''}`}
                onClick={test}></div>
            <div className={`navbar-menu ${open && 'navbar-menu-open'}`}>
                <div>
                    <p>{'[Historal]'}</p>
                    <p>{'[Mis preparaciones]'}</p>
                    <p>{'[Agregar control]'}</p>
                    <p>{'[Configuración]'}</p>
                </div>
                <p onClick={logout}>
                    <BiLogOut className='icon i-margin' />
                    Cerrar sesión
                </p>
            </div>
        </div>
    )
}
