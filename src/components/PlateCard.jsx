import React, { useEffect, useState } from 'react'
import Plate from './Plate'

import '../components/style/PlateCard.css'

const PlateCard = ({ data, details = true }) => {
    const [preview, setPreview] = useState(true)
    const [proportions, setProportions] = useState(false)
    const {
        protein,
        carbohydrate,
        vegetal,
        vegetalC
    } = data

    //? Proporciones
    useEffect(() => {
        let p = protein.length
            ? protein.length && carbohydrate.length
                ? 1
                : 2
            : 0,
            c = carbohydrate.length
                ? carbohydrate.length && protein.length
                    ? 1
                    : 2
                : 0,
            v = vegetal.length
                ? 2
                : 0

        setProportions({
            p: { width: `${25 * p}%`, backgroundColor: 'var(--prot)' },
            c: { width: `${25 * c}%`, backgroundColor: 'var(--carb)' },
            v: { width: `${25 * v}%`, backgroundColor: 'var(--veg)' },
            boolean: {
                p: !!p,
                c: !!c,
                v: !!v
            }
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div className='platecard-container'
            onClick={() => details ? setPreview(p => !p) : undefined}>
            {preview
                ? <Plate size={'100%'}
                    protein={protein}
                    carbohydrate={carbohydrate}
                    vegetal={vegetal}
                    vegC={vegetalC} />
                : <div className='platecard-details'>
                    <div className='platecard-head'>
                        <div className='platecard-proportions'>
                            <div style={proportions.p}></div>
                            <div style={proportions.c}></div>
                            <div style={proportions.v}></div>
                        </div>
                        {proportions.boolean.p &&
                            <div className='platecard-legend'>
                                <span style={{ background: `var(--prot)` }}></span>
                                Proteínas
                            </div>}
                        {proportions.boolean.c &&
                            <div className='platecard-legend'>
                                <span style={{ background: `var(--carb)` }}></span>
                                Carbohidratos
                            </div>}
                        {proportions.boolean.v &&
                            <div className='platecard-legend'>
                                <span style={{ background: `var(--veg)` }}></span>
                                Vegetales
                            </div>}

                        {vegetalC &&
                            <div className='platecard-legend-mark mark-vegc'>
                                Vegetal C
                            </div>}
                        {(vegetal.length < 1 || (protein.length < 1 && carbohydrate.length < 1)) &&
                            <div className='platecard-legend-mark mark-badplate'>
                                Plato no balanceado
                            </div>}
                    </div>

                    <ul>
                        <li>{protein.toString().replaceAll(',', ', ')}</li>
                        <li>{carbohydrate.toString().replaceAll(',', ', ')}</li>
                        <li>{vegetal.toString().replaceAll(',', ', ')}</li>
                    </ul>
                </div>}
        </div>
    )
}

export default PlateCard