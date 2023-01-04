import React from 'react'
import { usePlate } from '../plate-context'
import LastMeal from './LastMeal'
import { WeekDay } from './WeekDay'

import './style/Week.css'
import { Counter } from './Counter'

const WeekSummary = () => {
    const {
        state: { week }
    } = usePlate()

    return (
        <div className='weeksummary-container'>
            {week.vegetalC && <div className='your-week card-style'>
                <b>Tu semana:</b>
                <div>Permitidos: {<Counter num={0} max={5} />}</div>
                <div>Vegetales C: {<Counter num={week.vegetalC} max={4} />}</div>
            </div>}

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