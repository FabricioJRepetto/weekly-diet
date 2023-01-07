import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlate } from '../plate-context'
import Plate from './Plate'
import './style/DayCard.css'


export const DayCard = ({ openDelete }) => {
    const protein = ['anana', 'banana'],
        foods = [],
        carbohydrate = [1, 2, 3],
        vegetal = [1, 2, 3],
        vegetalC = true,
        date = '12/12/2012',
        _id = 'asd12345',
        i = 0,
        j = 1

    const propotionsMaker = () => {
        let p = !!protein.length
            ? !!protein.length && !!carbohydrate.length
                ? 1
                : 2
            : 0,
            c = !!carbohydrate.length
                ? !!carbohydrate.length && !!protein.length
                    ? 1
                    : 2
                : 0,
            v = !!vegetal.length
                ? 2
                : 0

        return {
            p: { height: `${25 * p}%` },
            c: { height: `${25 * c}%` },
            v: { height: `${25 * v}%` },
            boolean: {
                p: !!p,
                c: !!c,
                v: !!v
            }
        }
    }
    const proportions = useRef(propotionsMaker())
    const { dispatch } = usePlate()
    const navigate = useNavigate()

    const edit = (e) => {
        e.stopPropagation()
        dispatch({
            type: 'edit', payload: {
                edit: {
                    id: _id,
                    date
                },
                protein,
                foods,
                carbohydrate,
                vegetal,
                vegetalC
            }
        })
        navigate('/mealMenu')
    }

    const deleteHandler = () => {
        openDelete(_id)
    }

    return (
        <div className='daycard-outer-container card-style'>
            <b>Viernes (balanceado)</b>
            <div className="daycard-inner-container">
                <div>
                    <div className='daycard-details'>
                        {proportions.current &&
                            <div className={`daycard-head ${i === 1 ? 'head-reverse' : ''}`}>
                                <div className='daycard-proportions'>
                                    <div style={{ ...proportions.current.p, backgroundColor: 'var(--prot)' }}></div>
                                    <div style={{ ...proportions.current.c, backgroundColor: 'var(--carb)' }}></div>
                                    <div style={{ ...proportions.current.v, backgroundColor: 'var(--veg)' }}></div>
                                </div>

                                <div className='daycard-ingredients'>
                                    {proportions.current.boolean.p &&
                                        <div className={`daycard-ing ${i === 1 ? 'ing-reverse' : ''}`} style={proportions.current.p}>
                                            <b style={{ color: 'var(--prot)' }}>Proteínas</b>
                                            <p>{protein.toString().replaceAll(',', ', ')}</p>
                                        </div>}
                                    {proportions.current.boolean.c &&
                                        <div className={`daycard-ing ${i === 1 ? 'ing-reverse' : ''}`} style={proportions.current.c}>
                                            <b style={{ color: 'var(--carb)' }}>Carbohidratos</b>
                                            <p>{carbohydrate.toString().replaceAll(',', ', ')}</p>
                                        </div>}
                                    {proportions.current.boolean.v &&
                                        <div className={`daycard-ing ing-veg ${i === 1 ? 'ing-reverse' : ''}`} style={proportions.current.v}>
                                            <b style={{ color: 'var(--veg)' }}>Vegetales</b>
                                            <p>{vegetal.toString().replaceAll(',', ', ')}</p>
                                        </div>}
                                </div>
                            </div>
                        }
                        <div className='daycard-options'>
                            {vegetalC &&
                                <p className='daycard-legend legend-vegc'>
                                    Vegetal C
                                </p>}
                            {(vegetal.length < 1 || (protein.length < 1 && carbohydrate.length < 1)) &&
                                <p className='daycard-legend legend-badplate'>
                                    ! Desbalanceado
                                </p>}
                        </div>

                        <div className='daycard-options underline'>
                            <p className='button-opt' onClick={edit}>editar</p>
                            <p className='button-opt b-o-delete' onClick={deleteHandler}>borrar</p>
                        </div>
                    </div>

                    <div className='daycard-plate'>
                        <Plate protein={protein}
                            carbohydrate={carbohydrate}
                            vegetal={vegetal}
                            vegC={vegetalC}
                        />
                    </div>
                </div>

                <div>
                    <div className='daycard-details'>
                        {proportions.current &&
                            <div className={`platecard-head ${j === 1 ? 'head-reverse' : ''}`}>
                                <div className='platecard-proportions'>
                                    <div style={{ ...proportions.current.p, backgroundColor: 'var(--prot)' }}></div>
                                    <div style={{ ...proportions.current.c, backgroundColor: 'var(--carb)' }}></div>
                                    <div style={{ ...proportions.current.v, backgroundColor: 'var(--veg)' }}></div>
                                </div>

                                <div className='plate-card-ingredients'>
                                    {proportions.current.boolean.p &&
                                        <div className={`platecard-legend ${j === 1 ? 'legend-reverse' : ''}`} style={proportions.current.p}>
                                            <b style={{ color: 'var(--prot)' }}>Proteínas</b>
                                            <p>{protein.toString().replaceAll(',', ', ')}</p>
                                        </div>}
                                    {proportions.current.boolean.c &&
                                        <div className={`platecard-legend ${j === 1 ? 'legend-reverse' : ''}`} style={proportions.current.c}>
                                            <b style={{ color: 'var(--carb)' }}>Carbohidratos</b>
                                            <p>{carbohydrate.toString().replaceAll(',', ', ')}</p>
                                        </div>}
                                    {proportions.current.boolean.v &&
                                        <div className={`platecard-legend p-l-v ${j === 1 ? 'legend-reverse' : ''}`} style={proportions.current.v}>
                                            <b style={{ color: 'var(--veg)' }}>Vegetales</b>
                                            <p>{vegetal.toString().replaceAll(',', ', ')}</p>
                                        </div>}
                                </div>
                            </div>
                        }

                        <div className='card-options'>
                            {vegetalC &&
                                <p className='platecard-legend-mark mark-vegc'>
                                    Vegetal C
                                </p>}
                            {(vegetal.length < 1 || (protein.length < 1 && carbohydrate.length < 1)) &&
                                <p className='platecard-legend-mark mark-badplate'>
                                    ! Desbalanceado
                                </p>}
                        </div>

                        <div className='card-options underline'>
                            <p className='button-opt' onClick={edit}>editar</p>
                            <p className='button-opt b-o-delete' onClick={deleteHandler}>borrar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
