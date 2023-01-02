import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Fork } from "../assets/svg/utensils-01.svg";
import { ReactComponent as Knife } from "../assets/svg/utensils-02.svg";
import { ReactComponent as Spoon } from "../assets/svg/utensils-03.svg";

import './style/Spinner.css'

export const Spinner = () => {
    const interval = useRef(null)
    const [svg, setSvg] = useState(1)

    useEffect(() => {
        if (!interval.current) {
            setTimeout(() => {
                interval.current = setInterval(() => {
                    setSvg(pre => {
                        if (pre < 3) return pre + 1
                        else return 1
                    })
                }, 3000)
            }, 1000)
        }

        return () => clearInterval(interval.current)
    }, [])

    return (
        <div className='spinner-container'>
            <div className='utensil'>
                {svg === 1 && <Fork className='svg-img' />}
                {svg === 2 && <Knife className='svg-img' />}
                {svg === 3 && <Spoon className='svg-img' />}
            </div>
            <div></div>
        </div>
    )
}
