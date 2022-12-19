import React from 'react'
import { usePlate } from '../plate-context'
import PlateCard from './PlateCard'

import './style/Week.css'

const WeekResume = () => {
    const {
        dispatch,
        state: {
            history
        }
    } = usePlate()

    //: ordenar comidas en pares por día
    //: buscar la ultima comida de hoy (si hay)

    return (
        <div>
            <h2>Tu semana:</h2>
            {history.length > 1 &&
                <>
                    <p>Ultima comida de hoy</p>
                    <PlateCard key={'lastMeal'}
                        data={history.at(-1)} />
                </>
            }
            <section className='week-container'>{
                history.length > 0 && history.map(m =>
                    <PlateCard key={m.date}
                        data={m} />
                )
            }</section>
        </div>
    )
}

export default WeekResume