import React, { useEffect, useState } from 'react'
import { usePlate } from '../plate-context'
import axios from 'axios'
import LastMeal from './LastMeal'
import PlateCard from './PlateCard'
import { BACK_URL } from '../constants'

import './style/Week.css'

const WeekResume = () => {
    const {
        state: {
            history
        }
    } = usePlate()

    const [week, setWeek] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    })

    const defineWeek = () => {
        let hoy = new Date(),
            dia = (hoy.getDay() === 0) ? 7 : hoy.getDay(),
            firstDay = hoy.getDate() - (dia - 1),
            lastDay = new Date(new Date().setDate(firstDay + 6)).toLocaleDateString('en'),
            today = hoy.toLocaleDateString('en'),
            start = new Date(new Date().setDate(firstDay)).toLocaleDateString('en'),
            end = lastDay;

        return {
            today,
            start,
            end
        }
    }

    useEffect(() => {
        (async () => {
            let { today, start } = defineWeek()
            const { data } = await axios(`${BACK_URL}/history/week?today=${today}&start=${start}`)
            console.log(data)
            data.week && setWeek(() => data)
        })()

        // eslint-disable-next-line
    }, [])


    return (
        <div>
            <h2>Tu semana:</h2>
            {week.today?.length === 1 &&
                <LastMeal data={week.today[0]} />}

            <section className='week-container'>
                {!!week.monday.length && <div className='day-container'>
                    <b>{`Lunes (${week.monday[2] ? 'desbalanceado' : 'balanceado'})`}</b>
                    <div>
                        {week.monday.map((e, i) =>
                            i < 2 && <PlateCard key={e.date + i}
                                data={e} />
                        )}
                    </div>
                </div>}
                {!!week.tuesday.length && <div className='day-container'>
                    <b>{`Martes (${week.tuesday[2] ? 'desbalanceado' : 'balanceado'})`}</b>
                    <div>
                        {week.tuesday.map((e, i) =>
                            i < 2 && <PlateCard key={e.date + i}
                                data={e} />
                        )}
                    </div>
                </div>}
                {!!week.wednesday.length && <div className='day-container'>
                    <b>{`Miercoles (${week.wednesday[2] ? 'desbalanceado' : 'balanceado'})`}</b>
                    <div>
                        {week.wednesday.map((e, i) =>
                            i < 2 && <PlateCard key={e.date + i}
                                data={e} />
                        )}
                    </div>
                </div>}
                {!!week.thursday.length && <div className='day-container'>
                    <b>{`Jueves (${week.thursday[2] ? 'desbalanceado' : 'balanceado'})`}</b>
                    <div>
                        {week.thursday.map((e, i) =>
                            i < 2 && <PlateCard key={e.date + i}
                                data={e} />
                        )}
                    </div>
                </div>}
                {!!week.friday.length && <div className='day-container'>
                    <b>{`Viernes (${week.friday[2] ? 'desbalanceado' : 'balanceado'})`}</b>
                    <div>
                        {week.friday.map((e, i) =>
                            i < 2 && <PlateCard key={e.date + i}
                                data={e} />
                        )}
                    </div>
                </div>}
                {!!week.saturday.length && <div className='day-container'>
                    <b>{`Sabado (${week.saturday[2] ? 'desbalanceado' : 'balanceado'})`}</b>
                    <div>
                        {week.saturday.map((e, i) =>
                            i < 2 && <PlateCard key={e.date + i}
                                data={e} />
                        )}
                    </div>
                </div>}
                {!!week.sunday.length && <div className='day-container'>
                    <b>{`Domingo (${week.sunday[2] ? 'desbalanceado' : 'balanceado'})`}</b>
                    <div>
                        {week.sunday.map((e, i) =>
                            i < 2 && <PlateCard key={e.date + i}
                                data={e} />
                        )}
                    </div>
                </div>}
            </section>
        </div>
    )
}

export default WeekResume