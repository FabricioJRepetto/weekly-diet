import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { usePlate } from '../plate-context'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'
import IngredientList from './IngredientList'
import Plate from './Plate'
import SearchIngredient from './SearchIngredient'
import { Suggested } from './Suggested'
import { defineWeek } from './helpers/defineWeek'
import { Spinner } from './Spinner'
import Loading from './Loading'
import { useNavigate, useSearchParams } from 'react-router-dom'

import './style/MealMenu.css'

const MealMenu = () => {
    const [ingredientList, setIngredientList] = useState(false)
    const [subMenu, setSubMenu] = useState(false)
    const [type, setType] = useState(false)
    const [loading, setLoading] = useState(false)
    const {
        dispatch,
        state: {
            currentPlate: {
                protein,
                foods,
                carbohydrate,
                vegetal,
                fruit,
                vegetalC,
                edit
            },
            config: {
                tutorials
            }
        } } = usePlate()
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [isOpenType, openType, closeType] = useModal()
    const [isOpenMealType, openMealType, closeMealType] = useModal();
    const [mealType, setMealType] = useState(params.get('mealType') || edit.mealType)
    const mealNames = {
        lunch: 'Almuerzo',
        dinner: 'Cena',
    }

    useEffect(() => {
        if (tutorials && tutorials.activated && tutorials.creationMenu) {
            dispatch({ type: 'openTuto', payload: 'creationMenu' })
        }
        // eslint-disable-next-line
    }, [tutorials])

    const closeTypeHandler = () => {
        closeType()
        setIngredientList(false)
        setSubMenu(false)
        setType(false)
    }

    const openSection = (section) => {
        setType(section)
        setIngredientList(section)
        openType()
    }

    const close = () => {
        navigate('/')
        dispatch({ type: 'reset' })
    }

    const save = async () => {
        //! VOLVER esto no sirve si quito la edicion en dias pasados
        if (!mealType) {
            openMealType()
            return
        }
        setLoading(true)
        let aux = {
            mealType,
            protein: [...protein],
            foods: [...foods],
            carbohydrate: [...carbohydrate],
            vegetal: [...vegetal],
            fruit: [...fruit],
            vegetalC,
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

    const selectSubMenu = (arg) => {
        setType(arg)
        setSubMenu(arg)
    }

    const selectIngList = (arg) => {
        setType(arg)
        setIngredientList(arg)
    }

    const mealTypeHandler = () => {
        closeMealType()
        save()
    }

    return (
        <div className='mainmenu-container'>
            {loading &&
                <div className='loading-modal'>
                    <Spinner />
                    <h2>guardando<Loading /></h2>
                </div>}

            <b className='mealmenu-title'>{mealNames[mealType] || ''}{edit ? <i> (editando)</i> : ''}</b>

            <Plate size={'34vh'}
                protein={protein}
                carbohydrate={carbohydrate}
                vegetal={vegetal}
                vegC={vegetalC} />

            <Suggested />

            <section className='ingredients ing-main'>
                {foods.length > 0 &&
                    <div onClick={() => openSection('foods')}
                        className='ingredients-cell ing-f card-style'>
                        <b>Comidas</b>
                        <p>{foods.join(', ')}</p>
                    </div>}

                {protein.length > 0 &&
                    <div onClick={() => openSection('protein')}
                        className='ingredients-cell ing-p card-style'>
                        <b>Proteína</b>
                        <p>{protein.join(', ')}</p>
                    </div>}


                {carbohydrate.length > 0 &&
                    <div onClick={() => openSection('carbohydrate')}
                        className='ingredients-cell ing-c card-style'>
                        <b>Carbohidratos</b>
                        <p>{carbohydrate.join(', ')}</p>
                    </div>}

                {vegetal.length > 0 &&
                    <div onClick={() => openSection('vegetal')}
                        className='ingredients-cell ing-v card-style'>
                        <b>Vegetales</b>
                        <p>{vegetal.join(', ')}</p>
                    </div>}

                {fruit.length > 0 &&
                    <div onClick={() => openSection('fruit')}
                        className='ingredients-cell ing-v card-style'>
                        <b>Frutas</b>
                        <p>{fruit.join(', ')}</p>
                    </div>}

                <div onClick={openType}
                    className='ingredients-cell add-ing'>
                    Agregar ingrediente +
                </div>
            </section>

            <div className='ingredients forButtons'>
                <button onClick={save}
                    className='ingredients-cell button'
                    disabled={
                        foods.length < 1 &&
                        protein.length < 1 &&
                        carbohydrate.length < 1 &&
                        vegetal.length < 1
                    } >guardar</button>
                <button className='ingredients-cell button sec' onClick={close}>salir</button>
            </div>

            <Modal
                isOpen={isOpenType}
                closeModal={closeTypeHandler}>
                <div className='modal-menu-container'>

                    {(!ingredientList || ingredientList === 'search') &&
                        <SearchIngredient changeList={setIngredientList} />}

                    {(!ingredientList && !subMenu) &&
                        <div className='ingredients'>
                            <div className='ingredients-cell sec'
                                onClick={() => selectSubMenu('protein')}>
                                <p>Proteína 🥩</p>
                            </div>
                            <div className='ingredients-cell sec'
                                onClick={() => selectIngList('carbohydrate')}>
                                <p>Carbohidratos 🌾</p>
                            </div>
                            <div className='ingredients-cell sec'
                                onClick={() => selectIngList('vegetal')}>
                                <p>Vegetales 🥦</p>
                            </div>
                            <div className='ingredients-cell sec'
                                onClick={() => selectIngList('fruit')}>
                                <p>Frutas 🍎</p>
                            </div>
                            <div className='divisor'></div>
                            <div className='ingredients-cell sec'
                                onClick={() => selectIngList('foods')}>
                                <p>Mis Preparaciones ⭐</p>
                            </div>
                            <button className='button' onClick={closeType}>volver</button>
                        </div>}

                    {(subMenu && !ingredientList) &&
                        <div className='ingredients'>
                            <div className='ingredients-cell sec'
                                onClick={() => setIngredientList('red_meat')}>
                                <p>Carne roja 🥩</p>
                            </div>
                            <div className='ingredients-cell sec'
                                onClick={() => setIngredientList('chicken')}>
                                <p>Pollo 🍗</p>
                            </div>
                            <div className='ingredients-cell sec'
                                onClick={() => setIngredientList('fish')}>
                                <p>Pescado 🍤</p>
                            </div>
                            <div className='ingredients-cell sec'
                                onClick={() => setIngredientList('pig')}>
                                <p>Cerdo 🥓</p>
                            </div>
                            <div className='ingredients-cell sec'
                                onClick={() => setIngredientList('egg')}>
                                <p>Huevo 🥚</p>
                            </div>
                            <button className='button'
                                onClick={() => setSubMenu(false)}>volver</button>
                        </div>}

                    {ingredientList &&
                        <IngredientList
                            list={ingredientList}
                            type={type}
                            openList={setIngredientList} />}
                </div>
            </Modal>

            <Modal isOpen={isOpenMealType} closeModal={closeMealType}>
                <div className='mealType-modal'>
                    <p>Esta comida no tiene un tipo asignado.</p>
                    <p>Por favor selecciona el que corresponda:</p>
                    <select id='mealTypeSelectInput'
                        onChange={(e) => setMealType(e.target.value)}>
                        <option value="">Elige una opción</option>
                        <option value={'breakfast'} >desayuno</option>
                        <option value={'lunch'} >almuerzo</option>
                        <option value={'afternoonsnack'} >merienda</option>
                        <option value={'dinner'} >cena</option>
                    </select>

                    <button onClick={mealTypeHandler}
                        className='button'>confirmar</button>
                </div>
            </Modal>
        </div>
    )
}

export default MealMenu