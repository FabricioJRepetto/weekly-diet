import React from 'react'
import { usePlate } from '../plate-context'
import LastMeal from './LastMeal'
import PlateCard from './PlateCard'

import './style/Week.css'

const WeekResume = () => {
    const {
        state: { week }
    } = usePlate()

    return (
        <div>
            <h2>Tu semana:</h2>
            {week.today?.length === 1 && <LastMeal />}

            <section className='week-container'>
                {week.monday && <div className='day-container'>
                    <b onClick={() => week.monday[2] ? console.log(week.monday[2]) : undefined}>{`Lunes ${week.monday.length > 1 ? (week.monday[2] ? '(desbalanceado)' : '(balanceado)') : ''}`}</b>
                    <div>
                        {week.monday.map((e, i) =>
                            i < 2 && <PlateCard key={e._id}
                                data={e} />
                        )}
                    </div>
                </div>}
                {week.tuesday && <div className='day-container'>
                    <b onClick={() => week.tuesday[2] ? console.log(week.tuesday[2]) : undefined}>{`Martes ${week.tuesday.length > 1 ? (week.tuesday[2] ? '(desbalanceado)' : '(balanceado)') : ''}`}</b>
                    <div>
                        {week.tuesday.map((e, i) =>
                            i < 2 && <PlateCard key={e._id}
                                data={e} />
                        )}
                    </div>
                </div>}
                {week.wednesday && <div className='day-container'>
                    <b onClick={() => week.wednesday[2] ? console.log(week.wednesday[2]) : undefined}>{`Miercoles ${week.wednesday.length > 1 ? (week.wednesday[2] ? '(desbalanceado)' : '(balanceado)') : ''}`}</b>
                    <div>
                        {week.wednesday.map((e, i) =>
                            i < 2 && <PlateCard key={e._id}
                                data={e} />
                        )}
                    </div>
                </div>}
                {week.thursday && <div className='day-container'>
                    <b onClick={() => week.thursday[2] ? console.log(week.thursday[2]) : undefined}>{`Jueves ${week.thursday.length > 1 ? (week.thursday[2] ? '(desbalanceado)' : '(balanceado)') : ''}`}</b>
                    <div>
                        {week.thursday.map((e, i) =>
                            i < 2 && <PlateCard key={e._id}
                                data={e} />
                        )}
                    </div>
                </div>}
                {week.friday && <div className='day-container'>
                    <b onClick={() => week.friday[2] ? console.log(week.friday[2]) : undefined}>{`Viernes ${week.friday.length > 1 ? (week.friday[2] ? '(desbalanceado)' : '(balanceado)') : ''}`}</b>
                    <div>
                        {week.friday.map((e, i) =>
                            i < 2 && <PlateCard key={e._id}
                                data={e} />
                        )}
                    </div>
                </div>}
                {week.saturday && <div className='day-container'>
                    <b onClick={() => week.saturday[2] ? console.log(week.saturday[2]) : undefined}>{`Sabado ${week.saturday.length > 1 ? (week.saturday[2] ? '(desbalanceado)' : '(balanceado)') : ''}`}</b>
                    <div>
                        {week.saturday.map((e, i) =>
                            i < 2 && <PlateCard key={e._id}
                                data={e} />
                        )}
                    </div>
                </div>}
                {week.sunday && <div className='day-container'>
                    <b onClick={() => week.sunday[2] ? console.log(week.sunday[2]) : undefined}>{`Domingo ${week.sunday.length > 1 ? (week.sunday[2] ? '(desbalanceado)' : '(balanceado)') : ''}`}</b>
                    <div>
                        {week.sunday.map((e, i) =>
                            i < 2 && <PlateCard key={e._id}
                                data={e} />
                        )}
                    </div>
                </div>}
            </section>
        </div>
    )
}

export default WeekResume