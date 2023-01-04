import React, { useEffect, useState } from 'react'
import { usePlate } from '../plate-context'
import { suggestions } from './helpers/suggestions'
import PlateCard from './PlateCard'

const LastMeal = () => {
    const { state: { week } } = usePlate()
    const [message, setMessage] = useState(false)
    const [Plate, SetPlate] = useState(false)

    useEffect(() => {
        if (!message) {
            const {
                message,
                platePreview
            } = suggestions(week.today)

            setMessage(() => message)
            SetPlate(() => platePreview)
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