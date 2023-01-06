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
    const { dispatch } = usePlate()
    const [foods, setFoods] = useState()
    const [loading, setLoading] = useState(true)
    const [isOpenDelete, openDelete, closeDelete, propDelete] = useModal()
    const [isOpenEdit, openEdit, closeEdit, propEdit] = useModal()
    const [isOpenNew, openNew, closeNew] = useModal()

    useEffect(() => {
        (async () => {
            const { data } = await axios(`/foods`)
            if (!data.error) setFoods(() => data.foods)
            setLoading(() => false)
        })()
    }, [])

    const deleteConfirmed = async () => {
        const { data } = await axios.delete(`/foods?food_id=${propDelete}`)
        if (!data.error) {
            setFoods(() => data.foods)
            dispatch({ type: 'saveFoods', payload: data.allFoods })
        }
        closeDelete()
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
                            <div key={e._id} className='customfood-cell card-style'>
                                <p>{e.name}</p>

                                <div>
                                    <BiEdit className='icon' onClick={() => openEdit(e)} />
                                    <BiTrash className='icon' onClick={() => openDelete(e._id)} />
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
                            <button className='button button-sec'
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
