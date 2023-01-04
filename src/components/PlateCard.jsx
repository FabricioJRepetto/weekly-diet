import React, { useRef, useState } from 'react'
import Plate from './Plate'
import { usePlate } from '../plate-context'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'
import { defineWeek } from './helpers/defineWeek'
import axios from 'axios'

import '../components/style/PlateCard.css'

const PlateCard = ({ data, setShow, showing, i, details = true, size = false }) => {
    const laputa = () => {
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
        [preview, setPreview] = useState(true),
        proportions = useRef(laputa()),
        { dispatch } = usePlate(),
        [isOpenDelete, openDelete, closeDelete] = useModal()

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

    const clickHandler = () => {
        setShow()
        setPreview(p => !p)
    }

    return (
        <div className={`platecard-container ${showing ? '' : 'ghost' + i} ${preview ? '' : 'showingcard'}`}
            style={size ? {
                height: size, width: size
            } : {}}
            onClick={() => details ? clickHandler() : undefined}>

            <div className={`platecard-plate-container pos${i} ${preview ? '' : 'repos' + i}`}
                style={size ? {
                    height: size, width: size
                } : {}}>
                <Plate size={size || '100%'}
                    protein={protein}
                    carbohydrate={carbohydrate}
                    vegetal={vegetal}
                    vegC={vegetalC} />
            </div>
            <div className={`platecard-details ${preview ? 'invisible' : ''}`}>
                {proportions.current &&
                    <div className={`platecard-head ${i === 1 ? 'head-reverse' : ''}`}>
                        <div className='platecard-proportions'>
                            <div style={{ ...proportions.current.p, backgroundColor: 'var(--prot)' }}></div>
                            <div style={{ ...proportions.current.c, backgroundColor: 'var(--carb)' }}></div>
                            <div style={{ ...proportions.current.v, backgroundColor: 'var(--veg)' }}></div>
                        </div>

                        <div className='plate-card-ingredients'>
                            {proportions.current.boolean.p &&
                                <div className={`platecard-legend ${i === 1 ? 'legend-reverse' : ''}`} style={proportions.current.p}>
                                    <b style={{ color: 'var(--prot)' }}>Proteínas</b>
                                    <p>{protein.toString().replaceAll(',', ', ')}</p>
                                </div>}
                            {proportions.current.boolean.c &&
                                <div className={`platecard-legend ${i === 1 ? 'legend-reverse' : ''}`} style={proportions.current.c}>
                                    <b style={{ color: 'var(--carb)' }}>Carbohidratos</b>
                                    <p>{carbohydrate.toString().replaceAll(',', ', ')}</p>
                                </div>}
                            {proportions.current.boolean.v &&
                                <div className={`platecard-legend p-l-v ${i === 1 ? 'legend-reverse' : ''}`} style={proportions.current.v}>
                                    <b style={{ color: 'var(--veg)' }}>Vegetales</b>
                                    <p>{vegetal.toString().replaceAll(',', ', ')}</p>
                                </div>}
                        </div>
                    </div>}

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