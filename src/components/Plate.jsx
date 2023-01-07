import React from 'react'
import { IoAlertCircleSharp, IoLeafSharp } from "react-icons/io5";

import "../components/style/Plate.css"

const Plate = ({ protein, carbohydrate, vegetal, vegC, size }) => {

    return (
        <div className='plate-container'
            style={{ height: size, width: size }}>

            <div className='white-plate'>
                <div></div>
            </div>

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
                <div className='mark'>
                    <IoLeafSharp className='i-medium i-orange' />
                </div>}

            {(vegetal.length < 1 || (protein.length < 1 && carbohydrate.length < 1)) &&
                <div className='mark badplate'>
                    <IoAlertCircleSharp className='icon i-red' />
                </div>}
        </div>
    )
}

export default Plate