import React, { useEffect, useState } from 'react'
import { usePlate } from '../plate-context'
import { suggestions } from './helpers/suggestions'
import Plate from './Plate'

const LastMeal = () => {
    const { state: { week } } = usePlate()
    const [message, setMessage] = useState(false)
    const [data, setData] = useState(false)

    useEffect(() => {
        if (!message) {
            const {
                message,
                platePreview
            } = suggestions(week.today)

            setMessage(() => message)
            setData(() => platePreview)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='lastmeal-container card-style2 fade-in'>
            {data &&
                <div className='lastmeal-plate'>
                    <Plate protein={data.protein}
                        carbohydrate={data.carbohydrate}
                        vegetal={data.vegetal}
                        vegC={data.vegetalC} />
                </div>}

            <div className='lastmeal-text'>
                <h3>Cena recomendada</h3>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default LastMeal