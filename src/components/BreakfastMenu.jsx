import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePlate } from '../plate-context'
import { defineWeek } from './helpers/defineWeek'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'
import IngredientList from './IngredientList'
import { Spinner } from './Spinner'
import Loading from './Loading'

const BreakfastMenu = () => {
    const {
        dispatch,
        state: {
            currentPlate: {
                edit,
                foods,
                fruit,
                breakfast,
                cheatfood
            },
            config: {
                tutorials
            }
        } } = usePlate()
    const [params] = useSearchParams()
    const [list, setList] = useState(false)
    const mealType = params.get('mealType') || edit.mealType
    const mealTypeStr = useRef(mealType === 'breakfast' ? 'Desayuno' : 'Merienda')
    const [loading, setLoading] = useState(false)
    const [isOpenList, openList, closeList] = useModal()
    const navigate = useNavigate()

    useEffect(() => {
        if (tutorials && tutorials.activated && tutorials.creationMenu) {
            dispatch({ type: 'openTuto', payload: 'creationMenu' })
        }
        // eslint-disable-next-line
    }, [tutorials])

    const openSection = (section) => {
        setList(section)
        openList()
    }

    const save = async () => {
        setLoading(true)
        let aux = {
            mealType,
            foods: [...foods],
            breakfast: [...breakfast],
            fruit: [...fruit],
            cheatfood,
            date: edit ? edit.date : new Date().toLocaleDateString('en')
        }

        const {
            today,
            start
        } = defineWeek()

        if (edit) {
            const { data } = await axios.put(`/history/v2`,
                {
                    meal: aux,
                    day_id: edit.day_id,
                    start,
                    today
                })
            if (!data.error) {
                dispatch({ type: 'save', payload: data })
            }
        } else {
            const { data } = await axios.post(`/history/v2?today=${today}&start=${start}`, { meal: aux })
            if (!data.error) {
                dispatch({ type: 'save', payload: data })
            }
        }

        setLoading(false)
        close()
    }

    const close = () => {
        navigate('/')
        dispatch({ type: 'reset' })
    }

    return (
        <div>
            <b className='mealmenu-title'>{mealTypeStr.current}{edit ? <i> (editando)</i> : ''}</b>

            <div className="breakfastPreview"></div>

            {loading &&
                <div className='loading-modal'>
                    <Spinner />
                    <h2>guardando<Loading /></h2>
                </div>}

            {(foods && foods.length > 0) &&
                <div onClick={() => openSection('foods')}
                    className='ingredients-cell ing-f card-style'>
                    <b>Comidas</b>
                    <p>{foods.join(', ')}</p>
                </div>}

            {breakfast.length > 0 &&
                <div onClick={() => openSection('breakfast')}
                    className='ingredients-cell ing-c card-style'>
                    <b>{mealTypeStr.current}</b>
                    <p>{breakfast.join(', ')}</p>
                </div>}

            {fruit.length > 0 &&
                <div onClick={() => openSection('fruit')}
                    className='ingredients-cell ing-v card-style'>
                    <b>Frutas</b>
                    <p>{fruit.join(', ')}</p>
                </div>}

            <div onClick={openList}
                className='ingredients-cell add-ing'>
                Agregar ingrediente +
            </div>

            <div className='ingredients forButtons'>
                <button onClick={save}
                    className='ingredients-cell button'
                    disabled={
                        foods.length < 1 &&
                        fruit.length < 1 &&
                        breakfast.length < 1
                    } >guardar</button>
                <button className='ingredients-cell button sec' onClick={close}>salir</button>
            </div>

            <Modal isOpen={isOpenList} closeModal={closeList}>
                {!list &&
                    <div className='ingredients'>
                        <div className='ingredients-cell sec'
                            onClick={() => setList('breakfast')}>
                            <p>{mealTypeStr.current} ☕</p>
                        </div>
                        <div className='ingredients-cell sec'
                            onClick={() => setList('fruit')}>
                            <p>Frutas 🍎</p>
                        </div>
                        <div className='divisor'></div>
                        <div className='ingredients-cell sec'
                            onClick={() => setList('foods')}>
                            <p>Mis Preparaciones ⭐</p>
                        </div>
                        <button className='button' onClick={closeList}>volver</button>
                    </div>}

                {list &&
                    <IngredientList
                        list={list}
                        type={list}
                        openList={setList} />}
            </Modal>
        </div>
    )
}

export default BreakfastMenu