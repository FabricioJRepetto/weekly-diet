import React, { useEffect, useState, useRef } from 'react'

import './style/LoadingHints.css'

const LoadingHints = () => {
    const inter = useRef(null)
    const [text, setText] = useState(1)

    useEffect(() => {
        inter.current = setInterval(() => {
            setText(current => {
                console.log('hola');
                if (current === 8) return 0
                else return current + 1
            })
        }, 3000);

        return () => clearInterval(inter.current)
    }, [])

    return (
        <div className="hints-outer-container">
            <div className='hints-container'>
                <p className={`hint ${text === 1 && 'hint-on'}`}>conectando al servidor</p>
                <p className={`hint ${text === 2 && 'hint-on'}`}>iniciando sesión</p>
                <p className={`hint ${text === 4 && 'hint-on'}`}>limpiando cubiertos</p>
                <p className={`hint ${text === 5 && 'hint-on'}`}>sacudiendo migas de pan</p>
                <p className={`hint ${text === 6 && 'hint-on'}`}>pre calentando el horno</p>
                <p className={`hint ${text === 7 && 'hint-on'}`}>planchando manteles</p>
                <p className={`hint ${text === 8 && 'hint-on'}`}>haciendo flores con servilletas</p>
            </div>
        </div>
    )
}

export default LoadingHints