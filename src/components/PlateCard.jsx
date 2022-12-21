import React from 'react'
import Plate from './Plate'

import '../components/style/PlateCard.css'

const PlateCard = ({ data }) => {
    const {
        protein,
        carbohydrate,
        vegetal,
        vegetalC,
        // date
    } = data

    return (
        <div className='platecard-container'>
            <Plate size={'100%'}
                protein={protein}
                carbohydrate={carbohydrate}
                vegetal={vegetal}
                vegC={vegetalC} />
            {/* <i>{new Date(date).toLocaleString("es-Ar").slice(0, -3)}</i> */}
        </div>
    )
}

export default PlateCard