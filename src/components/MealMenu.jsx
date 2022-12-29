import React, { useState } from 'react'
import axios from 'axios'
import { usePlate } from '../plate-context'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'
import IngredientList from './IngredientList'
import Plate from './Plate'
import { BACK_URL } from '../constants'
import SearchIngredient from './SearchIngredient'
import { Suggested } from './Suggested'
import { defineWeek } from './helpers/defineWeek'

import './style/MealMenu.css'

const MealMenu = ({ close }) => {
    const [ingredientList, setIngredientList] = useState(false)
    const {
        dispatch,
        state: {
            protein,
            carbohydrate,
            vegetal,
            vegetalC,
            id,
            week
        } } = usePlate()
    const [isOpenType, openType, closeType] = useModal();

    const closeTypeHandler = () => {
        closeType()
        setIngredientList(false)
    }

    const openSection = (section) => {
        setIngredientList(section)
        openType()
    }

    const save = async () => {
        let aux = {
            protein: [...protein],
            carbohydrate: [...carbohydrate],
            vegetal: [...vegetal],
            vegetalC,
            date: new Date().toLocaleDateString('en')
        }
        const {
            today,
            start
        } = defineWeek()
        const { data } = await axios.post(`${BACK_URL}/history?today=${today}&start=${start}&id=${id}`, { meal: aux })

        dispatch({ type: 'allHistory', payload: data })
        close()
        dispatch({ type: 'reset' })
    }

    return (
        <div className='mainmenu-container'>
            <p>{`Veg. C semanal: ${week.vegetalC}/4`}</p>
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
                    className='ingredients-cell button'>
                    Agregar ingrediente +
                </div>
            </section>

            <div className='ingredients forButtons'>
                <button className='ingredients-cell button' onClick={save}>guardar</button>
                <button className='ingredients-cell button' onClick={close}>salir</button>
            </div>

            <Modal
                isOpen={isOpenType}
                closeModal={closeTypeHandler}>
                <div className='modal-menu-container'>

                    {(!ingredientList || ingredientList === 'search') &&
                        <SearchIngredient changeList={setIngredientList} />}

                    {!ingredientList &&
                        <div className='ingredients'>
                            <div className='ingredients-cell'
                                onClick={() => setIngredientList('protein')}>
                                <p>
                                    Proteína 🥩
                                </p>
                            </div>
                            <div className='ingredients-cell'
                                onClick={() => setIngredientList('carbohydrate')}>
                                <p>
                                    Carbohidratos  🌾
                                </p>
                            </div>
                            <div className='ingredients-cell'
                                onClick={() => setIngredientList('vegetal')}>
                                <p>
                                    Vegetales 🥦
                                </p>
                            </div>
                            <button onClick={closeType}>x</button>
                        </div>}

                    {ingredientList &&
                        <IngredientList
                            list={ingredientList}
                            openList={setIngredientList} />}
                </div>
            </Modal>
        </div>
    )
}

export default MealMenu