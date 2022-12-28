import React from 'react'
import PlateCard from './PlateCard'

const LastMeal = ({ data }) => {
    const {
        protein,
        carbohydrate,
        vegetal,
        // vegetalC,
        // date
    } = data

    return (
        <div className='lastmeal-container'>
            {/* <p>Ultima comida de hoy</p> */}
            <PlateCard key={'lastMeal'}
                data={data}
                details={false} />

            <div className='lastmeal-text'>
                <h3>Última comida</h3>
                <ul>
                    {protein.length > 0 &&
                        <li>{protein.toString().replaceAll(',', ', ') || 'a'}</li>}
                    {carbohydrate.length > 0 &&
                        <li>{carbohydrate.toString().replaceAll(',', ', ')}</li>}
                    {vegetal.length > 0 &&
                        <li>{vegetal.toString().replaceAll(',', ', ')}</li>}
                </ul>
                {/* {vegetalC && <b>veg. C</b>} */}
            </div>
        </div>
    )
}

export default LastMeal