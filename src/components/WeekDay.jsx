import React, { useRef, useState } from 'react'
import PlateCard from './PlateCard'

import './style/Week.css'

//! RECORDAR: data[2] tiene una descripción de 
//! por qué el plato está desbalanceado
export const WeekDay = ({ data, openDelete }) => {
    const [show, setShow] = useState(false)
    const day = useRef(new Date(data[0].date).toLocaleDateString("es-AR", { weekday: "long" }))

    const toogleShow = (n) => {
        setShow(current => {
            if (current === n) return false
            else return n
        })
    }

    return (
        <div className='day-container card-style fade-in'>
            <b>{`${day.current} ${data.length > 1 ? (!!data[2] ? '(desbalanceado)' : '(balanceado)') : ''}`}</b>
            <div>
                {data.map((e, i) =>
                    i < 2 && <PlateCard key={e._id} data={e} i={i}
                        setShow={() => toogleShow(e._id)}
                        showing={!show || show === e._id}
                        openDelete={openDelete} />
                )}
            </div>
        </div>
    )
}
