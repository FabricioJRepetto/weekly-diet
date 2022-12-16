import React from 'react'

import "../components/style/Plate.css"

const Plate = () => {
    return (
        <>
            <img src={require('../assets/plate-white.png')}
                alt="plate" className='plate' />
        </>
    )
}

export default Plate