import React from 'react'
import { IoAlertCircleSharp, IoLeafSharp } from "react-icons/io5";
import { BiXCircle } from 'react-icons/bi';

import "../components/style/Plate.css"

const Plate = ({ protein, carbohydrate, vegetal, vegC, cheat, size, detailed = false }) => {

    return (
        <div className='plate-container'
            style={{ height: size, width: size }}>

            <div className={detailed ? 'detailed-plate' : 'simple-plate'}>
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

            {cheat && !!cheat.length &&
                <div className='mark cheat'>
                    <BiXCircle className='i-margin-t i-medium i-red' />
                </div>}

            {(vegetal.length < 1 || (protein.length < 1 && carbohydrate.length < 1)) &&
                <div className='mark badplate'>
                    <IoAlertCircleSharp className='icon i-red' />
                </div>}
        </div>
    )
}

export default Plate