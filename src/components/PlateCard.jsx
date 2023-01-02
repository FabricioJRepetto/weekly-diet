import React, { useEffect, useState } from 'react'
import Plate from './Plate'
import { usePlate } from '../plate-context'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'
import { defineWeek } from './helpers/defineWeek'
import axios from 'axios'

import '../components/style/PlateCard.css'

const PlateCard = ({ data, details = true }) => {
    const [preview, setPreview] = useState(true)
    const [proportions, setProportions] = useState(false)
    const {
        protein,
        foods,
        carbohydrate,
        vegetal,
        vegetalC,
        date,
        _id
    } = data
    const { dispatch } = usePlate()
    const [isOpenDelete, openDelete, closeDelete] = useModal()

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
            p: { height: `${25 * p}%` },
            c: { height: `${25 * c}%` },
            v: { height: `${25 * v}%` },
            boolean: {
                p: !!p,
                c: !!c,
                v: !!v
            }
        })
        // eslint-disable-next-line
    }, [])

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
    }

    const deleteHandler = (e) => {
        e.stopPropagation()
        openDelete()
    }

    const deleteConfirmed = async () => {
        closeDelete()
        const {
            today,
            start
        } = defineWeek()
        const { data } = await axios.delete(`/history?today=${today}&start=${start}&meal_id=${_id}`)
        console.log(data);
        if (!data.error) {
            dispatch({ type: 'save', payload: data })
        }
    }

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
                            <div style={{ ...proportions.p, backgroundColor: 'var(--prot)' }}></div>
                            <div style={{ ...proportions.c, backgroundColor: 'var(--carb)' }}></div>
                            <div style={{ ...proportions.v, backgroundColor: 'var(--veg)' }}></div>
                        </div>

                        <div className='plate-card-ingredients'>
                            {proportions.boolean.p &&
                                <div className='platecard-legend' style={proportions.p}>
                                    <b style={{ color: 'var(--prot)' }}>Proteínas</b>
                                    <p>{protein.toString().replaceAll(',', ', ')}</p>
                                </div>}
                            {proportions.boolean.c &&
                                <div className='platecard-legend' style={proportions.c}>
                                    <b style={{ color: 'var(--carb)' }}>Carbohidratos</b>
                                    <p>{carbohydrate.toString().replaceAll(',', ', ')}</p>
                                </div>}
                            {proportions.boolean.v &&
                                <div className='platecard-legend' style={proportions.v}>
                                    <b style={{ color: 'var(--veg)' }}>Vegetales</b>
                                    <p>{vegetal.toString().replaceAll(',', ', ')}</p>
                                </div>}
                        </div>
                    </div>

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

                </div>}

            <Modal isOpen={isOpenDelete}
                closeModal={closeDelete}>
                <>
                    <p>¿Seguro que deseas eliminar este plato?</p>
                    <>
                        <button onClick={deleteConfirmed}>eliminar</button>
                        <button onClick={closeDelete}>cancelar</button>
                    </>
                </>
            </Modal>
        </div>
    )
}

export default PlateCard