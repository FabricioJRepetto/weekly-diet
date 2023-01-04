import React from 'react'
import { usePlate } from '../plate-context'
import LastMeal from './LastMeal'
import { WeekDay } from './WeekDay'

import './style/Week.css'

const WeekSummary = () => {
    const {
        state: { week }
    } = usePlate()

    return (
        <div className='weeksummary-container'>
            <div className='your-week'>
                <h2>Tu semana:</h2>
                <p>Permitidos: 0/5</p>
                <p>Vegetales C: {week.vegetalC}/4</p>
            </div>

            {week.today?.length === 1 && <LastMeal />}

            <section className='week-container'>
                {week.monday && <WeekDay data={week.monday} />}
                {week.tuesday && <WeekDay data={week.tuesday} />}
                {week.wednesday && <WeekDay data={week.wednesday} />}
                {week.thursday && <WeekDay data={week.thursday} />}
                {week.friday && <WeekDay data={week.friday} />}
                {week.saturday && <WeekDay data={week.saturday} />}
                {week.sunday && <WeekDay data={week.sunday} />}
            </section>
        </div>
    )
}

export default WeekSummary