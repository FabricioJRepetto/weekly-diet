import React from 'react'
// import { usePlate } from '../plate-context'

import "../components/style/Plate.css"

const Plate = ({ protein, carbohydrate, vegetal, vegC, size }) => {

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

            {vegC &&
                <div className='vegC-mark'>
                    <b>
                        Veg. C
                    </b>
                </div>}

            {(vegetal.length < 1 || (protein.length < 1 && carbohydrate.length < 1)) &&
                <div className='badplate-mark'>
                    <b>
                        !
                    </b>
                </div>}
        </div>
    )
}

export default Plate