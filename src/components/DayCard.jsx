import React, { useRef, useState } from 'react'
import { MealCard } from './MealCard'
import './style/DayCard.css'
import { BiDumbbell } from 'react-icons/bi';
import { FaHamburger } from "react-icons/fa";

export const DayCard = ({ data, openDelete, menu = true }) => {
    const [show, setShow] = useState(false)
    const [section, setSection] = useState(false)
    const xpos = useRef(false)
    const day = useRef(new Date(data[0].date).toLocaleDateString("es-AR", { weekday: "long" }))

    const toogleShow = (n) => {
        setShow(current => {
            if (current === n) return false
            else return n
        })
    }

    const handleDrag = (e) => {
        if (e.clientX === 0) {
            xpos.current = false
            return
        }
        console.log("X: " + e.clientX)
        if (!xpos.current) {
            xpos.current = e.clientX
        } else {
            !section && (xpos.current + 10 > e.clientX) && setSection(true)
            section && (xpos.current + 10 < e.clientX) && setSection(false)
        }

    }

    return (
        <div className='daycard-outer-container card-style' onDrag={handleDrag}>
            <b onClick={() => setSection(() => !section)}>{`${day.current} ${data.length > 1 ? (!!data[2] ? '(desbalanceado)' : '(balanceado)') : ''}`}</b>

            <div className={`daycard-sections-container ${section ? 'section-two' : ''}`}>
                <div className="daycard-inner-container">
                    {data.map((e, i) => (
                        i < 2 && <MealCard i={i} data={e} key={e._id}
                            menu={menu}
                            openDelete={openDelete}
                            setShow={() => toogleShow(e._id)}
                            showing={!show || show === e._id} />
                    ))}
                    {data.length === 1 &&
                        <div className={`daycard-missing-meal ${show ? 'dc-mm-off' : ''}`}>
                            <p>segunda comida no registrada</p>
                        </div>}
                </div>

                <div className="daycard-inner-container testingcard">
                    <p><b>Desayuno:</b> blablabla, blablabla, blablabla, blablabla, blabla, blablabla + blabla</p>
                    <p><b>Merienda:</b> blablabla, blablabla, blablabla, blablabla, blablabla, blabla, blablabla + blabla</p>
                    <br />
                    <div>
                        <p>
                            <BiDumbbell />
                            <b>Actividad:</b>
                            5
                        </p>

                        <p>
                            <FaHamburger />
                            <b>Permitidos:</b>
                            2/5
                        </p>
                    </div>
                </div>
            </div>

            <div className='daycard-section-indicator'>
                <div className={section ? 'indicator-off' : 'indicator-on'}></div>
                <div className={section ? 'indicator-on' : 'indicator-off'}></div>
            </div>
        </div>
    )
}
