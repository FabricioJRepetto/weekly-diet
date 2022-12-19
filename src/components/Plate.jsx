import React from 'react'
// import { usePlate } from '../plate-context'

import "../components/style/Plate.css"

const Plate = ({ protein, carbohydrate, vegetal, size }) => {
    // const { state: {
    //     protein,
    //     carbohydrate,
    //     vegetal
    // } } = usePlate()

    return (
        <div className='plate-container'
            style={{ height: size, width: size }}>
            <img src={require('../assets/plate-white.png')}
                alt="plate" className='plate' />

            {vegetal.length > 0 &&
                <div className='salad-container'>
                    <div className='salad'></div>
                </div>}

            {protein.length > 0 &&
                <div className={`protein-c ${carbohydrate.length > 0
                    ? 'p-half-c'
                    : 'p-c'}`}>
                    <div className={carbohydrate.length > 0
                        ? 'half-protein'
                        : 'protein'}></div>
                </div>}

            {carbohydrate.length > 0 &&
                <div className={`carbo-c ${protein.length > 0
                    ? 'c-half-c'
                    : 'c-c'}`}>
                    <div className={protein.length > 0
                        ? 'half-carbo'
                        : 'carbo'}></div>
                </div>}
        </div>
    )
}

export default Plate