import React, { useState, useEffect } from 'react'
import { useRef } from 'react'

import './style/loading.css'

const Loading = () => {
    const [dots, setDots] = useState('')
    const inter = useRef(null)

    useEffect(() => {
        inter.current = setInterval(() => {
            setDots(current => {
                if (current.length > 2) {
                    return ''
                } else {
                    return current + '.'
                }
            })
        }, 500);

        return () => clearInterval(inter.current)
    }, [])

    return (
        <span className='dots'>
            <b>HH</b>
            <p>{dots}</p>
        </span>

    )
}

export default Loading