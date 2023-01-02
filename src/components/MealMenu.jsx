import React, { useState } from 'react'
import axios from 'axios'
import { usePlate } from '../plate-context'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'
import IngredientList from './IngredientList'
import Plate from './Plate'
import SearchIngredient from './SearchIngredient'
import { Suggested } from './Suggested'
import { defineWeek } from './helpers/defineWeek'

import './style/MealMenu.css'

const MealMenu = () => {
    const [ingredientList, setIngredientList] = useState(false)
    const [subMenu, setSubMenu] = useState(false)
    const [type, setType] = useState(false)
    const {
        dispatch,
        state: {
            currentPlate: {
                protein,
                foods,
                carbohydrate,
                vegetal,
                vegetalC,
                edit
            }
        } } = usePlate()
    const [isOpenType, openType, closeType] = useModal();

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
        dispatch({ type: 'mealMenu', payload: false })
    }

    const save = async () => {
        let aux = {
            protein: [...protein],
            foods: [...foods],
            carbohydrate: [...carbohydrate],
            vegetal: [...vegetal],
            vegetalC,
            date: edit ? edit.date : new Date().toLocaleDateString('en')
        }
        let leData = null
        const {
            today,
            start
        } = defineWeek()

        if (edit) {
            const { data } = await axios.put(`/history`,
                {
                    meal: aux,
                    meal_id: edit.id,
                    start,
                    today
                })
            !data.error && (leData = data)
        } else {
            const { data } = await axios.post(`/history?today=${today}&start=${start}`, { meal: aux })
            !data.error && (leData = data)
        }

        dispatch({ type: 'save', payload: leData })
        close()
        dispatch({ type: 'reset' })
    }

    const selectSubMenu = (arg) => {
        setType(arg)
        setSubMenu(arg)
    }

    const selectIngList = (arg) => {
        setType(arg)
        setIngredientList(arg)
    }

    return (
        <div className='mainmenu-container'>
            <Plate size={'34vh'}
                protein={protein}
                carbohydrate={carbohydrate}
                vegetal={vegetal}
                vegC={vegetalC} />

            <Suggested />

            <section className='ingredients'>
                {protein.length > 0 &&
                    <div onClick={() => openSection('protein')}
                        className='ingredients-cell ing-p'>
                        <b>Proteína</b>
                        <p>{protein.toString().replaceAll(',', ', ')}</p>
                    </div>}

                {(foods && foods.length > 0) &&
                    <div onClick={() => openSection('foods')}
                        className='ingredients-cell ing-p'>
                        <b>Comidas</b>
                        <p>{foods.toString().replaceAll(',', ', ')}</p>
                    </div>}

                {carbohydrate.length > 0 &&
                    <div onClick={() => openSection('carbohydrate')}
                        className='ingredients-cell ing-c'>
                        <b>Carbohidratos</b>
                        <p>{carbohydrate.toString().replaceAll(',', ', ')}</p>
                    </div>}

                {vegetal.length > 0 &&
                    <div onClick={() => openSection('vegetal')}
                        className='ingredients-cell ing-v'>
                        <b>Vegetales</b>
                        <p>{vegetal.toString().replaceAll(',', ', ')}</p>
                    </div>}

                <div onClick={openType}
                    className='ingredients-cell add-ing'>
                    Agregar ingrediente +
                </div>
            </section>

            <div className='ingredients forButtons'>
                <button className='ingredients-cell button' onClick={save}>guardar</button>
                <button className='ingredients-cell button button-sec' onClick={close}>salir</button>
            </div>

            <Modal
                isOpen={isOpenType}
                closeModal={closeTypeHandler}>
                <div className='modal-menu-container'>

                    {(!ingredientList || ingredientList === 'search') &&
                        <SearchIngredient changeList={setIngredientList} />}

                    {(!ingredientList && !subMenu) &&
                        <div className='ingredients'>
                            <div className='ingredients-cell'
                                onClick={() => selectSubMenu('protein')}>
                                <p>Proteína 🥩</p>
                            </div>
                            <div className='ingredients-cell'
                                onClick={() => selectIngList('carbohydrate')}>
                                <p>Carbohidratos 🌾</p>
                            </div>
                            <div className='ingredients-cell'
                                onClick={() => selectIngList('vegetal')}>
                                <p>Vegetales 🥦</p>
                            </div>
                            <div className='divisor'></div>
                            <div className='ingredients-cell'
                                onClick={() => selectIngList('foods')}>
                                <p>Mis Preparaciones ⭐</p>
                            </div>
                            <button className='button' onClick={closeType}>volver</button>
                        </div>}

                    {(subMenu && !ingredientList) &&
                        <div className='ingredients'>
                            <div className='ingredients-cell'
                                onClick={() => setIngredientList('red_meat')}>
                                <p>Carne roja 🥩</p>
                            </div>
                            <div className='ingredients-cell'
                                onClick={() => setIngredientList('chicken')}>
                                <p>Pollo 🍗</p>
                            </div>
                            <div className='ingredients-cell'
                                onClick={() => setIngredientList('fish')}>
                                <p>Pescado 🍤</p>
                            </div>
                            <div className='ingredients-cell'
                                onClick={() => setIngredientList('pig')}>
                                <p>Cerdo 🥓</p>
                            </div>
                            <div className='ingredients-cell'
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
        </div>
    )
}

export default MealMenu