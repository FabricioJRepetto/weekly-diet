import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { usePlate } from '../plate-context'
import CreateFood from './CreateFood'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'
import { Spinner } from './Spinner'
import { BiTrash, BiEdit } from 'react-icons/bi'

import './style/CustomFoods.css'

export const CustomFoods = () => {
    const { dispatch, state: { config: { tutorials } } } = usePlate()
    const [foods, setFoods] = useState()
    const [loading, setLoading] = useState(true)
    const [isOpenDelete, openDelete, closeDelete, propDelete] = useModal()
    const [isOpenEdit, openEdit, closeEdit, propEdit] = useModal()
    const [isOpenNew, openNew, closeNew] = useModal()
    const [openCard, setOpenCard] = useState(false)

    useEffect(() => {
        if (tutorials && tutorials.activated && tutorials.customMeals) {
            dispatch({ type: 'openTuto', payload: 'customMeals' })
        }
        // eslint-disable-next-line
    }, [tutorials])


    useEffect(() => {
        (async () => {
            const { data } = await axios(`/foods`)
            if (!data.error) setFoods(() => data.foods)
            setLoading(() => false)
        })()
    }, [])

    const deleteConfirmed = async () => {
        setLoading(true)
        closeDelete()
        const { data } = await axios.delete(`/foods?food_id=${propDelete}`)
        if (!data.error) {
            setFoods(() => data.foods)
            dispatch({ type: 'saveFoods', payload: data.allFoods })
        }
        setLoading(false)
    }

    const editHandler = (e, data) => {
        // console.log(data);
        e.stopPropagation()
        openEdit(data)
    }

    const deleteHandler = (e, data) => {
        e.stopPropagation()
        openDelete(data)
    }

    const color = {
        protein: { color: '#F7A4A4' },
        carbohydrate: { color: '#FEBE8C' },
        vegetal: { color: '#B6E2A1' },
    }

    return (
        <div className='fade-in'>
            <h2>Preparaciones</h2>
            {loading
                ? <Spinner />
                : <>
                    <div className='ingredients-cell add-ing'
                        onClick={openNew}>
                        <p>Crear nueva preparación ⭐</p>
                    </div>
                    {foods
                        ? foods.map(e =>
                            <div key={e._id} onClick={() => setOpenCard(card => card === e._id ? false : e._id)}
                                className={`customfood-cell card-style ${openCard === e._id ? 'customfood-expanded' : ''}`}>
                                <div>
                                    <p>{e.name}</p>

                                    <div className='customfood-buttons'>
                                        <BiEdit className='icon' onClick={(ev) => editHandler(ev, e)} />
                                        <BiTrash className='icon' onClick={(ev) => deleteHandler(ev, e._id)} />
                                    </div>
                                </div>

                                <div className='customfood-ingredients'>
                                    {e.ingredients.map(ing => (
                                        <p key={ing.name + e.name} style={color[ing.list]}>{ing.name}</p>
                                    ))}
                                </div>
                            </div>
                        )
                        : 'No tienes preparaciones guardadas'}
                </>}

            <Modal isOpen={isOpenDelete} closeModal={closeDelete}>
                <div className='card-deletemenu'>
                    <>
                        <p>¿Seguro que deseas eliminar esta preparación?</p>
                        <div>
                            <button className='button'
                                onClick={() => deleteConfirmed()}>
                                eliminar
                            </button>
                            <button className='button sec'
                                onClick={closeDelete}>
                                cancelar
                            </button>
                        </div>
                    </>
                </div>
            </Modal>

            <Modal isOpen={isOpenEdit} closeModal={closeEdit}>
                {isOpenEdit &&
                    <CreateFood
                        close={closeEdit}
                        edit={propEdit}
                        setData={setFoods} />}
            </Modal>

            <Modal isOpen={isOpenNew} closeModal={closeNew}>
                {isOpenNew &&
                    <CreateFood
                        close={closeNew}
                        setData={setFoods} />}
            </Modal>
        </div>
    )
}
