import React, { useEffect, useState } from 'react'
import { usePlate } from '../plate-context'
import PlateCard from './PlateCard'

const LastMeal = () => {
    const { state: { week } } = usePlate()
    const [message, setMessage] = useState(false)
    const [Plate, SetPlate] = useState(false)

    useEffect(() => {
        if (!message) {
            const plate = {
                p: !!week.today[0].protein.length,
                c: !!week.today[0].carbohydrate.length,
                v: !!week.today[0].vegetal.length
            }

            if (plate.p && !plate.c) {
                setMessage(() => 'Preparar medio plato de carbohidratos y acompañar con vegetales.')
                SetPlate(() => ({
                    protein: [],
                    carbohydrate: [true],
                    vegetal: [true],
                    vegetalC: false
                }))
            }
            if (plate.c && !plate.p) {
                setMessage(() => 'Preparar medio plato de proteínas y acompañar con vegetales.')
                SetPlate(() => ({
                    protein: [true],
                    carbohydrate: [],
                    vegetal: [true],
                    vegetalC: false
                }))
            }
            if ((plate.c && plate.p) || (!plate.c && !plate.p)) {
                setMessage(() => 'Preparar proteínas y carbohidratos (1/4 de plato cada uno) y acompañar con vegetales (medio plato).')
                SetPlate(() => ({
                    protein: [true],
                    carbohydrate: [true],
                    vegetal: [true],
                    vegetalC: false
                }))
            }
            if (week.today.vegetalC) setMessage(m => {
                return m + ' No utilizar Vegetal C.'
            })
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='lastmeal-container'>
            {Plate &&
                <div className='lastmeal-plate'>
                    <PlateCard key={'lastMeal'}
                        size={'30vw'}
                        data={Plate}
                        details={false} />
                </div>}

            <div className='lastmeal-text'>
                <h3>Cena recomendada</h3>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default LastMeal