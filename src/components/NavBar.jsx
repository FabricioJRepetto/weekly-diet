import React, { useState } from 'react'
import { usePlate } from '../plate-context'
import { deleteCookie } from './helpers/cookies'
import { BiLogOut, BiMenu, BiArrowToRight } from 'react-icons/bi'

import './style/NavBar.css'

export const NavBar = () => {
    const [open, setOpen] = useState(false)
    const { dispatch } = usePlate();

    const logout = () => {
        deleteCookie('autoLogin')
        dispatch({ type: 'logout' })
    }

    return (
        <div className='navbar-container'>
            <b>Dieta semanal</b>
            <button className='icon-button' onClick={() => setOpen(!open)}>
                {open
                    ? <BiArrowToRight className='icon i-white' />
                    : <BiMenu className='icon i-white' />
                }
            </button>
            <div className={`navbar-menu ${open && 'navbar-menu-open'}`}>
                <div>
                    <p>option#1</p>
                    <p>option#2</p>
                    <p>option#3</p>
                </div>
                <p onClick={logout}>
                    <BiLogOut className='icon i-margin' />
                    Cerrar sesión
                </p>
            </div>
        </div>
    )
}
