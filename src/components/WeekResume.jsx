import React, { useEffect, useState } from 'react'
import { usePlate } from '../plate-context'
import LastMeal from './LastMeal'
import PlateCard from './PlateCard'

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

    useEffect(() => {
        const {
            today,
            start,
            // end
        } = defineWeek()

        let aux = {
            today: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        }

        history.forEach(e => {
            if (e.date >= start && e.date <= today) {

                if (e.date === today) aux.today.push(e)

                switch (new Date(e.date).getDay()) {
                    case 1:
                        aux.monday.push(e)
                        break;
                    case 2:
                        aux.tuesday.push(e)
                        break;
                    case 3:
                        aux.wednesday.push(e)
                        break;
                    case 4:
                        aux.thursday.push(e)
                        break;
                    case 5:
                        aux.friday.push(e)
                        break;
                    case 6:
                        aux.saturday.push(e)
                        break;
                    default:
                        aux.sunday.push(e)
                        break;
                }
            }
        })

        Object.entries(aux).forEach(d => {
            let balanced = true,
                message = [],
                day = d[0]

            if (d[0] !== 'today' && d[1].length > 1) {
                let p1 = {
                    p: !!d[1][0].protein.length,
                    c: !!d[1][0].carbohydrate.length,
                    v: !!d[1][0].vegetal.length
                },
                    p2 = {
                        p: !!d[1][1].protein.length,
                        c: !!d[1][1].carbohydrate.length,
                        v: !!d[1][1].vegetal.length
                    }


                if (!p1.v && !p2.v) { //? si falta vegetal en ambas comidas
                    balanced = false
                    message.push('Faltan vegetales')
                }
                if (!p1.p && !p2.p) { //? si falta proteina en ambas comidas
                    balanced = false
                    message.push('Faltan proteinas')
                }
                if (!p1.c && !p2.c) { //? si falta carbos en ambas comidas
                    balanced = false
                    message.push('Faltan carbohidratos')
                }

                if ((p1.p && !p2.p) || (!p1.p && p2.p)) {
                    if (p1.c && p2.c) {
                        balanced = false
                        message.push('Faltan proteínas')
                    }
                }
                if ((p1.c && !p2.c) || (!p1.c && p2.c)) {
                    if (p1.p && p2.p) {
                        balanced = false
                        message.push('Faltan carbohidratos')
                    }
                }

                if (!balanced) aux[day].push(message)
            }
        })

        console.log(aux)
        setWeek(() => aux)
        // eslint-disable-next-line
    }, [])

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

                // history.length > 0 && history.map((m, i) =>
                //     <PlateCard key={m.date + i}
                //         data={m} />
                // )