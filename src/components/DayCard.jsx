import React, { useRef, useState } from 'react'
// import { usePlate } from '../plate-context'
import { MealCard } from './MealCard'
import './style/DayCard.css'

export const DayCard = ({ data, openDelete }) => {
    // ! BORRAR usar data en vez de week.friday
    // const { state: { week } } = usePlate()

    const [show, setShow] = useState(false)
    const day = useRef(new Date(data[0].date).toLocaleDateString("es-AR", { weekday: "long" }))

    const toogleShow = (n) => {
        setShow(current => {
            if (current === n) return false
            else return n
        })
    }

    return (
        <div className='daycard-outer-container card-style'>
            <b>{`${day.current} ${data.length > 1 ? (!!data[2] ? '(desbalanceado)' : '(balanceado)') : ''}`}</b>
            <div className="daycard-inner-container">
                {data.map((e, i) => (
                    i < 2 && <MealCard i={i} data={e} key={e._id}
                        openDelete={openDelete}
                        setShow={() => toogleShow(e._id)}
                        showing={!show || show === e._id} />
                ))}
            </div>
        </div>
    )
}
