import React from 'react'
import { usePlate } from '../plate-context'

import "../components/style/Plate.css"

const Plate = () => {
    const { state: {
        protein,
        carbohydrate,
        vegetal
    } } = usePlate()

    return (
        <div className='plate-container'>
            <img src={require('../assets/plate-white.png')}
                alt="plate" className='plate' />

            {vegetal.length > 0 &&
                <div className='salad-container'>
                    <div className='salad'></div>
                </div>}

            {protein.length > 0 &&
                <div className={carbohydrate.length > 0
                    ? 'protein-half-container'
                    : 'protein-container'}>
                    <div className={carbohydrate.length > 0
                        ? 'half-protein'
                        : 'protein'}></div>
                </div>}

            {carbohydrate.length > 0 &&
                <div className={protein.length > 0
                    ? 'carbo-half-container'
                    : 'carbo-container'}>
                    <div className={protein.length > 0
                        ? 'half-carbo'
                        : 'carbo'}></div>
                </div>}
        </div>
    )
}

export default Plate