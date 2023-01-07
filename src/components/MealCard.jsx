import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlate } from '../plate-context'
import Plate from './Plate'

export const MealCard = ({ data, i, openDelete, setShow, showing }) => {
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

    const {
        protein,
        foods,
        carbohydrate,
        vegetal,
        vegetalC,
        date,
        _id
    } = data,
        proportions = useRef(propotionsMaker()),
        { dispatch } = usePlate(),
        navigate = useNavigate(),
        [preview, setPreview] = useState(true)

    const viewChange = () => {
        setShow()
        setPreview(!preview)
    }

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
        <div className={`mealcard-container ${preview ? '' : 'mealcard-expanded'} ${showing ? '' : 'card-banish'}`}
            onClick={viewChange}>
            <div className={`daycard-details ${preview ? '' : 'details-opacity'}`}>
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

            <div className={`daycard-plate ${preview ? '' : 'plate-opacity plate-pos' + i}`}>
                <Plate protein={protein}
                    carbohydrate={carbohydrate}
                    vegetal={vegetal}
                    vegC={vegetalC}
                />
            </div>
        </div>
    )
}
